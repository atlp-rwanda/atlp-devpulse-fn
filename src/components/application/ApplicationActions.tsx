import React from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

interface ApplicationActionsProps {
  _id: string;
  isDrop: string | number;
  setDrop: (id: string | number) => void;
}

const ApplicationActions: React.FC<ApplicationActionsProps> = ({ _id, isDrop, setDrop }) => {
  const toggleDropdown = () => {
    if (isDrop === _id) {
      setDrop("");
    } else {
      setDrop(_id);
    }
  };

  return (
    <div className="relative">
      <HiDotsVertical className="text-gray-600 dark:text-white cursor-pointer" onClick={toggleDropdown} />
      <div className={`${isDrop === _id ? "block" : "hidden"} absolute right-12 z-10 mt-2 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1`}>
        <Link to={`/admin/application-details/${_id}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500">
          View Details
        </Link>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500">
          Soft Delete
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500">
          Hard Delete
        </button>
      </div>
    </div>
  );
};

export default ApplicationActions;
