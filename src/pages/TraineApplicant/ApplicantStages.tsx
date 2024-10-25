/* eslint-disable */
import React, { useState, useEffect } from "react";
import * as icons from "react-icons/ai";
import pagination from "../../components/pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import {
  softdeletetraine,
  deletetraine,
  fetchtraine,
  createtraine,
} from "../../redux/actions/deletetraine";
import { useAppDispatch } from "../../hooks/hooks";
import { getAllCycles } from "../../redux/actions/cyclesActions";
import Select from "react-select";
import { customTheme, darkTheme } from "../FilterTeainee/FilterTrainee";
import { useTheme } from "../../hooks/darkmode";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import * as AiIcons from "react-icons/ai";
import NextStageModal from "../../components/form/advanceTraineeApplicant";
import DismissTraineeApplicant from "../../components/form/dismissTraineeApplicationModel";

const ApplicantStages = (props: any) => {
  // New state for search input and search field
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("firstName");

  // LIST ALL TRAINEE
  const { alltrainees, delettraine, softdeletettraine, traines, cycles } =
    props;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [All, setAll] = useState(false);
  const { theme, setTheme } = useTheme();

  const input = {
    page: page + 1,
    itemsPerPage: itemsPerPage,
    All: All,
  };

  useEffect(() => {
    props.getAllCycles();
  }, []);

  const traine = traines.message;

  useEffect(() => {
    dispatch(fetchtraine(input));
  }, [delettraine, softdeletettraine, page, itemsPerPage, itemsPerPage]);

  const getStatusText = (trainee: any) => {
    if (trainee.dismissed) return "Dismissed";
    if (trainee.status === "pending") return "No Action";
    return "Dismissed";
  };

  const getStageText = (trainee: any) => {
    const stages = [
      "Applied",
      "Shortlisted",
      "TechnicalAssessment",
      "Interview",
      "Admitted",
      "Dismissed",
    ];
    return trainee.stage || "Interview";
  };

  // Filter trainees by selected search field
  const filteredTrainees = traine?.filter((item: any) => {
    const fieldValue = item[searchField]?.toString().toLowerCase();
    return fieldValue?.includes(searchQuery.toLowerCase());
  });

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(traines?.pagination.totalItems / itemsPerPage),
    currentPage: page,
  });

  console.log("ALL TRAINEES =>>>>>>>>>>>>", filteredTrainees);

  return (
    <>
      <ToastContainer />
      <div className="w-full">
        {/* =========================== End:: addnewtraineeModel =============================== */}
        <div className="flex flex-col  h-screen w-[100%]">
          <div className="flex flex-row">
            <div className="w-full">
              <div>
                <div className="bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden">
                  <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <Select
                        menuPlacement="auto"
                        className="text-sm rounded-md dark:text-ltb"
                        options={[
                          { value: "admitted", label: "Admitted" },
                          { value: "Shortlisted", label: "Shortlisted" },
                          {
                            value: "technical assessment",
                            label: "Technical Assessment",
                          },
                          { value: "interview", label: "Interview" },
                          { value: "dismissed", label: "Dismissed" },
                        ]}
                        defaultValue={{
                          value: "",
                          label: "Sort by stage",
                        }}
                        onChange={(e: any) => setSearchField(e?.value)}
                        theme={theme ? customTheme : darkTheme}
                      />
                      <Select
                        menuPlacement="auto"
                        className="text-sm rounded-md dark:text-ltb"
                        options={[
                          { value: "firstName", label: "First Name" },
                          { value: "lastName", label: "Last Name" },
                          { value: "email", label: "Email" },
                        ]}
                        defaultValue={{
                          value: "firstName",
                          label: "First Name",
                        }}
                        onChange={(e: any) => setSearchField(e?.value)}
                        theme={theme ? customTheme : darkTheme}
                      />
                      <div className="w-full sm:w-auto flex-grow">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder={`Search by ${searchField.replace(
                              "_",
                              " "
                            )}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-row-gray dark:bg-[#293647] dark:text-ltb border border-bdr dark:border-cg dark:border-opacity-5 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#56C870] text-sm"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-8">
                    <div className="bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto">
                      <div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                          <div className="inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll">
                            <div>
                              <table className="min-w-full leading-normal">
                                <thead className=" w-full px-32 sticky top-0">
                                  <tr>
                                    <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                      {"Profile"}
                                    </th>

                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                      {"Email"}
                                    </th>

                                    {
                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                        {"cycle"}
                                      </th>
                                    }
                                    {
                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                        {"Status"}
                                      </th>
                                    }
                                    {
                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                        {"Stage"}
                                      </th>
                                    }
                                    <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                      {"action"}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="overflow-y-auto">
                                  {filteredTrainees?.length > 0 ? (
                                    filteredTrainees.map(
                                      (item: any, index: number) =>
                                        item?.delete_at == false ? (
                                          <tr
                                            key={item._id}
                                            className={`${
                                              index % 2 === 0
                                                ? "bg-white dark:bg-dark-bg"
                                                : "bg-gray-50 dark:bg-dark-tertiary"
                                            } hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200`}
                                          >
                                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                              <div className="flex">
                                                <div className="">
                                                  <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                                    {item.firstName +
                                                      " " +
                                                      item.lastName}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                              <div className="flex items-center">
                                                <div className="">
                                                  <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                                    {item.email}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                              <div className="flex items-center">
                                                <div className="">
                                                  <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                                    {item.cycle_id
                                                      ? item.cycle_id.name
                                                      : "-"}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                              <span
                                                className={`inline-block px-3 py-1 rounded-full text-sm
                        ${
                          getStatusText(item) === "Dismissed"
                            ? "bg-red-200 text-red-500 font-medium"
                            : getStatusText(item) === "Dismissed"
                            ? "bg-green text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                                              >
                                                {getStatusText(item)}
                                              </span>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 font-medium rounded-full">
                                                {getStageText(item)}
                                              </span>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                              <div className="flex justify-center gap-2">
                                                <NextStageModal />
                                                <DismissTraineeApplicant />
                                              </div>
                                            </td>
                                          </tr>
                                        ) : null
                                    )
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={5}
                                        className="text-center text-white"
                                      >
                                        No trainees found
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
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
                            defaultValue={{ value: "", label: "10" }}
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
                              className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100"
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
                              disabled={
                                page >=
                                Math.ceil(
                                  traines?.pagination.totalItems / itemsPerPage
                                ) -
                                  1
                              }
                            >
                              <AiIcons.AiOutlineRight />
                            </button>
                            <button
                              className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                              onClick={() =>
                                setPage(
                                  Math.ceil(
                                    traines?.pagination.totalItems /
                                      itemsPerPage
                                  ) - 1
                                )
                              }
                              disabled={
                                page >=
                                Math.ceil(
                                  traines?.pagination.totalItems / itemsPerPage
                                ) -
                                  1
                              }
                            >
                              <AiIcons.AiOutlineDoubleRight />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* //pagination */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default AddTrainee;

const mapState = (state: any) => ({
  delettraine: state.deletetraine,
  softdeletettraine: state.softdeletetraine,
  traines: state.traine,
  cycles: state.cycles,
});

export default connect(mapState, {
  deletetraine,
  softdeletetraine,
  fetchtraine,
  getAllCycles,
  createtraine,
})(ApplicantStages);
