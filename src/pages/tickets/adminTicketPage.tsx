import React, { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../hooks/darkmode";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import * as AiIcons from "react-icons/ai";
import * as icons from "react-icons/ai";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../redux/actions/ticketActions";
import { ProgramSkeleton } from "../../skeletons/programSkeleton";

const AdminTicketPage = (props: any) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const tickets = useSelector(
    (state: any) => state.tickets?.tickets || []
  );
  const [enteredSearchWord, setEnteredSearchWord] = React.useState("");
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [enteredsubmitWord, setenteredsubmitWord] = useState("");
  const [enteredWord, setEnteredWord] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionsList, setActionsList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [filterAttribute, setFilterAttribute] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);



  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(getAllTickets());
    } catch (error) {
      toast.error("Failed to fetch tickets");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!filterAttribute) {
        toast.error("Please select a filter attribute");
        return;
      }
      setSubmittedSearchTerm(searchTerm);
    }
  };

  const Open = () => {
    setCreateTicketModal(true);
  };

  const removeModal = () => {
    let newState = !setCreateTicketModal;
    setCreateTicketModal(newState);


    // setEntries([]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSubmittedSearchTerm(value);
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

  const toggleActions = (id) => {
    setActionsList((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return <ProgramSkeleton />;
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`h-svh w-max z-20 bg-opacity-30 backdrop-blur-sm absolute flex  justify-center ${
          createTicketModal === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white dark:bg-dark-bg w-full max-h-[500px]  overflow-auto md_:w-[65%] md-sm:w-[95%] rounded-lg p-4 pb-8">
          <div className="card-title w-full flex flex-wrap justify-center items-center">
            <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
              <icons.AiOutlineClose
                className="float-right text-3xl cursor-pointer"
                onClick={() => removeModal()}
              />

              {"CREATE TICKET"}
            </h3>
            <div className="flex flex-col w-full mt-14 md_:mt-5">
              
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div className="bg-light-bg dark:bg-dark-frame-bg h-screen">
              <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  
                  <div className="w-full sm:w-40">
                    <Select
                      className="w-full text-sm rounded-md dark:text-ltb"
                      options={[
                        { value: "title", label: "Subject" },
                        { value: "status", label: "Status" },
                        { value: "author", label: "Author" },
                        { value: "", label: "Filter by" },
                      ]}
                      defaultValue={{ value: "", label: "Filter by" }}
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
                        value={searchTerm}
                        placeholder="Search"
                        type="text"
                        name="search"
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
                      <div className="hidden md_:inline-block w-full h-auto lg:min-w-full shadow rounded-lg overflow-y-hidden">
                        <table className="min-w-full leading-normal">
                          <thead className=" w-full px-32 sticky top-0">
                            <tr>
                              <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Author Name"}
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                {"Author Email"}
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Subject"}
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Status"}
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Created At"}
                              </th>

                              <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Actions"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto">
                            {tickets && tickets.length > 0 ? (
                              tickets.map((ticket: any) => (
                                <tr
                                  className="dark:hover:bg-slate-700 hover:bg-slate-300 transition-colors"
                                  key={ticket.id}
                                >
                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex">
                                      <div className="">
                                        <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {ticket.author?.firstName || 'N/A'} {ticket.author?.lastName || ''}

                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex items-center">
                                      <div className="">
                                        <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {ticket.author?.email || 'N/A'}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex items-center">
                                      <div className="">
                                        <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {ticket.title}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex items-center">
                                      <div className="">
                                        <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {ticket.status}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex items-center">
                                      <div className="">
                                        <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                          {new Date(
                                            parseInt(ticket.updatedAt)
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <HiDotsVertical
                                        size={16}
                                        onClick={(e: any) => {
                                          e.preventDefault();
                                          toggleActions(ticket.id);
                                        }}
                                        className="text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer"
                                      />
                                      <div
                                        className={`${
                                          actionsList === ticket.id
                                            ? "block"
                                            : "hidden"
                                        } absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                        id="dropdown"
                                      >
                                        <ul
                                          className="py-1"
                                          aria-labelledby="dropdown"
                                        >
                                          <li>
                                            <Link
                                              to={`/admin/ticket/${ticket.id}`}
                                              className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                            >
                                              View
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              to={`/admin/ticket/${ticket.id}/resolve`}
                                              className="text-sm hover:bg-gray-100 text-gray-700  dark:text-white   dark:hover:bg-gray-500 block px-4 py-2"
                                            >
                                              Reply
                                            </Link>
                                          </li>
                                          <li></li>
                                        </ul>
                                      </div>
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
                          Tickets
                        </label>
                        {tickets &&
                          tickets.map((ticket: any) => (
                            <div
                              key={ticket.id}
                              className="flex flex-col w-full gap-2 border border-solid border-transparent border-t-black dark:border-t-white border-t-4 rounded-t-sm"
                            >
                              <div className="flex flex-col w-full mt-3">
                                <label className="text-left text-gray-400 text-sm">
                                  Author Name
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {ticket.author?.firstName || 'N/A'} {ticket.author?.lastName || ''}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Author Email
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {ticket.author?.email || 'N/A'}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Subject
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {ticket.title}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Status
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {ticket.status || 'N/A'}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Last Update
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {new Date(
                                    parseInt(ticket.updatedAt)
                                  ).toLocaleDateString()}
                                </label>
                              </div>

                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Action
                                </label>
                                <div className="flex flex-row gap-2 mt-2">
                                  <Link
                                    to={`/admin/ticket/${ticket.id}`}
                                    className="text-white bg-yellow-500 border border-solid border-yellow-500 rounded-md px-2 text-xs"
                                  >
                                    View
                                  </Link>
                                  <Link
                                    to={`/admin/ticket/${ticket.id}/resolve`}
                                    className="text-white bg-green border border-solid border-green rounded-md px-2 text-xs"
                                  >
                                    Reply
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {tickets.data && (
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
                          <button className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100">
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

export default AdminTicketPage;
