import React, { useCallback, useEffect, useState, useMemo } from "react";
import * as icons from "react-icons/ai";
import { connect, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { ProgramSkeleton } from "../../skeletons/programSkeleton";
import Select from "react-select";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../hooks/darkmode";
import { debounce } from "lodash";
import {
  createTicket,
  getAllTickets,
  getUserTickets,
} from "../../redux/actions/ticketActions";
import {
  getAllFilteredTickets,
  getAllTicketAttributes,
} from "../../redux/actions/filterTicketsAction";
import TicketPagination from "./ticketPagination";
import CreateTicketModal from "./createTicketModal";

const TicketPage = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [filterAttribute, setFilterAttribute] = useState("");
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionsList, setActionsList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [All, setAll] = useState(false);
  const tickets = useSelector((state: any) => state.tickets?.tickets || []);
  const filteredTickets = useSelector(
    (state: any) => state.filteredTickets?.filteredTickets || []
  );

  const displayTickets = useMemo(() => {
    if (isFiltering) {
      return filteredTickets;
    }
    return tickets;
  }, [isFiltering, filteredTickets, tickets]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (filterAttribute === "" || filterAttribute === null) {
        toast.error("Please select a filter attribute");
        return;
      }
      const searchTerm = e.target.value;
      debouncedSearch(searchTerm);
    }
  };

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(filteredTickets?.data?.length / itemsPerPage),
    currentPage: page,
  });

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!filterAttribute) {
        toast.error("Please select a filter attribute");
        return;
      }

      if (!term) {
        setIsFiltering(false);
        await fetchTickets();
        return;
      }

      setIsFiltering(true);
      try {
        await dispatch(
          getAllFilteredTickets({
            page: page + 1,
            itemsPerPage,
            All,
            filterAttribute,
            wordEntered: term,
          })
        );
      } catch (error) {
        toast.error("Failed to fetch filtered tickets");
      }
    }, 300),
    [filterAttribute, page, itemsPerPage, All]
  );

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

  const fetchTickets = useCallback(async () => {
    if (isFiltering) return;
    setIsLoading(true);
    try {
      await dispatch(getUserTickets());
    } catch (error) {
      toast.error("Failed to fetch tickets");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, isFiltering]);

  useEffect(() => {
    fetchTickets();
    return () => {
      debouncedSearch.cancel();
    };
  }, [fetchTickets]);

  const handleCreateTicket = async (ticketData) => {
    await dispatch(createTicket(ticketData.title, ticketData.body));
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
      <CreateTicketModal
        isOpen={createTicketModal}
        onClose={() => setCreateTicketModal(false)}
        onSubmit={handleCreateTicket}
      />
      <div className="flex flex-col w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div className="bg-light-bg dark:bg-dark-frame-bg h-screen">
              <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-full sm:w-auto">
                    <button
                      onClick={() => setCreateTicketModal(true)}
                      className="flex items-center justify-center w-full sm:w-auto bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <icons.AiOutlinePlus className="mr-2" /> New Ticket
                    </button>
                  </div>
                  <div className="w-full sm:w-40">
                    <Select
                      className="w-full text-sm rounded-md dark:text-ltb"
                      options={[
                        { value: "title", label: "Subject" },
                        { value: "status", label: "Status" },
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
                                {"Subject"}
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                {"Status"}
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Last Update"}
                              </th>

                              <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"action"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto">
                            {displayTickets && displayTickets.length > 0 ? (
                              displayTickets.map((ticket: any) => (
                                <tr
                                  className="dark:hover:bg-slate-700 hover:bg-slate-300 transition-colors"
                                  key={ticket.id}
                                >
                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex">
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
                                              to={`/applicant/ticket/${ticket.id}`}
                                              className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                            >
                                              View
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              to={`/applicant/ticket/${ticket.id}/reply`}
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
                        {displayTickets &&
                          displayTickets.map((ticket: any) => (
                            <div
                              key={ticket.id}
                              className="flex flex-col w-full gap-2 border border-solid border-transparent border-t-black dark:border-t-white border-t-4 rounded-t-sm"
                            >
                              <div className="flex flex-col w-full mt-3">
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
                                  {ticket.status}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Latest Update
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
                                    to={`/applicant/ticket/${ticket.id}`}
                                    className="text-white bg-yellow-500 border border-solid border-yellow-500 rounded-md px-2 text-xs"
                                  >
                                    View
                                  </Link>
                                  <Link
                                    to={`/applicant/ticket/${ticket.id}/reply`}
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
                  {tickets && (
                    <TicketPagination itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} page={page} setPage={setPage} paginationRange={paginationRange}/>
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
  tickets: state.tickets.tickets,
  currentTicket: state.tickets.currentTicket,
  loading: state.tickets.loading,
  error: state.tickets.error,
});

export default connect(mapState, {
  getAllFilteredTickets,
  getUserTickets,
  createTicket,
  getAllTickets,
})(TicketPage);
