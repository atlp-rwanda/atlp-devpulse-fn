import React, { useCallback, useEffect, useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../hooks/darkmode";
import {useCustomPagination} from "../../components/Pagination/useCustomPagination";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../redux/actions/ticketActions";
import { ProgramSkeleton } from "../../skeletons/programSkeleton";
import {
  getAllFilteredTickets,
  getAllTicketAttributes,
} from "../../redux/actions/filterTicketsAction";
import {debounce} from "lodash"
import TicketPagination from "./ticketPagination";
import SearchFilter from "./ticketSearch";
import MobileTicketCard from "./mobileTicket";
import TicketTable from "./ticketTable";

const AdminTicketPage = (props: any) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const tickets = useSelector(
    (state: any) => state.tickets?.tickets || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttribute, setFilterAttribute] = useState("");
  const [actionsList, setActionsList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [All, setAll] = useState(false);
  const { allfilteredTickets, count } = props;
  const [isFiltering, setIsFiltering] = useState(false);
  const filteredTickets = useSelector((state: any) => state.filteredTickets?.filteredTickets || []);
  const filterOptions = [
    { value: "title", label: "Subject" },
    { value: "status", label: "Status" },
    { value: "author", label: "Author" },
    { value: "", label: "Filter by" },
  ];

  const columns = [
    { key: 'title', header: 'Subject' },
    { 
      key: 'author.firstname', 
      header: 'Author Name',
      render: (ticket: any) => {
        const fullName = `${ticket.author?.firstname || ''} ${ticket.author?.lastname || ''}`.trim();
        return fullName || '-';
      }
    },
    { key: 'author.email', header: 'Author Email', render: (item: any) => item.author?.email || '-'},    
    { key: 'status', header: 'Status' },
    { key: 'updatedAt', header: 'Last Update' },
  ];

  const adminActionLinks = [
    { label: 'View', to: '/admin/ticket/{id}' },
    { label: 'Resolve', to: '/admin/ticket/{id}/resolve' },
  ];


  const displayTickets = useMemo(() => {
    if (isFiltering) {
      return filteredTickets;
    }
    return tickets;
  }, [isFiltering, filteredTickets, tickets]);
  console.log("Display Tickets: ", displayTickets);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!filterAttribute) {
        toast.error("Please select a filter attribute");
        return;
      }
      const searchTerm = e.target.value;
      debouncedSearch(searchTerm)
    }
  };


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
        await dispatch(getAllFilteredTickets({
          page: page + 1,
          itemsPerPage,
          All,
          filterAttribute,
          wordEntered: term,
        }));
      } catch (error) {
        toast.error("Failed to fetch filtered tickets");
      }
    }, 300),
    [filterAttribute, page, itemsPerPage, All]
  );

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

  const toggleActions = (id) => {
    setActionsList((prev) => (prev === id ? null : id));
  };

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(allfilteredTickets?.data?.length / itemsPerPage),
    currentPage: page,
  });

  if (isLoading) {
    return <ProgramSkeleton />;
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
                  <SearchFilter
                    options={filterOptions}
                    filterAttribute={filterAttribute}
                    setFilterAttribute={setFilterAttribute}
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    handleKeyDown={handleKeyDown}
                    theme={theme}
                    placeholder="Search"
                    containerClassName="my-4"
                  />
                </div>
              </div>
              <div className="px-8">
                <div className="bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto">
                  <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="hidden md_:inline-block w-full h-auto lg:min-w-full shadow rounded-lg overflow-y-hidden">
                        <TicketTable
                          columns={columns}
                          data={displayTickets}
                          actionLinks={adminActionLinks}
                          onActionToggle={toggleActions}
                          actionsList={actionsList}
                        />
                      </div>
                      <div className="flex md_:hidden flex-col gap-4 w-full rounded-lg">
                        <label className="text-left text-black-text dark:text-white text-lg font-bold">
                          Tickets
                        </label>
                        {tickets &&
                          tickets.map((ticket: any) => (
                            <MobileTicketCard
                              ticket={ticket}
                              isAdmin={true}
                              showAuthor={true}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                  {filteredTickets && (
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

export default AdminTicketPage;
