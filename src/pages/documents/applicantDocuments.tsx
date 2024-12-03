import { useEffect, useState } from "react";
import * as icons from "react-icons/ai";
import { connect } from "react-redux";
import { createDocsAction } from "../../redux/actions/createDocsAction";
import { useAppDispatch } from "../../hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { ProgramSkeleton } from "../../skeletons/programSkeleton";

import Select from "react-select";
import { fetchDocs } from "../../redux/actions/fetchDocsAction";
import { deleteDocsAction } from "../../redux/actions/deleteDocsAction";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../hooks/darkmode";
import { getDocsByRole } from "../../redux/actions/fetchDocsAction";

const Documents = (props: any) => {
  const navigate = useNavigate();
  const { createDocStates, fetchDocsStates, deleteDocsStates,getDocsByRole
  } =
    props;
  const { theme, setTheme } = useTheme();
  const { allDocs} = props;
  const [addNewProgramModal, setAddNewProgramModal] = useState(false);
  const [entries, setEntries] = useState<Array<string>>([]);
  const [filterAttribute, setFilterAttribute] = useState("");
  const [enteredWord, setEnteredWord] = useState("");
  const [enteredsubmitWord, setenteredsubmitWord] = useState("");
  const [All, setAll] = useState(false);
  const [submitData, setSubmitData] = useState({
    title: "",
    description: "",
    role: "",

  });
  const role=localStorage.getItem("roleName")
  const [actionsList, setActionsList] = useState(null);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    role:"",
  });

  useEffect(() => {
    props.getDocsByRole(role);
    dispatch(fetchDocs())
  }, [dispatch]);

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
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setenteredsubmitWord(searchTerm); 
    setEnteredWord(searchTerm); 
  };

  const stripHTMLTags = (html) => {
    // This will remove HTML tags from the string and return plain text
    return new DOMParser().parseFromString(html, 'text/html').body.textContent || "";
  };

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
      role: e.target.name === "role" ? e.target.value : prevState.role,

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
      role: "",
    });

    setErrors({
      title: "",
      description: "",
      role: "",
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
    const newErrors: any = {};
  if (!submitData.title.trim()) newErrors.title = "Title is required";
  if (!submitData.description.trim()) newErrors.description = "Description is required";
  if (!submitData.role) newErrors.role = "Role selection is required";

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    try {
      setSubmitData((prevState) => ({ ...prevState}));

      const obj = {
        title: submitData.title,
        description: submitData.description,
        role: submitData.role,
      };
      
        await dispatch(createDocsAction(obj));
        removeModal();
      
    } catch (error) {
      console.log(error);
    }
  }
  };

  
  



  const handleDelete = (id: any) => {
    try {
      props.deleteDocsAction(id );
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = fetchDocsStates.loading;

  if (isLoading) {
    return <ProgramSkeleton />
  }
    
  return (
    <>
      <ToastContainer />
   
      <div className="flex flex-col w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div className="bg-light-bg dark:bg-dark-frame-bg h-screen">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-full sm:w-auto">
                    
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
                              {allDocs ? (
                                allDocs.data.filter((item: any) => item.role === 'applicant').map((item: any) => (
                                  <tr
                                    className="dark:hover:bg-slate-700 hover:bg-slate-300 transition-colors"
                                    key={item.id}
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
                                      <div className="flex">
                                        <div className="">
                                        <p
                              className="text-gray-900 dark:text-white whitespace-no-wrap"
                            >
                              {stripHTMLTags(item.description).slice(0,30)}...
                              </p>
                                        </div>
                                      </div>
                                    </td>

                                    
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm text-center">
                                    <div className="flex justify-center items-center">
                                        <Link
                                          to={`/applicant/documents/${item.id}`}
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
                          {allDocs.data.filter((item: any) => item.role === 'applicant').map((item: any) => (
                              <div
                                key={item.id}
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
                                  <p
                              className="text-gray-900 dark:text-white whitespace-no-wrap"
                            >
                              {stripHTMLTags(item.description).slice(0,30)}...

                            </p>
                                  </label>
                                </div>

                                
                                
                                
                                <div className="flex flex-col w-full">
                                  <label className="text-left text-gray-400 text-sm">
                                    Action
                                  </label>
                                  <div className="flex flex-row gap-2 mt-2">
                                        <Link
                                          to={`/applicant/documents/${item.id}`}
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
                    {allDocs.data && (
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
  createDocStates: state.createDocs,
  fetchDocsStates: state.fetchDocs,
  deleteDocStates: state.deleteDocs,
  allDocs: state.fetchDocs,
  MyDocs:state.fetchDocsByRole,
  errors: state.errors,
});

export default connect(mapState, {
  fetchDocs,
  createDocsAction,
  deleteDocsAction,
  getDocsByRole:getDocsByRole
})(Documents);
