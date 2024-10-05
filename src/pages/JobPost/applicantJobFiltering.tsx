import { useEffect, useState } from "react";
import NavBar from "../../components/sidebar/navHeader";
import * as BsIcons from "react-icons/bs";
import * as BsFillGrid3X3GapFill from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import * as icons from "react-icons/ai";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchJobPost } from "../../redux/actions/fetchJobPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { connect, useSelector } from "react-redux";
import { createJobPostAction } from "../../redux/actions/createJobPostAction";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import * as AiIcons from "react-icons/ai";
import { getAllPrograms } from "../../redux/actions/programsActions";
import { getAllCycles } from "../../redux/actions/cyclesActions";
import { getAllCohorts } from "../../redux/actions/cohortActions";
import { deleteJobPostAction } from "../../redux/actions/deleteJobPostAction";
import { useTheme } from "../../hooks/darkmode";
import { 
  getAllFilteredJobPosts, 
  getAllJobPosts} from "../../redux/actions/filterJobPost";

const ApplicantSeachJobPost = (props: any) => {
  const [addNewTraineeModel, setAddNewTraineeModel] = useState(false);
  const Open = () => {
    setAddNewTraineeModel(true);
  };
  const removeModel = () => {
    let newState = !addNewTraineeModel;
    setAddNewTraineeModel(newState);
  };
  const [title, setTitle] = useState("");
  const [program, setProgram] = useState("");
  const [cycle, setCycle] = useState("");
  const [cohort, setCohort] = useState("");
  const [description, setDescription] = useState("");
  const { cycles, programs, cohorts } = props;

  //FETCH PROGRAMS
  const [fetchProgram, setfetchProgram] = useState([]);
  const [fetchCycle, setfetchCycle] = useState([]);
  const [fetchCohort, setfetchCohort] = useState([]);
  const [actionsList, setActionsList] = useState(null);
  const { theme, setTheme } = useTheme();

  // LIST ALL JOB POST
  const { jobs } = props;
  const dispatch = useAppDispatch();
  const fetchJobPostStates = useAppSelector((state) => state.fetchJobPost);
  const customTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        text: "light-gray",
        primary25: "#E5E7EB",
        primary: "#d6dfdf",
        neutral0: "white",
      },
    };
  };
  
  const darkTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        primary25: "#404657",
        primary: "#d6dfdf",
        neutral0: "#293647",
      },
    };
  };
  useEffect(() => {
    dispatch(fetchJobPost());
  }, []);
  const [moredrop, setmoredrop] = useState("");
  const onSubmitHandler = (userid: any) => {
    if (!moredrop) setmoredrop(userid);
    if (moredrop) setmoredrop("");
  };
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [All, setAll] = useState(false);
  const [enteredWord,setEnteredWord]=useState('');
  const [filterAttribute,setFilterAttribute]=useState('')
  const [enteredsubmitWord, setenteredsubmitWord] = useState("");
  const input = {
    page: page + 1,
    itemsPerPage: itemsPerPage,
    All: All,
  };
  const input2={
    page: page + 1,
    itemsPerPage: itemsPerPage,
    All: All,
    filterAttribute:filterAttribute,
    wordEntered: enteredWord,
  }
  const {allfilteredjobPosts, count}=props
 

  useEffect(() => {
    props.getAllFilteredJobPosts(input2);
    props.getAllJobPosts()
  }, [enteredWord, filterAttribute]);

  const validation = () => {
    if (program === "") {
      toast.error("select a program");
      return;
    }
    if (cycle === "") {
      toast.error("select a cycle");
      return;
    }
    if (cohort === "") {
      toast.error("select a cohort");
      return;
    }
    if (description === "") {
      toast.error("Enter your description");
      return;
    } else {
      createNewJobPost();
    }
  };
  const createNewJobPost = () => {
    const data = {
      title: title,
      program: program,
      cycle: cycle,
      cohort: cohort,
      description: description,
    };
    if (props.createJobPostAction(data)) {
      setTitle("");
      setProgram("");
      setCycle("");
      setCohort("");
      setDescription("");
      setAddNewTraineeModel(false);
    }
  };
  const toogleActions = (id: any) => {
    setActionsList((prevState) => (!prevState ? id : null));
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if(filterAttribute==='' || filterAttribute===null){
        toast.error("Please insert a filter attribute")
      }
      setEnteredWord(enteredsubmitWord);
    }
  };

  const handleDelete = (id: any) => {
    try {
      props.deleteJobPostAction({ id });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    props.fetchJobPost(input);
  }, [page, itemsPerPage]);

  console.log(
    "Here",
    Math.ceil(jobs?.pagination.totalItems / itemsPerPage),
    page
  );

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(jobs?.pagination.totalItems / itemsPerPage),
    currentPage: page,
  });
  return (
    <>
      <ToastContainer />
      <div className="h-screen w-[100%]">
      <div className="flex flex-col  h-screen w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen overflow-x-hidden">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                
                <Select
                  className="sm:text-sm w-full sm:w-40 rounded-bt-rd dark:text-ltb"
                  options={[
                    { value: "title", label: "Job Title" },
                    { value: "program", label: "Program" },
                    { value: "cycle", label: "Cycle" },
                    { value: "cohort", label: "Cohort" },
                    { value: "description", label: "Description" },
                    { value: "", label: "Select by" },
                  ]}
                  defaultValue={{ value: "", label: "Select by" }}
                  onChange={(e) => setFilterAttribute(`${e?.value}`)}
                  theme={theme ? customTheme : darkTheme}
                />
                 <div className="w-full sm:w-auto flex-grow">
                    <div className="relative">
                      <input
                        onChange={(e) => setenteredsubmitWord(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        className="w-full bg-row-gray dark:bg-[#293647] dark:text-ltb border border-bdr dark:border-cg dark:border-opacity-5 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        value={enteredsubmitWord}
                        placeholder="Search"
                        type="text"
                        name="search"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
              <div className="px-8">
                <div className="bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%]">
                  <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="hidden md_:inline-block w-full h-auto lg:min-w-full shadow rounded-lg overflow-y-hidden">
                        <table className="min-w-full leading-normal">
                          <thead className=" w-full px-32 sticky top-0">
                            <tr>
                              <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                Job Title
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                Program
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                Cycle
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                Cohort
                              </th>
                              {
                                // <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                //   Description
                                // </th>
                              }
                              <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto">
                            {allfilteredjobPosts?.data?.map((item: any) => (
                              <tr
                                className="hover:bg-slate-700 transition-colors"
                                key={item.id}
                              >
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex">
                                    <div className="">
                                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {item?.title}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex items-center">
                                    <div className="">
                                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {item?.program?.title}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex items-center">
                                    <div className="">
                                      {item?.cycle && (
                                        <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                          {item?.cycle?.name}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex items-center">
                                    <div className="">
                                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {item?.cohort?.title}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                {/* <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex items-center">
                                    <div className="">
                                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {item?.description}
                                      </p>
                                    </div>
                                  </div>
                                </td> */}
                                <td>
                              <div className="flex flex-row gap-2 mt-2 justify-center">
                              <Link to={`/applicant/available-job/${item.id}/apply`} replace>
                              <button className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer">
                              Apply
                              </button>
                              </Link>
                              </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex md_:hidden flex-col gap-4 w-full rounded-lg">
                        <label className="text-left text-black-text dark:text-white text-lg font-bold">
                          Job POST
                        </label>
                        {allfilteredjobPosts?.data?.map((item: any) => (
                          <div
                            key={item._id}
                            className="flex flex-col w-full gap-2 border border-solid border-transparent border-t-black dark:border-t-white border-t-4 rounded-t-sm"
                          >
                            <div className="flex flex-col w-full mt-3">
                              <label className="text-left text-gray-400 text-sm">
                                Job Title
                              </label>
                              <label className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.title}
                              </label>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Program
                              </label>
                              <label className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.program?.title}
                              </label>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Cycle
                              </label>
                              <label className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.cycle && (
                                  <p className="text-gray-900  dark:text-white whitespace-no-wrap">
                                    {item?.cycle?.name}
                                  </p>
                                )}
                              </label>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Cohort
                              </label>
                              <label className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.cohort?.title}
                              </label>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Description
                              </label>
                              <div className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.description}
                              </div>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Action
                              </label>
                              <div className="flex flex-row gap-2 mt-2">
                            
                              <Link to={`/applicant/available-job/${item.id}/apply`} replace>
                              <button className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer">
                              Apply
                              </button>
                              </Link>
                              
                              </div>
                            </div>
                          </div>
                        ))}
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
                            disabled={
                              page >=
                              Math.ceil(
                                jobs?.pagination.totalItems / itemsPerPage
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
                                  jobs?.pagination.totalItems / itemsPerPage
                                ) - 1
                              )
                            }
                            disabled={
                              page >=
                              Math.ceil(
                                jobs?.pagination.totalItems / itemsPerPage
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

const mapState = (state: any) => ({
  programs: state.programs,
  cycles: state.cycles,
  cohorts: state.cohorts,
  deleteJobPostStates: state.deleteJobPost,
  fetchJoPostStates: state.fetchJobPost,
  allfilteredjobPosts: state.filterJobPost,
  errors: state.errors,
  count: state.count,
});

export default connect(mapState, {
  getAllPrograms,
  getAllCycles,
  getAllCohorts,
  createJobPostAction,
  deleteJobPostAction,
  fetchJobPost,
  getAllFilteredJobPosts: getAllFilteredJobPosts,
  getAllJobPosts: getAllJobPosts,
})(ApplicantSeachJobPost);