import React, { useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "./sidebar";

import ProfileDropdown from "../profileDropdown";
import { FaMoon } from "react-icons/fa";
import * as icon from "react-icons/hi2";
import { AiOutlineClose, AiOutlineBell } from "react-icons/ai";
const logo: string = require("../../assets/logo.svg").default;
const profile: string = require("../../assets/avatar.png").default;

function NavBar() {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileDropdown, setShowprofileDropdown] = useState(false);

  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);
  const handleShowNotification = () => setShowNotification(!showNotification);
  const handleShowProfileDropdown = () =>
    setShowprofileDropdown(!showProfileDropdown);

  return (
    <>
      {showProfileDropdown && (
        <ProfileDropdown
          handleShowProfileDropdown={handleShowProfileDropdown}
        />
      )}
      <div className="flex items-center justify-between h-[70px] fixed z-10 top-0 border-b w-screen bg-white">
        <div className="flex items-center">
          <span
            onClick={handleClick}
            onKeyDown={handleClick}
            role="button"
            tabIndex={0}
            className="hidden md:block ml-2"
          >
            {!nav ? (
              <icon.HiBars3 className="w-7 text-9xl  " />
            ) : (
              <AiOutlineClose className="w-7 text-9xl " />
            )}
          </span>
          <span>
            <Link to="/dashboard/super-admin" className="flex items-center">
              <img
                className="  cursor-pointer mx-2 fill-[blue]"
                src={logo}
                style={{ fill: "#333" }}
              />
              <h1 className=" sm-text-1xl mr-12  font-bold font-lexend text-primary  md:hidden">
                PULSE
              </h1>
            </Link>
          </span>
        </div>
        <div className="flex items-center">
          <span className="flex items-center">
            {" "}
            <FaMoon className="text-[20px] cursor-pointer mx-1" />
            <AiOutlineBell
              className=" text-[25px] cursor-pointer    "
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
      <ul className={!nav ? "hidden" : "bg-white  cursor-pointer text-black  "}>
        <Sidebar />
      </ul>
      <div className="block md:hidden">
        <Sidebar />
      </div>
    </>
  );
}

export default NavBar;
