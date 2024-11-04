/* eslint-disable */
import React from "react";

interface ApplicationFilterProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filterStatus: string;
    setFilterStatus: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    sortOrder: string;
    setSortOrder: (value: string) => void;
}



const ApplicationFilter: React.FC<ApplicationFilterProps> = ({
    searchTerm, setSearchTerm, filterStatus, setFilterStatus, sortBy, setSortBy, sortOrder, setSortOrder
}) => {
    return (
        <div className="flex items-center justify-between space-x-4 mb-4">
            <input
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border text-sm dark:border-slate-400 dark:bg-dark-bg dark:text-white p-[0.5rem] rounded-md w-1/4"
            />

            <div className="flex gap-4 items-center">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                    className="border dark:border-slate-400 p-[0.5rem] text-sm rounded-md dark:bg-dark-bg dark:text-white " >
                    <option value="All">All Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="English assessment">English Assessment</option>
                    <option value="Technical assessment">Technical Assessment</option>
                    <option value="Done Technical assessment">Done Technical Assessment</option>
                    <option value="Invited for Home Challenge">Invited for Home Challenge</option>
                    <option value="Done Home Challenge">Done Home Challenge</option>
                    <option value="Invited for Interview">Invited for Interview</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Reject">Rejected</option>
                    <option value="Missed English assessment">Missed English Assessment</option>
                    <option value="Missed Technical assessment">Missed Technical Assessment</option>
                    <option value="Missed Interview">Missed Interview</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border text-sm dark:border-slate-400 p-[0.5rem] rounded-md dark:bg-dark-bg dark:text-white">
                    <option value="dateOfSubmission">Date</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="status">Status</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border text-sm dark:border-slate-400 p-[0.5rem] rounded-md dark:bg-dark-bg dark:text-white">
                    <option value="desc">DESC</option>
                    <option value="asc">ASC</option>
                </select>

            </div>
        </div>
    );
};

export default ApplicationFilter;
