import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import {
  sidebarItems1,
  sidebarItems2,
  sidebarItems3,
  applicantSidebarItems,
} from "./sidebarItems";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const roleName = localStorage.getItem("roleName");

  return (
    <div
      className={`top-0 bottom-0 mt-[70px] ${
        expanded ? "w-[16rem]" : "w-[4rem]"
      } z-10 fixed dark:bg-dark-bg bg-white font-sans border-r border-[#979797] transition-width duration-300`}
      style={{ height: "calc(100vh - 70px)" }} // Adjust height to fit the viewport
    >
      {/* Minimize/Maximize button fixed at the top */}
      <div className="relative">
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 absolute top-2 right-2 z-20" // Absolute position keeps the button fixed within the sidebar
        >
          <Icon
            icon={
              expanded
                ? "hugeicons:minimize-screen"
                : "hugeicons:maximize-screen"
            }
            color="#000"
          />
        </button>
      </div>

      {/* Sidebar content with scrolling */}
      <div className="overflow-y-auto pt-12">
        {" "}
        {/* Add padding-top to push content below the button */}
        {roleName === "applicant" ? (
          <div className="mb-2 border-b border-[#000]">
            <ul className="pl-4 block mt-2">
              {applicantSidebarItems.map((items, index) => (
                <li
                  key={index}
                  className="min:text-xl lg:justify-content-start align-items-center dark:text-white text-[#173B3F] text-base"
                >
                  <Link
                    to={items.path}
                    className="is-active focus:text-green-600 p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold"
                  >
                    <label className="mr-3 p-1">{items.icon}</label>
                    {expanded && <label className="p-1">{items.title}</label>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mb-2 border-b border-[#000]">
            <ul className="pl-4 block mt-2">
              {sidebarItems1.map((items, index) => (
                <li
                  key={index}
                  className="min:text-xl lg:justify-content-start align-items-center dark:text-white text-[#173B3F] text-base"
                >
                  <Link
                    to={items.path}
                    className="is-active focus:text-green-600 p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold"
                  >
                    <label className="mr-3 p-1">{items.icon}</label>
                    {expanded && <label className="p-1">{items.title}</label>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-3">
          <ul className="pl-4 block mt-2 md:mt-0">
            {sidebarItems2.map((items, index) => (
              <li
                key={index}
                className="align-items-center dark:text-white text-[#173B3F] text-base"
              >
                <a
                  href={items.path}
                  className="p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold"
                >
                  <label className="mr-3 p-1">{items.icon}</label>
                  {expanded && <label className="p-1">{items.title}</label>}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="inset-x-0 bottom-2 mt-20">
          <ul className="px-20 flex justify-content-center">
            {sidebarItems3.map((items, index) => (
              <li
                key={index}
                className="justify-content-center mb-1 align-items-center dark:text-white text-[#173B3F] text-lg ml-2"
              >
                <a
                  href={items.path}
                  className="p-1 flex align-items-center leading-5 cursor-pointer"
                >
                  <label className="mr-3 p-1">{items.icon}</label>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
