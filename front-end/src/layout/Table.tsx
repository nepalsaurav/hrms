import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { pb } from "@/pocketbase/pocketbase";
import { ClientResponseError } from "pocketbase";
import { HeaderColumns } from "@/types"; // Assuming these are defined correctly
import { ShowSelectedItemsProps } from "./types";
import Pagination from "./Pagination";
import { Link, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { refreshDataStore } from "./store";
import { formatDateField, formatTimeField, parseFilter } from "./utils";
import { IoMdAddCircle } from "react-icons/io";
import { FaFileExport } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "./Table.module.css";
import TableLoading from "./TableLoading";

const TableLayout: React.FC = () => {
  //props
  const headerColumns: HeaderColumns[] = [
    { name: "employee", displayName: "Employee", type: "text" },
    { name: "from_date", displayName: "From Date", type: "date" },
    { name: "to_date", displayName: "To Date", type: "date" },
    { name: "reasons", displayName: "Reasons", type: "text" },
  ];
  const collectionName = "leave";
  // props

  const [searchParams, setSearchParams] = useSearchParams();
  const [rowSizePerPage, setRowSizePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const selectAllCheckboxElement = useRef<HTMLInputElement>(null);
  const isRefresh = refreshDataStore((state) => state.isRefresh);
  const refreshData = refreshDataStore((state) => state.refreshData);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setSelectedItems(new Set());
    if (searchParams.get("size") != null) {
      setRowSizePerPage(parseInt(searchParams.get("size") as string));
    } else {
      setRowSizePerPage(10);
    }
    if (searchParams.get("page") != null) {
      setCurrentPage(parseInt(searchParams.get("page") as string));
    } else {
      setCurrentPage(1);
    }

    const filterString = parseFilter(searchParams);
    setFilter(filterString);
    console.log(filterString);
  }, [searchParams]);

  const { isLoading, error, data } = useQuery(
    [collectionName, rowSizePerPage, currentPage, isRefresh, filter],
    async () => {
      const resultList = pb
        .collection(collectionName)
        .getList(currentPage, rowSizePerPage, {
          filter: filter,
          requestKey: null,
        });
      return resultList;
    },
    { keepPreviousData: false }
  );

  function onRowPerChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRowSizePerPage(parseInt(e.target.value));
    const queryParams = searchParams;
    queryParams.set("page", "1");
    queryParams.set("size", e.target.value);
    setSearchParams(queryParams);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    setSelectedItems((prevSet) => {
      const newSet = new Set(prevSet);
      e.target.checked ? newSet.add(id) : newSet.delete(id);
      return newSet;
    });
  }

  useEffect(() => {
    if (!selectAllCheckboxElement.current) return;
    if (selectedItems.size === (data?.items.length || 0)) {
      selectAllCheckboxElement.current.checked = true;
      selectAllCheckboxElement.current.indeterminate = false;
    } else if (selectedItems.size === 0) {
      selectAllCheckboxElement.current.checked = false;
      selectAllCheckboxElement.current.indeterminate = false;
    } else {
      selectAllCheckboxElement.current.indeterminate = true;
    }
  }, [selectedItems, data?.items.length]);

  function selectAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSelectedItems(new Set(data?.items.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  }

  function onDeleteSuccess() {
    setSelectedItems(new Set());
    refreshData();
  }

  if (isLoading) return <TableLoading />;
  if (error)
    return "An error has occurred: " + (error as ClientResponseError).message;
  if (data?.items.length === 0) return "No data Found";

  return (
    <>
      <DifferentButton />
      {selectedItems.size > 0 && (
        <ShowSelectedItems
          selectedItems={selectedItems}
          collectionName={collectionName}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
      <ShowRowsPerPage
        onRowPerChange={onRowPerChange}
        rowSizePerPage={rowSizePerPage}
        currentPage={data?.page}
        totalPageNumber={data?.totalPages}
      />
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="form-check-input"
                ref={selectAllCheckboxElement}
                onChange={selectAll}
              />
            </th>
            <th>S.N</th>
            {headerColumns.map((col) => (
              <th key={col.name}>{col.displayName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.items.map((item, i) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedItems.has(item.id)}
                  onChange={(e) => handleChange(e, item.id)}
                />
              </td>
              <td>{(data.page - 1) * data.perPage + i + 1}</td>
              {headerColumns.map((col) => (
                <td key={col.name} className="text-nowrap">
                  <RenderTableDimension data={item[col.name]} type={col.type} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* show pagination */}
      <Pagination currentPage={data?.page} totalPages={data?.totalPages} />
    </>
  );
};

function ShowSelectedItems({
  selectedItems,
  collectionName,
  onDeleteSuccess,
}: ShowSelectedItemsProps) {
  function handleDelete(): void {
    console.log(selectedItems, collectionName);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        const promises = Array.from(selectedItems).map((id) =>
          pb.collection("leave").delete(id)
        );
        return await Promise.all(promises);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteSuccess();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  return (
    <div className="alert alert-primary" role="alert">
      <button className="btn btn-danger me-3" onClick={handleDelete}>
        <MdDelete /> Delete
      </button>
      <span>{selectedItems.size} items selected.</span>
    </div>
  );
}

function ShowRowsPerPage({
  onRowPerChange,
  currentPage,
  totalPageNumber,
  rowSizePerPage,
}: {
  onRowPerChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  rowSizePerPage: number;
  currentPage: number | undefined;
  totalPageNumber: number | undefined;
}) {
  return (
    <div className="d-flex mt-3 mb-2">
      <div>
        <span className="me-2">
          showing page {currentPage} of {totalPageNumber}
        </span>
      </div>
      <select
        onChange={onRowPerChange}
        className="form-select form-select-sm me-2 ms-auto"
        aria-label="Small select example"
        style={{ width: "100px" }}
        defaultValue={rowSizePerPage}
      >
        {[10, 20, 50, 100, 500].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span>rows per page</span>
    </div>
  );
}

function RenderTableDimension({ type, data }: { type: string; data: string }) {
  if (type === "date") {
    return <span>{formatDateField(data)}</span>;
  } else if (type === "time") {
    return <span>{formatTimeField(data)}</span>;
  } else {
    return <span>{data}</span>;
  }
}

function DifferentButton() {
  return (
    <>
      <div className="d-flex justify-content-end mt-4 mb-4">
        <Link
          to="create"
          className="btn btn-primary me-3"
          unstable_viewTransition
        >
          <IoMdAddCircle /> create
        </Link>
        <button className="btn btn-secondary">
          <FaFileExport /> export
        </button>
      </div>
    </>
  );
}
export default TableLayout;
