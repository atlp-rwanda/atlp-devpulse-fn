import React, { useState } from "react";
import AdminHeader from "../../../components/sidebar/navHeader";
import Sidebar from "../../../components/sidebar/sidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <>
      <div className=" h-screen dark:bg-dark-frame-bg">
        <div className=" w-full h-[70px]">
          <AdminHeader />
        </div>
        <div className="flex  w-full">
          <div
            className={`${sidebarExpanded ? "w-[16rem]" : "w-[4rem]"} h-full`}
          >
            <Sidebar
              expanded={sidebarExpanded}
              setExpanded={setSidebarExpanded}
            />
          </div>
          <main className="flex-1 flex w-full justify-center items-center dark:bg-dark-frame-bg">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
