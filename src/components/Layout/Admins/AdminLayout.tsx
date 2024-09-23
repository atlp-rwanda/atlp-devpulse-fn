import React, { useState } from "react";
import AdminHeader from "../../../components/sidebar/navHeader";
import Sidebar from "../../../components/sidebar/sidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <>
      <div className="bg-slate-400 h-screen flex flex-col">
        <div className="bg-red-300 w-full h-[70px]">
          <AdminHeader />
        </div>
        <div className="flex flex-1">
          <div
            className={`${sidebarExpanded ? "w-[16rem]" : "w-[4rem]"} h-full`}
          >
            <Sidebar
              expanded={sidebarExpanded}
              setExpanded={setSidebarExpanded}
            />
          </div>
          <main className="flex-1 flex justify-center items-center">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
