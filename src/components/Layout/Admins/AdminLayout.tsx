import React from "react";
import AdminHeader from "../../../components/sidebar/navHeader";
import Sidebar from "../../../components/sidebar/sidebar";
import { Outlet } from "react-router";
const AdminLayout = () => {
  return (
    <>
      <div className="bg-slate-400 h-screen dark:bg-dark-frame-bg">
        <div className="bg-red-300 w-full h-[70px]">
          <AdminHeader />
        </div>
        <div className="flex w-full">
          <div className="w-[16rem] h-full">
            <Sidebar />
          </div>
            <main className="flex w-[100%] justify-center items-center flex-1 dark:bg-dark-frame-bg">
              <Outlet />
            </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
