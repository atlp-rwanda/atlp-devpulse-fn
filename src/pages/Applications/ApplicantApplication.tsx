import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getMyOwnAppliedJob } from "../../redux/actions/applications";
import DynamicTable from "../../components/Tables/DynamicTable";
import { Link } from "react-router-dom";
import { Select } from "flowbite-react";

export const ApplicantApplication = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyOwnAppliedJob());
  }, [dispatch]);

  const { loading, data } = useAppSelector((state) => state.myApplications);

  const tableData = Array.isArray(data) ? data : [];

  const headers = ["Title", "Date of Submission", "Status", "Action"];


  return (
    <div className="p-4">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-row items-center space-x-4">
          <Link
            to="/applicant/available-jobs/trainee-apply"
            className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer"
          >
            Become trainee
          </Link>
          <Link
            to="/applicant/myapplication"
            className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer"
          >
            Track my application
          </Link>
          <Select className="sm:text-sm w-full sm:w-40 rounded-bt-rd dark:text-ltb">
            <option value="">Search by</option>
          </Select>
          <div className="flex-grow w-full sm:w-auto">
            <div className="relative">
              <input
                className="w-full bg-row-gray dark:bg-[#293647] dark:text-ltb border border-bdr dark:border-cg dark:border-opacity-5 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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

      <DynamicTable headers={headers} data={tableData} isLoading={loading} />
    </div>
  );
};
