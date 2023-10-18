import React from "react";
import { Icon } from "@iconify/react";

import { NavLink } from "react-router-dom";
import { sidebarItems2, sidebarItems1, sidebarItems3 } from "./sidebarItems";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import LogoutPage from "../../pages/LogoutPage";
import { Token } from "../../utils/utils";

const sidebar = () => {
  const access_token = Token();
  const authenticated =
    access_token !== null && access_token !== undefined && access_token !== "";
  return (
    <>
      <div className="top-0 bottom-0 overflow-y-scroll mt-[70px] w-[16rem] grow z-10 fixed dark:bg-dark-bg  bg-white font-sans border-r border-[#979797] ">
        {authenticated ? (
          <div className="mb-2 border-b border-[#000]">
            <ul className=" min:mt-0 pl-4 block mt-2">
              {sidebarItems1.map((items, index) => {
                return (
                 
                    <li
                      key={index}
                      className=" min:text-xl lg:justify-content-start align-items-center  dark:text-white text-[#173B3F]  text-base"
                    >
                      <Link
                        to={items.path}
                        className="is-active focus:text-green-600  p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold  "
                      >
                        <label className="mr-3 p-1">{items.icon}</label>
                        <label className="p-1  ">{items.title} </label>
                      </Link>
                    </li>
                  
                );
              })}
              {/* <li className=" min:text-xl lg:justify-content-start align-items-center  dark:text-white text-[#173B3F]  text-base">
                <LogoutPage />
              </li> */}
            </ul>
          </div>
        ) : (
          <div className="mb-2 border-b border-[#000]">
            <ul className=" min:mt-0 pl-4 block mt-2">
              {sidebarItems1.map((items, index) => {
                return (
                  
                    <li
                      key={index}
                      className=" min:text-xl lg:justify-content-start align-items-center  dark:text-white text-[#173B3F]  text-base"
                    >
                      <Link
                        to={items.path}
                        className="is-active focus:text-green-600  p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold  "
                      >
                        <label className="mr-3 p-1">{items.icon}</label>
                        <label className="p-1  ">{items.title} </label>
                      </Link>
                    </li>
                 
                );
              })}
              <li className=" min:text-xl lg:justify-content-start align-items-center  dark:text-white text-[#173B3F]  text-base">
                <LogoutPage />
              </li>
            </ul>
          </div>
        )}

        <div className="mb-3">
          <ul className="pl-4 block mt-2 md:mt-0">
            {sidebarItems2.map((items, index) => {
              return (
                <li
                  key={index}
                  className=" align-items-center  dark:text-white text-[#173B3F] text-base"
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
            {sidebarItems3.map((items, index) => {
              return (
                <li
                  key={index}
                  className=" justify-content-center mb-1 align-items-center  dark:text-white text-[#173B3F] text-lg ml-2"
                >
                  <a
                    href={items.path}
                    className="p-1 flex align-items-center leading-5 cursor-pointer"
                  >
                    <label className="mr-3 p-1">{items.icon}</label>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default sidebar;
