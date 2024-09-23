<<<<<<< HEAD
import React from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import {
  sidebarItems1,
  sidebarItems2,
  sidebarItems3,
  applicantSidebarItems,
=======
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import {
  generalSectionItems,
  managementSectionItems,
  applicationsSectionItems,
  performanceSectionItems,
  adminSectionItems,
  applicantSidebarItems,
  additionalSidebarItems,
>>>>>>> d7eec64 (Fix layout spacing between sidebar and main content in AdminLayout)
} from "./sidebarItems";
import "./navslide.css";

const Sidebar = ({ expanded, setExpanded }) => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const roleName = localStorage.getItem("roleName");

  // Select items based on the role
  const items =
    roleName === "applicant"
      ? applicantSidebarItems
      : [...sidebarItems1, ...sidebarItems2];

=======
  const [openSections, setOpenSections] = useState({
    general: true,
    management: true,
    applications: true,
    performance: true,
    admin: true,
    additional: true,
  });
  const roleName = localStorage.getItem("roleName");
  const sections =
    roleName === "applicant"
      ? [{ title: "Applicant Section", items: applicantSidebarItems }]
      : [
          { title: "General", items: generalSectionItems },
          { title: "Management", items: managementSectionItems },
          { title: "Applications", items: applicationsSectionItems },
          { title: "Performance", items: performanceSectionItems },
          { title: "Admin", items: adminSectionItems },
          { title: "Additional", items: additionalSidebarItems },
        ];

  const toggleSection = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
>>>>>>> d7eec64 (Fix layout spacing between sidebar and main content in AdminLayout)
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
<<<<<<< HEAD
      className={` ${
        expanded ? "w-[16rem]" : "w-[4rem]"
      } fixed  dark:bg-dark-bg bg-white border-r transition-width duration-300 h-full`}
=======
      className={`top-0 mt-[70px] ${
        expanded ? "w-[16rem]" : "w-[4rem]"
      } fixed z-10 dark:bg-dark-bg bg-white border-r transition-width duration-300 h-screen overflow-y-auto custom-scrollbar`}
>>>>>>> d7eec64 (Fix layout spacing between sidebar and main content in AdminLayout)
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="p-1.5 rounded-lg bg-gray-50 absolute top-2 right-2 z-20"
      >
        <Icon
          icon={expanded ? "material-symbols:menu-open" : "mdi:menu-close"}
          color="#000"
        />
      </button>
      <div className="pt-12 pb-12 mb-20">
<<<<<<< HEAD
        <ul className="pl-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-white hover:text-[#56c770]"
            >
              <Link to={item.path} className="p-1 flex items-center">
                <span className="mr-3">{item.icon}</span>
                {expanded && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
        {/* Render sidebarItems3 at the bottom */}
        <ul className="px-4 mt-4">
          {sidebarItems3.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-white hover:text-[#56c770]"
            >
              <Link to={item.path} className="p-1 flex items-center">
                <span className="mr-3">{item.icon}</span>
                {expanded && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center p-1 font-semibold hover:font-bold text-white focus:outline-none hover:text-[#56c770] mt-4 ml-4 mt-3"
        >
          <Icon icon="hugeicons:logout-circle-02" className="mr-3" />
=======
        {sections.map((section, idx) => (
          <div key={idx}>
            <div
              onClick={() => toggleSection(section.title.toLowerCase())}
              className="cursor-pointer p-2 flex items-center justify-between text-white"
            >
              {expanded && <span className="font-bold">{section.title}</span>}
              <Icon
                icon={
                  openSections[section.title.toLowerCase()]
                    ? "akar-icons:chevron-down"
                    : "akar-icons:chevron-right"
                }
              />
            </div>
            {openSections[section.title.toLowerCase()] && (
              <ul className="pl-4 mt-2">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-center text-white">
                    <Link to={item.path} className="p-1 flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {expanded && <span>{item.title}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center p-1 font-semibold hover:font-bold text-white focus:outline-none"
        >
          <Icon icon="nimbus:arrow-left" className="mr-3" />
>>>>>>> d7eec64 (Fix layout spacing between sidebar and main content in AdminLayout)
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
