import React from "react";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  sidebarItems1,
  sidebarItems2,
  sidebarItems3,
  applicantSidebarItems,
} from "./sidebarItems";
import "./navslide.css";

const Sidebar = ({ expanded, setExpanded }) => {
  const navigate = useNavigate();
  const roleName = localStorage.getItem("roleName");

  // Select items based on the role
  const items =
    roleName === "applicant"
      ? applicantSidebarItems
      : [...sidebarItems1, ...sidebarItems2];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={`${
        expanded ? "w-[16rem]" : "w-[4rem]"
      } fixed dark:bg-dark-bg bg-white border-r transition-width duration-300 h-full`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="p-1.5 rounded-lg bg-gray-50 absolute top-2 right-2 z-20"
      >
        <Icon
          icon={expanded ? "material-symbols:menu-open" : "mdi:menu-close"}
          color={expanded ? "#000" : "#000"}
        />
      </button>
      <div className="pt-12 pb-12 mb-20">
        <ul className="pl-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `p-1 flex items-center ${
                    isActive ? "text-[#56c770]" : "text-black dark:text-white"
                  } hover:text-[#56c770]`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {expanded && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Render sidebarItems3 at the bottom */}
        <ul className="px-4 mt-4">
          {sidebarItems3.map((item, index) => (
            <li key={index} className="flex items-center">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `p-1 flex items-center ${
                    isActive ? "text-[#56c770]" : "text-black dark:text-white"
                  } hover:text-[#56c770]`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {expanded && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center p-1 font-semibold hover:font-bold text-black dark:text-white focus:outline-none hover:text-[#56c770] mt-4 ml-4 mt-3"
        >
          <Icon icon="hugeicons:logout-circle-02" className="mr-3" />
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
