/* eslint-disable */
import React from "react";
import { getStatusClass } from "./statusHelper";
import ApplicationActions from "./ApplicationActions";

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  status: string;
  dateOfSubmission: string;
}

interface ApplicationRowProps {
  application: Application;
  isDrop: string | number;
  setDrop: (id: string | number) => void;
}

const ApplicationRow: React.FC<ApplicationRowProps> = ({ application, isDrop, setDrop }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
    <td className="px-5 py-3 border-b-2 border-gray-200 dark:border-dark-tertiary text-left text-[0.8rem] font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
      {application.firstName}
    </td>
    <td className="px-5 py-3 border-b-2 border-gray-200 dark:border-dark-tertiary text-left text-[0.85rem] font-semibold text-gray-600 dark:text-white tracking-wider">
      {application.lastName}
    </td>
    <td className="px-5 py-3 border-b-2 border-gray-200 dark:border-dark-tertiary text-left text-[0.85rem] font-semibold text-gray-600 dark:text-white tracking-wider">
      {application.email}
    </td>
    <td className="px-5 py-3 border-b-2 border-gray-200 dark:border-dark-tertiary text-left text-[0.85rem] font-semibold text-gray-600 dark:text-white tracking-wider">
      {application.gender}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary">
      <span className={`inline-block py-1 px-3 whitespace-nowrap rounded-full text-sm ${getStatusClass(application.status)}`}>
        {application.status}
      </span>
    </td>
    <td className="px-5 py-3 border-b-2 border-gray-200 dark:border-dark-tertiary text-left text-[0.85rem] font-semibold text-gray-600 dark:text-white tracking-wider">
      {application.dateOfSubmission}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
      <ApplicationActions _id={application._id} isDrop={isDrop} setDrop={setDrop} />
    </td>
  </tr>
);

export default ApplicationRow;
