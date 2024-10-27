import React from "react";
import {
  useCustomPagination,
  DOTS,
} from "../../components/Pagination/useCustomPagination";
import * as icons from "react-icons/ai";
const Pagination: React.FC<{
  paginationRange: (number | string)[] | undefined;
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
}> = ({ paginationRange, currentPage, onPageChange }) => {
  if (paginationRange && paginationRange.length < 2) return null;

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  return (
    <ul className="flex list-none space-x-2 justify-center mt-8 items-center">
      <li>
        <button
          className="bg-primary dark:bg-[#56C870] text-white px-3 py-2 rounded-md "
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          <icons.AiOutlineArrowLeft />
        </button>
      </li>
      {paginationRange?.map((pageNumber, idx) =>
        pageNumber === DOTS ? (
          <li key={idx} className="text-gray-500 px-2 py-1">
            {DOTS}
          </li>
        ) : (
          <li key={idx}>
            <button
              className={`${
                pageNumber === currentPage
                  ? "bg-primary dark:bg-[#56C870] text-white"
                  : "bg-white text-primary"
              } px-3 py-1 rounded-md`}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </button>
          </li>
        )
      )}
      <li>
        <button
          className="bg-primary dark:bg-[#56C870] text-white px-3 py-2 rounded-md"
          disabled={
            currentPage === paginationRange?.[paginationRange.length - 1]
          }
          onClick={onNext}
        >
          <icons.AiOutlineArrowRight />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
