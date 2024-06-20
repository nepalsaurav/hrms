import { useState } from "react";
import { PaginationProps } from "./types";
import { useSearchParams } from "react-router-dom";

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageRange] = useState(2); // Example state, can be adjusted as needed

  if (currentPage === undefined) {
    currentPage = 0;
  }
  if (totalPages === undefined) {
    totalPages = 0;
  }

  const changePage = (currentPage: number) => {
    if (currentPage >= 1 && currentPage <= totalPages) {
      // Replace with your navigation logic (e.g., React Router's useHistory)
      const queryParams = searchParams;
      console.log(currentPage);
      queryParams.set("page", currentPage.toString());
      setSearchParams(queryParams);
      console.log(`Navigating to page ${currentPage}`);
    }
  };

  const getPages = () => {
    const pages = [];
    for (
      let i = Math.max(1, currentPage - pageRange);
      i <= Math.min(totalPages, currentPage + pageRange);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  if (currentPage < 1) {
    return <></>;
  }

  return (
    <nav className="d-flex justify-content-end">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              changePage(currentPage - 1);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {currentPage > pageRange + 1 && (
          <>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changePage(1);
                }}
              >
                1
              </a>
            </li>
            {currentPage > pageRange + 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {getPages().map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changePage(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        {currentPage < totalPages - pageRange && (
          <>
            {currentPage < totalPages - pageRange - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changePage(totalPages);
                }}
              >
                {totalPages}
              </a>
            </li>
          </>
        )}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              changePage(currentPage + 1);
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
