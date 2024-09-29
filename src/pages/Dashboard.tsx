import React from "react";
import NavBar from "../components/sidebar/navHeader";
import ApplicantChart from "../components/Dashboard/applicantChart";

const Dashboard = () => {
  return (
    <>
      <div className="bg-[#374151] w-full h-screen py-14 px-12">
        <div className="w-full border border-slate-200 py-10 px-7 rounded-2xl dark:bg-dark-bg bg-white">
          <div className="w-full flex flex-col mb-8">
            <h2 className="text-white font-medium text-xl">
              My overall performamce
            </h2>
            <p className="text-white text-sm">As of 17 June 2022, 12:00 PM</p>
          </div>
          <ApplicantChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
