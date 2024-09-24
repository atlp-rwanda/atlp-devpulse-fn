import React, { useState } from "react";
import Applicant from "../../components/sidebar/navHeader";
import Sidebar from "../../components/sidebar/sidebar";
import { Outlet } from "react-router";
const ApplicantLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <>
      <div className=" h-screen">
        <div className=" w-full h-[70px]">
          <Applicant />
        </div>
        <div className="flex w-full">
          <div
            className={`${sidebarExpanded ? "w-[16rem]" : "w-[4rem]"} h-full`}
          >
            <Sidebar
              expanded={sidebarExpanded}
              setExpanded={setSidebarExpanded}
            />
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
