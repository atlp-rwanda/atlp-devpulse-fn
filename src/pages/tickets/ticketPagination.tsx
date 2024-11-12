import * as AiIcons from "react-icons/ai";
import Select from "react-select";
import {
    DOTS,
    useCustomPagination,
  } from "../../components/Pagination/useCustomPagination";

const TicketPagination = ({itemsPerPage,
    setItemsPerPage,
    page,
    setPage,
    paginationRange,}) => {
    return (
      <>
        <div className="py-3 flex items-center text-center justify-center pt-10">
                        <div className="pb-1">
                          <label htmlFor="" className="dark:text-zinc-100">
                            rows per page
                          </label>
                          <Select
                            menuPlacement="top"
                            className="sm:text-sm  w-13 rounded-bt-rd absolute active dark:bg-dark-frame-bg"
                            options={[
                              { value: "10", label: "10" },
                              { value: "50", label: "50" },
                              { value: "100", label: "100" },
                              { value: "500", label: "500" },
                              { value: "1000", label: "1000" },
                            ]}
                            defaultValue={{ value: "10", label: "10" }}
                            onChange={(e: any) =>
                              setItemsPerPage(Number(e?.value))
                            }
                          />
                        </div>
                        <div
                          className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                          aria-label="Pagination"
                        >
                          <div
                            className="relative z-0 inline-flex items-center ml-auto mr-auto  rounded-[2px] shadow-sm space-x-2"
                            aria-label="Pagination"
                          >
                            <button
                              className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8] dark:disabled:bg-[#485970]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100"
                              onClick={() => setPage(0)}
                              disabled={page <= 0}
                            >
                              <AiIcons.AiOutlineDoubleLeft />
                            </button>
                            <button
                              className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100 dark:disabled:bg-[#485970]"
                              onClick={() => setPage(page - 1)}
                              disabled={page <= 0}
                            >
                              <AiIcons.AiOutlineLeft />
                            </button>
                            {paginationRange?.map((pageNumber, idx) => {
                              if (pageNumber === DOTS) {
                                return (
                                  <div
                                    key={idx}
                                    className="dark:text-zinc-100 md:hidden"
                                  >
                                    ...
                                  </div>
                                );
                              }
  
                              if (pageNumber - 1 === page) {
                                return (
                                  <button
                                    key={idx}
                                    className={`border-solid border-[1px] cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden
                          ${page && "bg-[#d6dfdf] text-black"} 
                          ${page === 0 && "bg-[#d6dfdf] text-black"} 
                            `}
                                    onClick={() => setPage(pageNumber - 1)}
                                  >
                                    {pageNumber}
                                  </button>
                                );
                              }
  
                              return (
                                <button
                                  key={idx}
                                  className={`border-solid border-[1px]  cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden`}
                                  onClick={() => setPage(pageNumber - 1)}
                                >
                                  {pageNumber}
                                </button>
                              );
                            })}
  
                            <button
                              className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                              onClick={() => setPage(page + 1)}
                            >
                              <AiIcons.AiOutlineRight />
                            </button>
                            <button className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100">
                              <AiIcons.AiOutlineDoubleRight />
                            </button>
                          </div>
                        </div>
                      </div>
      </>
    )
  }

  export default TicketPagination;