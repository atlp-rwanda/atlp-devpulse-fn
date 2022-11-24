import React, { useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "./sidebar";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import ProfileDropdown from "../profileDropdown";
import { FaMoon, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import * as icon from "react-icons/hi2";
import { AiOutlineBell } from "react-icons/ai";
import { useTheme } from "../../hooks/darkmode";
const logo: string = require("../../assets/logo.svg").default;
const profile: string = require("../../assets/avatar.png").default;
const LogoWhite: string = require("../../assets/logoWhite.svg").default;

function NavBar() {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileDropdown, setShowprofileDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  function handleToggleTheme() {
    setTheme(!theme);
  }
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const handleShowNotification = () => setShowNotification(!showNotification);
  const handleShowProfileDropdown = () =>
    setShowprofileDropdown(!showProfileDropdown);

  return (
    <div className="flex items-center dark:bg-zinc-800 ">
      {showProfileDropdown && (
        <ProfileDropdown
          handleShowProfileDropdown={handleShowProfileDropdown}
        />
      )}
      <div
        className={`flex items-center justify-between h-[70px] fixed z-50 top-0 border-b w-screen bg-white dark:bg-dark-bg`}
      >
        <div className="flex items-center ">
          <span
            onClick={handleClick}
            onKeyDown={handleClick}
            role="button"
            tabIndex={0}
            className="hidden md:block ml-2"
          >
            {!nav ? (
              <icon.HiBars3CenterLeft className="w-7 text-9xl dark:text-dark-text-fill" />
            ) : (
              <IoClose className="w-7 text-9xl dark:text-dark-text-fill" />
            )}
          </span>
          <span>
            <Link to="/dashboard/super-admin" className="flex items-center">
              {theme ? (
                <img
                  className="cursor-pointer mx-2 fill-[blue]"
                  src={logo}
                  style={{ fill: "#333" }}
                />
              ) : (
                <img
                  className="cursor-pointer  mx-2"
                  src={LogoWhite}
                  alt="logoWhite"
                />
              )}
              <h1 className=" sm-text-1xl mr-12  font-bold font-lexend text-primary  md:hidden dark:text-green">
                PULSE
              </h1>
            </Link>
          </span>
        </div>
        <div className="flex items-center mr-4">
          <span className="flex items-center">
            {" "}
            {/* <FaMoon className="text-[20px] cursor-pointer mx-1" /> */}
            <AiOutlineBell
              className=" text-[25px] cursor-pointer  dark:text-dark-text-fill  "
              onClick={handleShowNotification}
            />
          </span>
          <div
            className={`mx-4 dark:text-zinc-100 rounded-full px-2 text-xl cursor-pointer flex items-center w-9 h-9`}
            onClick={handleToggleTheme}
          >
            {theme ? (
              <MoonIcon className="w-8" />
            ) : (
              <SunIcon className="w-8 text-dark-text-fill" />
            )}
          </div>
          <span onClick={handleShowProfileDropdown}>
            <img
              src={profile}
              alt="profile"
              className="w-[30px] cursor-pointer mx-2 "
            />
          </span>
        </div>
      </div>
      <ul className={!nav ? "hidden" : "bg-white  cursor-pointer text-black  "}>
        <Sidebar />
      </ul>
      <div className="block md:hidden">
        <Sidebar />
      </div>
    </div>
  );
}

export default NavBar;
