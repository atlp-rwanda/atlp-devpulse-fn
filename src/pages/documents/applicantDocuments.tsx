import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../../components/sidebar/navHeader";
import * as icons from "react-icons/ai";
import { connect } from "react-redux";
import { createProgramAction } from "../../redux/actions/createProgramAction";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import programSchema from "../../validation/programSchema";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { ProgramSkeleton } from "../../skeletons/programSkeleton";
import {
  getAllFilteredPrograms,
  getAllprograms} from "../../redux/actions/filterProgramActions";
import Select from "react-select";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import { fetchPrograms } from "../../redux/actions/fetchProgramsAction";
import { deleteProgramAction } from "../../redux/actions/deleteProgramAction";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../hooks/darkmode";
import {debounce} from "lodash"

const ApplicantDocuments = (props: any) => {
  const navigate = useNavigate();
  const { createProgramStates, fetchProgramStates, deleteProgramStates } =
    props;
  const { theme, setTheme } = useTheme();
  const { allfilteredPrograms,count } = props;
  const [addNewProgramModal, setAddNewProgramModal] = useState(false);
  const [entries, setEntries] = useState<Array<string>>([]);
  const [filterAttribute, setFilterAttribute] = useState("");
  const [enteredWord, setEnteredWord] = useState("");
  const [enteredsubmitWord, setenteredsubmitWord] = useState("");
  const [All, setAll] = useState(false);
  const [submitData, setSubmitData] = useState({
    title: "",
    description: "",
    mainObjective: "",
    requirements: [""],
    modeOfExecution: "",
    duration: "",
  });
  const [actionsList, setActionsList] = useState(null);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    mainObjective: "",
    modeOfExecution: "",
    requirements: "",
    duration: "",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if(filterAttribute==='' || filterAttribute===null){
        toast.error("Please insert a filter attribute")
      }
      setEnteredWord(enteredsubmitWord);
    }
  };
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setenteredsubmitWord(searchTerm); 
    setEnteredWord(searchTerm); 
  };


  const debouncedSearch = useCallback(
    debounce(() => {
      props.getAllFilteredPrograms(input2);
    }, 300), 
    [enteredWord, filterAttribute, page, itemsPerPage]
  );

  useEffect(() => {
    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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
  const handleInputChange = (e: any) => {
    e.preventDefault();

    setCurrentEntry((prevState) =>
      e.target.name === "entries" ? e.target.value : prevState
    );

    setSubmitData((prevState) => ({
      title: e.target.name === "title" ? e.target.value : prevState.title,
      description:
        e.target.name === "description"
          ? e.target.value
          : prevState.description,
      mainObjective:
        e.target.name === "mainObjective"
          ? e.target.value
          : prevState.mainObjective,
      requirements: prevState.requirements,
      modeOfExecution:
        e.target.name === "modeOfExecution"
          ? e.target.value
          : prevState.modeOfExecution,
      duration:
        e.target.name === "duration" ? e.target.value : prevState.duration,
    }));
  };

  const Open = () => {
    setAddNewProgramModal(true);
  };
  const removeModal = () => {
    let newState = !addNewProgramModal;
    setAddNewProgramModal(newState);

    setSubmitData({
      title: "",
      description: "",
      mainObjective: "",
      requirements: [""],
      modeOfExecution: "",
      duration: "",
    });

    setErrors({
      title: "",
      description: "",
      mainObjective: "",
      requirements: "",
      modeOfExecution: "",
      duration: "",
    });

    setEntries([]);
  };
  const addEntry = (entry: string) => {
    let itemFound = entries.find((item) => item === entry);
    if (!itemFound && entry !== "") {
      setEntries((prevState) => [...prevState, entry]);
    }
    setCurrentEntry("");
  };

  const removeEntry = (entry: string) => {
    setEntries(entries.filter((item) => item !== entry));
  };

  const validateForm = (data: any, schema: any) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) {
      //@ts-ignore
      setErrors({});
      return true;
    }

    const newErrors = {};
    error.details.forEach((detail: any) => {
      newErrors[detail.path[0]] = detail.message;
    });

    //@ts-ignore
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitData((prevState) => ({ ...prevState, requirements: entries }));

      const obj = {
        title: submitData.title,
        description: submitData.description,
        mainObjective: submitData.mainObjective,
        requirements: entries,
        modeOfExecution: submitData.modeOfExecution,
        duration: submitData.duration,
      };
      if (validateForm(submitData, programSchema)) {
        await dispatch(createProgramAction(obj));
        removeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(allfilteredPrograms?.data?.length / itemsPerPage),
    currentPage: page,
  });
  const input = {
    page: page + 1,
    pageSize: itemsPerPage,
  };

  const input2={
    page: page + 1,
    itemsPerPage: itemsPerPage,
    All: All,
    filterAttribute:filterAttribute,
    wordEntered: enteredWord,
  }

  useEffect(() => {
    props.getAllFilteredPrograms(input2);
  }, [enteredWord, filterAttribute]);
  const toogleActions = (id: any) => {
    setActionsList((prevState) => (!prevState ? id : null));
  };

  const handleDelete = (id: any) => {
    try {
      props.deleteProgramAction({ id });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { data, error } = props.fetchPrograms(input);

  }, [page, itemsPerPage]);

  const isLoading = fetchProgramStates.loading;

  if (isLoading) {
    return <ProgramSkeleton />
  }
    
  return (
    <>
      <ToastContainer />
      {/* Create New Document */}
     
      <div className="flex flex-col w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div className="bg-light-bg dark:bg-dark-frame-bg h-screen">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-full sm:w-auto">
                    
                  </div>
                  <div className="w-full sm:w-40">
                    <Select
                      className="w-full text-sm rounded-md dark:text-ltb"
                      options={[
                        { value: "title", label: "Program Name" },
                        { value: "mainObjective", label: "Main Objective" },
                        { value: "modeOfExecution", label: "Mode Of Execution" },
                        { value: "description", label: "Program Description" },
                        { value: "duration", label: "Duration" },
                        { value: "", label: "Select by" },
                      ]}
                      defaultValue={{ value: "", label: "Select by" }}
                      onChange={(e) => setFilterAttribute(`${e?.value}`)}
                      theme={theme ? customTheme : darkTheme}
                    />
                  </div>
                  <div className="w-full sm:w-auto flex-grow">
                    <div className="relative">
                      <input
                        onChange={handleSearchChange}
                        onKeyDown={(e) => handleKeyDown(e)}
                        className="w-full bg-row-gray dark:bg-[#293647] dark:text-ltb border border-bdr dark:border-cg dark:border-opacity-5 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#56C870] text-sm"
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
                  <div className="bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto">
                    <div>
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="hidden md_:inline-block w-full h-auto lg:min-w-full shadow rounded-lg overflow-y-hidden">
                          <table className="min-w-full leading-normal">
                            <thead className=" w-full px-32 sticky top-0">
                              <tr>
                                <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {"Documentation Name"}
                                </th>

                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                  {"Description"}
                                </th>

                                
                                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Requirements"}
                              </th> */}
                                <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {"action"}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="overflow-y-auto">
                              {allfilteredPrograms.data ? (
                                allfilteredPrograms.data.map((item: any) => (
                                  <tr
                                    className="dark:hover:bg-slate-700 hover:bg-slate-300 transition-colors"
                                    key={item._id}
                                  >
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex">
                                        <div className="">
                                          <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                            {item.title}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex items-center">
                                        <div className="">
                                          <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                            {item.mainObjective}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    
                                    <td>
                                      <div className="flex flex-row gap-2 mt-2 justify-center">
                                        <Link
                                          to={`/applicant/documents/${item._id}`}
                                          replace
                                        >
                                          <button className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer">
                                            More Details
                                          </button>
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td></td>
                                  <td className="float-right text-fb p-5 font-normal text-stone-500 dark:text-stone-400">
                                    No data
                                  </td>
                                  <td></td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <div className="flex md_:hidden flex-col gap-4 w-full rounded-lg">
                          <label className="text-left text-black-text dark:text-white text-lg font-bold">
                          Documentations
                          </label>
                          {allfilteredPrograms.data &&
                            allfilteredPrograms.data.map((item: any) => (
                              <div
                                key={item._id}
                                className="flex flex-col w-full gap-2 border border-solid border-transparent border-t-black dark:border-t-white border-t-4 rounded-t-sm"
                              >
                                <div className="flex flex-col w-full mt-3">
                                  <label className="text-left text-gray-400 text-sm">
                                    Documentation Title
                                  </label>
                                  <label className="text-left text-black-text dark:text-white text-base font-normal">
                                    {item.title}
                                  </label>
                                </div>
                                <div className="flex flex-col w-full">
                                  <label className="text-left text-gray-400 text-sm">
                                    Description
                                  </label>
                                  <label className="text-left text-black-text dark:text-white text-base font-normal">
                                    {item.mainObjective}
                                  </label>
                                </div>
                                
                                
                                <div className="flex flex-col w-full">
                                  <label className="text-left text-gray-400 text-sm">
                                    Action
                                  </label>
                                  <div className="flex flex-row gap-2 mt-2">
                                        <Link
                                          to={`/applicant/documents/${item._id}`}
                                          replace
                                        >
                                          <button className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer">
                                            More Details
                                          </button>
                                        </Link>
                                      </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    {allfilteredPrograms.data && (
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
                            <button
                              className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                            >
                              <AiIcons.AiOutlineDoubleRight />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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
  createProgramStates: state.createProgram,
  fetchProgramStates: state.fetchPrograms,
  deleteProgramStates: state.deleteProgram,
  allfilteredPrograms: state.filterProgram,
  errors: state.errors,
  count: state.count,
});

export default connect(mapState, {
  fetchPrograms,
  createProgramAction,
  deleteProgramAction,
  getAllFilteredPrograms: getAllFilteredPrograms,
  getAllprograms: getAllprograms,
})(ApplicantDocuments);
