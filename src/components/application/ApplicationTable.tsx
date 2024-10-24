/* eslint-disable */
import React from "react";
import ApplicationRow from "./ApplicationRow";

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  status: string;
  dateOfSubmission: string;
}

interface ApplicationTableProps {
  filteredApplications: Application[];
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ filteredApplications }) => {
  const [isDrop, setDrop] = React.useState<string | number>("");

  if (filteredApplications.length === 0) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-gray-500 dark:text-gray-300">No applicants found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full leading-normal">
      <thead className="bg-gray-100 dark:bg-dark-tertiary">
        <tr>
          <th className="px-5 py-3 text-gray-600 text-[0.85rem] whitespace-nowrap dark:text-white uppercase text-left">First Name</th>
          <th className="px-5 py-3 text-gray-600 text-[0.85rem] whitespace-nowrap dark:text-white uppercase text-left">Last Name</th>
          <th className="px-5 py-3 text-gray-600 text-[0.85rem] dark:text-white uppercase text-left">Email</th>
          <th className="px-5 py-3 text-gray-600 text-[0.85rem] dark:text-white uppercase text-left">Gender</th>
          <th className="px-5 py-3 text-gray-600 text-[0.85rem] whitespace-nowrap dark:text-white uppercase text-left">Status</th>
          <th className="px-5 py-3 text-gray-600 text-[0.85rem] whitespace-nowrap dark:text-white uppercase text-left">Submitted At</th>
          <th className="px-5 py-3 text-gray-600 text-[0.85rem] dark:text-white uppercase text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredApplications.map((application) => (
          <ApplicationRow key={application._id} application={application} isDrop={isDrop} setDrop={setDrop} />
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationTable;
