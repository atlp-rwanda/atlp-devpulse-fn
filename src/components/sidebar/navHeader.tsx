import React, { useState,forwardRef } from "react";
import { Link } from "react-router-dom";

import Sidebar from "./sidebar";

import { SunIcon } from '@heroicons/react/outline';
import { MoonIcon } from '@heroicons/react/solid';
import ProfileDropdown from "../profileDropdown";
import { FaMoon, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import * as icon from "react-icons/hi2";
import { AiOutlineBell } from "react-icons/ai";
const logo: string = require("../../assets/logo.svg").default;
const profile: string = require("../../assets/avatar.png").default;
const LogoWhite: string = require("../../assets/logoWhite.svg").default;
import useDarkMode from '../../hooks/useDarkMode';
const NavBar= forwardRef(({ ...props }: any, ref: any) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileDropdown, setShowprofileDropdown] = useState(false);

  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);
  const handleShowNotification = () => setShowNotification(!showNotification);
  const handleShowProfileDropdown = () =>
    setShowprofileDropdown(!showProfileDropdown);


    const [colorTheme, setTheme] = useDarkMode();
    const handleTheme = () => {
      localStorage.setItem('color-theme', colorTheme);
      setTheme(colorTheme);
    };
  return (
    <>
      {showProfileDropdown && (
        <ProfileDropdown
          handleShowProfileDropdown={handleShowProfileDropdown}
        />
      )}
      <div className={`flex items-center shadow-lg shadow-gray-100 dark:shadow-dark-frame-bg justify-between h-[70px] fixed z-50 top-0  w-screen dark:bg-dark-bg  bg-white ${props?.styles}`}>
        <div className="flex items-center">
          <span
            onClick={handleClick}
            onKeyDown={handleClick}
            role="button"
            tabIndex={0}
            className="hidden md:block ml-2  dark:text-dark-text-fill"
          >
            {!nav ? (
              <icon.HiBars3CenterLeft className="w-7 text-9xl  " />
            ) : (
              <IoClose className="w-7 text-9xl " />
            )}
          </span>
          <span>
            <Link to="/dashboard/super-admin" className="flex items-center">
            {colorTheme === 'dark' ? (
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
              <h1 className=" sm-text-1xl mr-12  font-bold font-lexend text-primary  dark:text-[#56C870]  md:hidden">
                PULSE
              </h1>
            </Link>
          </span>
        </div>
        <div className="flex items-center mr-4">
       
          <span className="flex items-center">
            {" "}
            <button
            type="button"
            id="theme-switch"
            className="cursor-pointer"
            onClick={() => handleTheme()}
          >
            {colorTheme === 'dark' ? (
              <MoonIcon className="w-8" />
            ) : (
              <SunIcon className="w-8 text-dark-text-fill" />
            )}
          </button>
            <AiOutlineBell
              className=" text-[25px] cursor-pointer dark:text-dark-text-fill  "
              onClick={handleShowNotification}
            />
          </span>
          <span onClick={handleShowProfileDropdown}>
            <img
              src={profile}
              alt="profile"
              className="w-[30px] cursor-pointer mx-2 "
            />
          </span>
        </div>
      </div>
      <ul className={!nav ? "hidden" : "  bg-white  cursor-pointer text-black  "}>
        <Sidebar />
      </ul>
      <div className="block md:hidden">
        <Sidebar />
      </div>
    </>
  );
});

export default NavBar;
