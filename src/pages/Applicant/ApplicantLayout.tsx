import React from "react";
import Applicant from "../../components/sidebar/navHeader";
import Sidebar from "../../components/sidebar/sidebar";
import { Outlet } from "react-router";
const ApplicantLayout = () => {
  return (
    <>
      <div className="bg-slate-400 h-screen">
        <div className="bg-red-300 w-full h-[70px]">
          <Applicant />
        </div>
        <div className="flex w-full">
          <div className="w-[16rem] h-full">
            <Sidebar />
          </div>
            <main className="flex w-[100%] justify-center items-center flex-1">
              <Outlet />
            </main>
        </div>
      </div>
    </>
  );
};

export default ApplicantLayout;