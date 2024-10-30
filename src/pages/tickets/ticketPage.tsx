/* eslint-disable max-lines */
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
import SearchFilter from "./ticketSearch";
import MobileTicketCard from "./mobileTicket";

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
  const ticketFilterOptions = [
    { value: "title", label: "Subject" },
    { value: "status", label: "Status" },
    { value: "", label: "Filter by" },
  ];

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
                  <SearchFilter
                    options={ticketFilterOptions}
                    filterAttribute={filterAttribute}
                    setFilterAttribute={setFilterAttribute}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    handleKeyDown={handleKeyDown}
                    theme={theme}
                  />
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
                            <MobileTicketCard ticket={ticket} />
                          ))}
                      </div>
                    </div>
                  </div>
                  {tickets && (
                    <TicketPagination
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      page={page}
                      setPage={setPage}
                      paginationRange={paginationRange}
                    />
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
})(TicketPage);
