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

const AdminTicketPage = (props: any) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const tickets = useSelector(
    (state: any) => state.tickets?.tickets || []
  );
  const [filterAttribute, setFilterAttribute] = React.useState("");
  const [enteredSearchWord, setEnteredSearchWord] = React.useState("");
  const [actionsList, setActionsList] = React.useState("");
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [enteredsubmitWord, setenteredsubmitWord] = useState("");
  const [enteredWord, setEnteredWord] = useState("");

  console.log('raw tickets: ', tickets);
  const getFormattedTickets = () => {
    return Object.entries(tickets).map(([key, ticket]: [string, any]) => {
      if (key === "0") {
        return {
          id: ticket.id,
          title: ticket.title,
          status: ticket.status,
          createdAt: ticket.createdAt,
          author: ticket.author
        };
      }
      return ticket;
    });
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        await dispatch(getAllTickets());
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      }
    };
    fetchTickets();
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setenteredsubmitWord(searchTerm);
    setEnteredWord(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (filterAttribute === "" || filterAttribute === null) {
        toast.error("Please insert a filter attribute");
      }
      setEnteredWord(enteredsubmitWord);
    }
  };

  const toggleActions = (id) => {
    setActionsList(actionsList === id ? "" : id);
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

  const formattedTickets = getFormattedTickets();

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-40">
            <Select
              className="w-full text-sm rounded-md dark:text-ltb"
              options={[
                { value: "title", label: "Ticket Title" },
                { value: "status", label: "Status" },
                { value: "priority", label: "Priority" },
                { value: "author", label: "Author" },
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
                onKeyDown={handleKeyDown}
                className="w-full bg-row-gray dark:bg-[#293647] dark:text-ltb border border-bdr dark:border-cg dark:border-opacity-5 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#56C870] text-sm"
                value={enteredSearchWord}
                placeholder="Search tickets"
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

        <div className="px-8">
          <div className="bg-white dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-full mx-auto mt-4">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead className="w-full px-32 sticky top-0">
                    <tr>
                      <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                        Author Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                        Author Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                        Ticket Title
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="overflow-y-auto">
                    {formattedTickets.map((ticket: any) => (
                      <tr
                        key={ticket.id}
                        className="dark:hover:bg-slate-700 hover:bg-slate-300 transition-colors"
                      >
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                          {ticket.author?.firstName || 'N/A'} {ticket.author?.lastName || ''}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                          {ticket.author?.email || 'N/A'}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                            {ticket.title}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                            {ticket.status}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                          {new Date(parseInt(ticket.createdAt)).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                          <div className="relative">
                            <HiDotsVertical
                              size={16}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleActions(ticket._id);
                              }}
                              className="text-black dark:text-white text-3xl mx-auto cursor-pointer"
                            />
                            <div
                              className={`${
                                actionsList === ticket._id ? "block" : "hidden"
                              } absolute right-0 bg-white dark:bg-dark-tertiary dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                            >
                              <ul className="py-1" aria-labelledby="dropdown">
                                <li>
                                  <Link
                                    to={`/tickets/${ticket.id}/resolve`}
                                    className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white block px-4 py-2"
                                  >
                                    Resolve
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`/admin/ticket/${ticket.id}`}
                                    className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white block px-4 py-2"
                                  >
                                    View
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTicketPage;
