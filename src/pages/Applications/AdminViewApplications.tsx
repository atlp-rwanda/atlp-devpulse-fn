/* eslint-disable */
import React, { useState, useEffect } from "react";
import { fetchApplications } from "../../redux/actions/adminListApplications";
import { Pagination } from "flowbite-react";
import ApplicationTable from "../../components/application/ApplicationTable";
import ApplicationFilter from "../../components/application/ApplicationFilter";

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  status: string;
  dateOfSubmission: string;
}

interface FilterAndSortOptions {
  applications: Application[];
  searchTerm: string;
  filterStatus: string;
  sortBy: string;
  sortOrder: string;
}

const ApplicationList = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("dateOfSubmission");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const applicationsData = async () => {
      const data = await fetchApplications();
      setApplications(data?.applications || []);
    };
    applicationsData();
  }, []);

  useEffect(() => {
    const filtered = filterAndSortApplications({
      applications,
      searchTerm,
      filterStatus,
      sortBy,
      sortOrder,
    });
  
    setFilteredApplications(
      filtered.slice((activePage - 1) * itemsCountPerPage, activePage * itemsCountPerPage)
    );
  }, [applications, searchTerm, filterStatus, sortBy, sortOrder, activePage, itemsCountPerPage]);
  

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleItemsCountPerPageChange = (event) => {
    setItemsCountPerPage(Number(event.target.value));
  };

  const totalApplications = applications.length;

  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen">
          <div className="px-8 pt-8 pb-0">
            <ApplicationFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          <div className="px-8 pb-6">
            <div className="bg-white dark:bg-dark-bg shadow-md px-5 py-8 rounded-md w-full">
              <ApplicationTable
                filteredApplications={filteredApplications}
              />
              <div className="flex items-center justify-between my-4">
                <div className="flex items-center space-x-2">
                  <label className="dark:text-white">Items per page:</label>
                  <select value={itemsCountPerPage} onChange={handleItemsCountPerPageChange}
                    className='border dark:bg-dark-bg text-sm dark:text-white border-gray-300 rounded-md p-1'>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <Pagination
                  currentPage={activePage}
                  totalPages={Math.ceil(totalApplications / itemsCountPerPage)}
                  onPageChange={handlePageChange}
                  previousLabel='Prev'
                  nextLabel='Next'
                  showIcons
                  className="rounded-md"
                  layout="navigation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


function filterAndSortApplications({
  applications,
  searchTerm,
  filterStatus,
  sortBy,
  sortOrder,
}: FilterAndSortOptions): Application[] {
  let filtered = applications;

  if (searchTerm) {
    filtered = filtered.filter((app) =>
      `${app.firstName} ${app.lastName} ${app.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  if (filterStatus !== "All") {
    filtered = filtered.filter((app) => app.status === filterStatus);
  }

  return filtered.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
}

export default ApplicationList;
