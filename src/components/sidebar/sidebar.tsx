import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import { sidebarItems2, entity, sidebarItems3 } from "./sidebarItems";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import LogoutPage from "../../pages/LogoutPage";
import { Token } from "../../utils/utils";
import { useLocation } from "react-router-dom";

type Sidebar = {
  title: string;
  path: string;
  icon: JSX.Element;
  scope: {
    path: string;
    icon: JSX.Element;
    title: string;
  }[];
};

const Sidebar = () => {
  const initialSidebar: Sidebar = {
    title: "",
    path: "",
    icon: <Icon icon="default-icon"></Icon>,
    scope: [],
  };
  const [currentSideBar, setCurrentSidebar] = useState<Sidebar>(initialSidebar);
  const [homeItems, setHomeItems] = useState<Sidebar[]>([]);
  const access_token = Token();
  const authenticated =
    access_token !== null && access_token !== undefined && access_token !== "";
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    let foundMenu: any;
    let filteredSideMenu = entity.find((item) => pathname === item.path);

    if (!filteredSideMenu) {
      for (const item of entity) {
        const foundScope = item.scope?.find(
          (scopeItem) => pathname === scopeItem.path
        );
        if (foundScope) {
          foundMenu = item;
          filteredSideMenu = item;
          break;
        }
      }
    }
    if (pathname === "/") {
      //@ts-ignore
      setHomeItems(entity);
    }
    if (filteredSideMenu) {
      //@ts-ignore
      setCurrentSidebar(filteredSideMenu);
    }
  }, [pathname]);

  return (
    <>
      <div className="top-0 bottom-0 overflow-y-scroll mt-[70px] w-[16rem] grow z-10 fixed dark:bg-dark-bg  bg-white font-sans border-r border-[#979797] ">
        {authenticated ? (
          <div className="mb-2 border-b border-[#000]">
            {pathname === "/" && homeItems.length > 0 ? (
              <ul className=" min:mt-0 pl-4 block mt-2">
                {homeItems.map((items, index) => {
                  return (
                    <li
                      key={index}
                      className=" min:text-xl cursor-pointer text-base "
                    >
                      <NavLink
                        to={items.path}
                        className={`text-[#173B3F] {} p-1 flex align-items-center leading-3 dark:text-white hover:bg-[#173B3F]  hover:text-white dark:hover-bg-slate-700 cursor-pointer font-semibold hover:font-bold ${
                          items.title === "User"
                            ? "bg-[#2b3846] text-white hover:bg-[#2b3846] "
                            : ""
                        }`}
                      >
                        <label className="mr-3 p-1 cursor-pointer">
                          {items.icon}
                        </label>
                        <label className="p-1  cursor-pointer">
                          {items.title}{" "}
                        </label>
                      </NavLink>
                    </li>
                  );
                })}
                <li className=" min:text-xl  hover:bg-[#e9b6b6] hover:text-white lg:justify-content-start align-items-center  dark:text-white text-[#173B3F]  text-base">
                  <LogoutPage />
                </li>
              </ul>
            ) : (
              <div>
                <ul className="min:mt-0 pl-4 block mt-2">
                  {currentSideBar && (
                    <li
                      className="min:text-xl lg:justify-content-start  align-items-center dark:text-white text-[#173B3F] text-base"
                      key={currentSideBar.title}
                    >
                      <NavLink
                        style={
                          currentSideBar.path === pathname
                            ? {
                                backgroundColor: "#2b3846",
                                color: "white",
                              }
                            : {}
                        }
                        to={currentSideBar.path}
                        className=" p-1 flex align-items-center  dark:text-white hover:bg-[#173B3F]  hover:text-white dark:hover:bg-slate-700  leading-3 cursor-pointer font-semibold hover:font-bold"
                      >
                        <label className="mr-3 p-1 cursor-pointer">
                          {currentSideBar.icon}
                        </label>
                        <label className="p-1 cursor-pointer">
                          {currentSideBar.title}{" "}
                        </label>
                      </NavLink>
                      <div className="mb-3">
                        {currentSideBar.scope &&
                          currentSideBar.scope.length > 0 && (
                            <ul className="pl-4  block mt-2 md:mt-0">
                              {currentSideBar.scope.map((scopeItem) => (
                                <li
                                  key={scopeItem.path}
                                  className="align-items-center  dark:text-white  text-[#173B3F] text-base"
                                >
                                  <NavLink
                                    style={
                                      scopeItem.path === pathname
                                        ? {
                                            backgroundColor: "#2b3846",
                                            color: "white",
                                          }
                                        : {}
                                    }
                                    to={scopeItem.path}
                                    className="p-1 flex align-items-center mt-2  dark:text-white hover:bg-[#173B3F]  hover:text-white dark:hover:bg-slate-700 leading-3 cursor-pointer font-semibold hover:font-bold"
                                  >
                                    <label className="mr-3 p-1 cursor-pointer">
                                      {scopeItem.icon}
                                    </label>
                                    <label className="p-1 cursor-pointer">
                                      {scopeItem.title}{" "}
                                    </label>
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                    </li>
                  )}
                  <li className="min:text-xl hover:bg-[#e9b6b6] hover:text-white  lg:justify-content-start align-items-center dark:text-white text-[#173B3F] text-base">
                    <LogoutPage />
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="inset-x-0 bottom-2  mt-20">
            <ul className="px-20 flex justify-content-center">
              {entity.map((items, index) => (
                <li
                  key={index}
                  className="justify-content-center mb-1 align-items-center   hover:bg-[#173B3F]  hover:text-white dark:hover:bg-slate-700 dark:text-white text-[#173B3F] text-lg ml-2"
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
        )}

        <div className="mb-3 ">
          <ul className="pl-4 block mt-2 md:mt-0">
            {sidebarItems2.map((items, index) => {
              return (
                <li
                  key={index}
                  className=" align-items-center hover:bg-[#173B3F]  hover:text-white dark:hover:bg-slate-700 dark:text-white text-[#173B3F] text-base"
                >
                  <a
                    href={items.path}
                    className="p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold"
                  >
                    <label className="mr-3 p-1">{items.icon}</label>
                    <label className="p-1">{items.title} </label>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="inset-x-0 bottom-2  mt-20">
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
    </>
  );
};

export default Sidebar;
