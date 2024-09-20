import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const role = localStorage.getItem("roleName");
  return (
    <div className="flex flex-col flex-wrap justify-around items-center h-full">
      <div className="text-lg my-3 font-bold ">DevPulse New</div>
      <div className="text-xl">Oops! This page does not exist</div>
      <div className="text-xl my-3 text-blue-600">
        {
          role === "applicant" ? (
            <Link to="/applicant">
              <button>Go to Applicant Dashboard</button>
            </Link>
          ) : role === "superAdmin" ? (
            <Link to="/admin">
            <button>Go back to Homepage</button>
          </Link>
          ) : null
        }
      </div>
    </div>
  );
};

export default PageNotFound;
