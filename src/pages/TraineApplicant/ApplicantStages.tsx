/* eslint-disable */
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import {
  softdeletetraine,
  deletetraine,
  fetchtraine,
  createtraine,
} from "../../redux/actions/deletetraine";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
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
import { HiDotsVertical } from "react-icons/hi";
import AddApplicantScore from "../../components/form/addApplicantScore";
import { filterStage } from "../../redux/actions/applicationStage";
import { TableSkeleton } from "../../skeletons/applicantStageSkeleton";
import LoadingSkeleton from "../../skeletons/loadingSkeleton";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ApplicantStages = (props: any) => {
  // New state for search input and search field
  const { cycleName } = useParams<{ cycleName: string | undefined }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("firstName");
  const [filterData, setFilterData] = useState<any[]>([]); // Initialize as an empty array
  const [selectedCycle, setSelectedCycle] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [All, setAll] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMore, setIsMore] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(true);
  const [filterStages, setFilterStages] = useState("All");
  const [filteredTraines, setFilteredTraines] = useState([]);

  // LIST ALL TRAINEE
  const { alltrainees, delettraine, softdeletettraine, traines, cycles } =
    props;
  const dispatch = useAppDispatch();
  const { data: nextStageData, success: nextStageSuccess } = useAppSelector(
    (state) => state.nextStage
  );

  const {
    data: filteredApplicantData,
    success: filterSuccess,
    error: filterError,
    message,
  } = useAppSelector((state) => state.filterApplicantByStage);

  const {
    data,
    success: addedScoreSuccess,
    error,
  } = useAppSelector((state) => state.AddedApplicantScore);

  const input = {
    page: page + 1,
    itemsPerPage: itemsPerPage,
    All: All,
  };

  useEffect(() => {
    props.getAllCycles();
  }, []);
  useEffect(() => {
    const traine = traines?.message || [];
    const decodedString = cycleName ? decodeURIComponent(cycleName) : "";
    const filtered = traine.filter(
      (trainee) => trainee.cycle_id.name === decodedString
    );
    setFilteredTraines(filtered);
  }, [traines, cycleName]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      dispatch(fetchtraine(input));
    }, 2000);
  }, [
    delettraine,
    softdeletettraine,
    page,
    itemsPerPage,
    itemsPerPage,
    nextStageData,
    nextStageSuccess,

  ]);

  const getStageText = (stage: string) => {
    if (stage === "Interview Assessment") {
      return "Interview";
    } else if (stage === "Technical Assessment") {
      return "Technical";
    }
    return stage;
  };

  const filteredTrainees = filteredTraines.filter((item: any) => {
    const fieldValue = item[searchField];
    const matchesSearch = fieldValue
      ?.toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(traines?.pagination.totalItems / itemsPerPage),
    currentPage: page,
  });

  const handleMoreOptions = (userId: any) => {
    if (!isMore) setIsMore(userId);
    if (isMore) setIsMore("");
  };

  const handleFilter = async (filterStages: string) => {
    await dispatch(filterStage(filterStages));
  };
  useEffect(() => {
    setTimeout(() => {
      if (filterSuccess && filteredApplicantData) {
        setLoadingFilter(false);
        setFilterData(filteredApplicantData);
      }
    }, 2000);
  }, [filterSuccess, filteredApplicantData]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (addedScoreSuccess) {
        setFilterData(filteredApplicantData);
      }
    }, 2000);
  }, [addedScoreSuccess]);

  useEffect(()=>{
    const timeOut =setTimeout(()=>{
      if(filteredTrainees && filterStages === "All"){
        setLoadingFilter(false)
      }
    },2000)
    return ()=> clearTimeout(timeOut)
  },[filteredTrainees]);

  const stages = [
    {value:"All", label:"All Stages"},
    { value: "Shortlisted", label: "Shortlisted" },
    { value: "Technical Assessment", label: "Technical" },
    { value: "Interview Assessment", label: "Interview" },
    { value: "Admitted", label: "Admitted" },
    { value: "Rejected", label: "Rejected" },
  ];

  const handleConvertDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const handleTurnCutText = (text: string) => {
    if (text.length > 10) {
      return text.slice(0, 10) + "...";
    }
    return text;
  };

  const handleReload = async () => {
    setIsMore("");
    await dispatch(filterStage(filterStages));
  };
  
  return (
    <>
      <div className=" bg-gray-50 dark:bg-dark-frame-bg flex flex-col w-[100%] h-screen px-4">
        <div className="flex flex-col gap-2 sm:flex-row items-start sm:items-center my-4 sm:my-4">
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
          <div className=" sm:w-auto flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search by ${searchField.replace("_", " ")}`}
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
        <div className={`flex gap-5 py-4 ${theme ? customTheme : darkTheme}`}>
          {stages.map((stage) => (
            <button
              key={stage.value}
              className={`text-sm rounded-md px-3 py-2 transition-colors duration-200 ${
                filterStages === stage.value
                  ? "bg-[#0c6a0c] dark:bg-[#56C870] text-white" // Active stage style
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100" // Inactive stage style
              }`}
              onClick={() => {
                setFilterStages(stage.value);
                handleFilter(stage.value);
                setLoadingFilter(true);
              }}
            >
              {stage.label}
            </button>
          ))}
        </div>
        <div className=" h-[55vh] overflow-y-scroll">
          <table className="w-full">
            <thead className="border-b-2 bg-gray-200 dark:bg-dark-tertiary border-gray-200 sticky top-0">
              <tr className="w-full">
                <th className="p-5 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                  {"Profile"}
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                  {"Email"}
                </th>
                {
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    {"Status"}
                  </th>
                }
                {
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    {"Last Update"}
                  </th>
                }
                {filterStages && filterStages !== "All" && filterData && filterData.length > 0 ? (
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    {"Comments"}
                  </th>
                ) : (
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    {"Stage"}
                  </th>
                )}
                {filterStages === "Technical Assessment" ||
                (filterStages === "Interview Assessment" &&
                  filterData &&
                  filterData.length > 0) ? (
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                    {"score"}
                  </th>
                ) : null}
                <th className="border-b-2 sm:text-center text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                  {"action"}
                </th>
              </tr>
            </thead>
            {loading || loadingFilter ? (
              <LoadingSkeleton rows={5} filterStages={(filterStages === "All" || filterStages)} />
            ) : (
              <tbody className="overflow-y-auto">
                {filterStages === "All" && filteredTrainees?.length > 0 ? (
                  filteredTrainees.map((item: any, index: number) =>
                    item?.delete_at == false ? (
                      <tr
                        key={item._id}
                        className={`${
                          index % 2 === 0
                            ? "bg-white dark:bg-dark-bg"
                            : "bg-gray-50 dark:bg-dark-tertiary"
                        } hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200`}
                      >
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                          <div className="flex">
                            <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                              {item.firstName.toUpperCase() + " " + item.lastName}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                          <div className="flex">
                            <p className="text-gray-900  dark:text-white whitespace-no-wrap">
                              {item.email}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs ">
                          <span
                            className={`inline-block text-center rounded-full px-1 py-2 min-w-20 max-w-16 whitespace-no-wrap
                        ${
                          item.applicationPhase === "Rejected"
                            ? "bg-red-200 text-red-500 font-medium"
                            : item.applicationPhase === "Admitted"
                            ? "bg-[#0c6a0c] dark:bg-[#1bf84b8d] text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                          <span className="inline-block px-3 py-2 bg-blue-100 text-blue-800 font-medium rounded-full">
                            {handleConvertDate(item.createdAt)}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                          <span className={`${item.applicationPhase === "Rejected"
                            ? "bg-red-200 text-red-500 font-medium"
                            : item.applicationPhase === "Admitted"
                            ? "bg-[#0c6a0c] dark:bg-[#1bf84b8d] text-white" :"bg-blue-100 text-blue-800"} inline-block px-2 py-2 text-center font-medium rounded-full`}>
                            {getStageText(item.applicationPhase)}
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs relative">
                          <div className=" flex justify-center">
                            <HiDotsVertical
                              className=" text-black dark:text-white text-3xl cursor-pointer"
                              onClick={(e: any) => {
                                e.preventDefault();
                                handleMoreOptions(item._id);
                              }}
                            />
                            <div
                              className={`${
                                isMore === item._id ? "block" : "hidden"
                              } absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4`}
                              id="dropdown"
                            >
                              <ul className="py-1" aria-labelledby="dropdown">
                                <li>
                                  <div
                                    className={`${
                                      isMore === item._id &&
                                      (item.applicationPhase ===
                                        "Interview Assessment" ||
                                        item.applicationPhase ===
                                          "Technical Assessment")
                                        ? "block"
                                        : "hidden"
                                    } block text-xs hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white px-4 py-2`}
                                  >
                                    <AddApplicantScore
                                      applicantId={item._id}
                                      stage={item.applicationPhase}
                                      onClose={() => setIsMore("")}
                                    />
                                  </div>
                                </li>
                                <li>
                                  <NextStageModal
                                    applicantId={item._id}
                                    stage={item.applicationPhase}
                                    onClose={() => setIsMore("")}
                                  />
                                </li>
                                <li>
                                  <DismissTraineeApplicant
                                    applicantId={item._id}
                                    applicantName={
                                      item.firstName + " " + item.lastName
                                    }
                                    stage={item.applicationPhase}
                                    onClose={() => setIsMore("")}
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null
                  )
                ): filterStages && filterData && filterData.length > 0 ? (
                  filterData?.map((item, index: number) => (
                    <tr
                      key={item._id}
                      className={`${
                        index % 2 === 0
                          ? "bg-white dark:bg-dark-bg"
                          : "bg-gray-50 dark:bg-dark-tertiary"
                      } hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200`}
                    >
                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                        <div className="flex">
                          <div className="">
                            <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                              {item.applicant.firstName.toUpperCase() +
                                " " +
                                item.applicant.lastName}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                        <div className="flex items-center">
                          <div className="">
                            <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                              {item.applicant.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                        <span
                          className={`inline-block text-center px-1 py-2 min-w-20 max-w-16 rounded-full text-xs
                        ${
                          item.status === "Rejected"
                            ? "bg-red-200 text-red-500 font-medium"
                            : item.status === "Admitted"
                            ? "bg-[#0c6a0c] dark:bg-[#1bf84b8d] text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 font-medium rounded-full">
                          {handleConvertDate(item.updatedAt)}
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs dark:text-gray-50">
                        {handleTurnCutText(item.comments)}
                      </td>
                      {filterStages === "Technical Assessment" ||
                      filterStages === "Interview Assessment" ? (
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs">
                          <span className="inline-block text-center px-1 py-2 min-w-20 max-w-16 bg-blue-100 text-blue-800 font-medium rounded-full">
                            {item.score === null ? "No Score" : item.score}
                          </span>
                        </td>
                      ) : null}
                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-xs relative">
                        <div className=" flex justify-center">
                          <HiDotsVertical
                            className=" text-black dark:text-white text-3xl cursor-pointer"
                            onClick={(e: any) => {
                              e.preventDefault();
                              handleMoreOptions(item.applicant._id);
                            }}
                          />
                          <div
                            className={`${
                              isMore === item.applicant._id ? "block" : "hidden"
                            } absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                            id="dropdown"
                          >
                            <ul className="py-1" aria-labelledby="dropdown">
                              <li>
                                <div
                                  className={`${
                                    filterStages === "Shortlisted" ||
                                    ((filterStages === "Technical Assessment" ||
                                      filterStages ===
                                        "Interview Assessment" || filterStages ===
                                        "Admitted" || filterStages ===
                                        "Rejected") &&
                                      (item.status === "Moved" ||
                                        item.status === "Admitted" ||
                                        item.status === "Rejected" || item.status === "Passed"))
                                      ? "hidden"
                                      : "block"
                                  } text-xs hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white px-4 py-2`}
                                >
                                  <AddApplicantScore
                                    applicantId={item.applicant._id}
                                    stage={item.applicant.applicationPhase}
                                    onClose={handleReload}
                                  />
                                </div>
                              </li>
                              <li>
                                <NextStageModal
                                  applicantId={item.applicant._id}
                                  stage={item.applicant.applicationPhase}
                                  status={item.status}
                                  onClose={handleReload}
                                />
                              </li>
                              <li>
                                <DismissTraineeApplicant
                                  applicantId={item.applicant._id}
                                  applicantName={
                                    item.applicant.firstName +
                                    " " +
                                    item.applicant.lastName
                                  }
                                  stage={item.currentStage}
                                  status={item.status}
                                  onClose={handleReload}
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center dark:text-white">
                      No trainees found
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
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
              onChange={(e: any) => setItemsPerPage(Number(e?.value))}
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
                    <div key={idx} className="dark:text-zinc-100 md:hidden">
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
                  Math.ceil(traines?.pagination.totalItems / itemsPerPage) - 1
                }
              >
                <AiIcons.AiOutlineRight />
              </button>
              <button
                className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                onClick={() =>
                  setPage(
                    Math.ceil(traines?.pagination.totalItems / itemsPerPage) - 1
                  )
                }
                disabled={
                  page >=
                  Math.ceil(traines?.pagination.totalItems / itemsPerPage) - 1
                }
              >
                <AiIcons.AiOutlineDoubleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
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
