import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import React from "react";

function DataPagination({
  pageOptions,
  columnLength,
  canNextPage,
  canPreviousPage,
  pageSize,
  setPageSize,
  gotoPage,
  previousPage,
  nextPage,
  pageIndex,
}: any) {
  return (
    <div>
      {pageOptions.length >= 0 && (
        <table className="w-full mt-2">
          <tfoot className="w-full py-2">
            <tr className="w-full py-2">
              <td colSpan={columnLength}>
                <div className="w-full justify-center flex mx-auto flex-row items-center overflow-x-scroll">
                  <button
                    type="button"
                    className="page mx-2 text-white rounded-circle appearance-none font-bold flex items-center justify-center bg-primary h-[30px] w-[60px] cursor-pointer"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <FiArrowLeftCircle className="w-5" fontSize="sm" />
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="page mx-2 text-white rounded-circle font-bold flex items-center justify-center bg-primary h-[30px] w-[60px] cursor-pointer"
                  >
                    <FiArrowRightCircle className="w-5" fontSize="sm" />
                  </button>{" "}
                  <div className="flex flex-row justify-center w-full sm:text-[12px] items-center ">
                    <span className="inline-block mx-2">
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of
                        {` ${pageOptions.length}`}
                      </strong>{" "}
                    </span>
                    <span className="inline-block mx-2">
                      | Go to page:{" "}
                      <input
                        type="number"
                        className=" outline-none border rounded-md appearance-none border-primary dark:bg-primary pl-1"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                          const pageNumber = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                          gotoPage(pageNumber);
                        }}
                        style={{
                          width: "50px",
                          height: "30px",
                          border: "solid 0.1rem #4aa5be",
                          paddingLeft: "1.2rem",
                        }}
                      />
                    </span>{" "}
                    <select
                      className="px-1/2 font-raleway rounded-md border border-primary dark:bg-primary"
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      style={{ height: "30px", border: "solid 0.1rem #4aa5be" }}
                    >
                      {[3, 5, 10, 25, 50, 100].map((pgSize) => (
                        <option key={pgSize} value={pgSize}>
                          Show {pgSize}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

export default DataPagination;
