import { SearchDataProps } from "@/types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import style from "./Table.module.css";
import { pb } from "@/pocketbase/pocketbase";
import debounce from "lodash/debounce";
import { nanoid } from "nanoid";
import { FaSearch } from "react-icons/fa";

import Awesomplete from "awesomplete";
import {
  Form,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { MdClear } from "react-icons/md";

export default function SearchData() {
  const collectionName = "leave";
  const searchFormData: SearchDataProps[] = [
    {
      name: "employee",
      label: "Employee",
      type: "autocomplete",
      colSize: "col-4 mb-2",
    },
    {
      name: "from_date",
      label: "From Date",
      placeholder: "YYYY-MM-DD",
      type: "date",
      colSize: "col-4 mb-2",
      firstDate: true,
    },
    {
      name: "to_date",
      label: "To Date",
      type: "date",
      placeholder: "YYYY-MM-DD",
      colSize: "col-4 mb-2",
      secondDate: true,
    },
    {
      name: "reasons",
      label: "Reasons",
      type: "text",
      colSize: "col-4 mb-2",
    },
  ];

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  function cancelForm() {
    navigate(location.pathname, { state: nanoid() });
  }

  return (
    <>
      <div className="mt-2 mb-2 card">
        <div className="card-body">
          <Form method="GET" id="search_data_form">
            <fieldset>
              <legend>Search Data</legend>
              <div className="row">
                {searchFormData.map((e: SearchDataProps) => {
                  return (
                    <div className={e.colSize} key={e.name}>
                      <RenderSearchForm
                        props={e}
                        collectionName={collectionName}
                        searchParams={searchParams}
                      />
                    </div>
                  );
                })}
              </div>
              <input
                type="hidden"
                name="size"
                value={searchParams.get("size") ?? 10}
              />
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  <FaSearch /> search
                </button>
                <button
                  onClick={cancelForm}
                  type="reset"
                  className="btn btn-secondary"
                >
                  <MdClear /> clear
                </button>
              </div>
            </fieldset>
          </Form>
        </div>
      </div>
    </>
  );
}

function RenderSearchForm({
  props,
  collectionName,
  searchParams,
}: {
  props: SearchDataProps;
  collectionName: string;
  searchParams?: URLSearchParams;
}) {
  let intialDate: string | Date = new Date();
  if (props.type === "date") {
    if (props.firstDate) {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      intialDate = currentDate;
    }
    if (searchParams?.get(props.name) != null) {
      intialDate = searchParams?.get(props.name) as string;
    }
  }
  const [startDate, setStartDate] = useState<Date>(intialDate as Date);
  const { state } = useLocation();

  let awesomeList: Awesomplete;

  useEffect(() => {
    if (props.type === "autocomplete") {
      const input = document.querySelector(`#${props.name}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      awesomeList = new Awesomplete(input as HTMLElement, {
        autoFirst: true,
      });
    }
  });

  useEffect(() => {
    if (props.firstDate) {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      setStartDate(currentDate);
    } else {
      setStartDate(new Date());
    }
  }, [props.firstDate, state]);

  async function handleOnPress(e: React.KeyboardEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    const resultList = await pb.collection(collectionName).getList(1, 50, {
      filter: `${props.name} ~ '${value}'`,
      requestKey: null,
    });

    const list = resultList.items.map((item) => item.employee);

    if (awesomeList) {
      awesomeList.list = list;
    }
  }

  const debouncedHandleKeyUp = debounce(handleOnPress, 500);

  if (props.type === "text") {
    return (
      <>
        <label htmlFor={props.name} className="form-label">
          {props.label}
        </label>
        <input
          type="text"
          className="form-control"
          id={props.name}
          placeholder={props.placeholder}
          defaultValue={searchParams?.get(props.name) ?? ""}
        ></input>
      </>
    );
  }

  if (props.type === "date") {
    return (
      <>
        <label htmlFor={props.name} className="form-label">
          {props.label}
        </label>
        <DatePicker
          id={props.name}
          name={props.name}
          wrapperClassName={style.datepicker_wrapper}
          className="form-control date_picker"
          selected={startDate}
          // dateFormat={"YYYY/MM/dd"}
          onChange={(date) => setStartDate(date as Date)}
        />
      </>
    );
  }

  if (props.type === "autocomplete") {
    return (
      <>
        <label htmlFor={props.name} className="form-label">
          {props.label}
        </label>
        <input
          onKeyPress={(e) => debouncedHandleKeyUp(e)}
          defaultValue={searchParams?.get(props.name) ?? ""}
          className="awesomplete form-control"
          name={props.name}
          id={props.name}
        />
      </>
    );
  }
}
