import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import ProfileDropdown from "../profileDropdown";
import { IoClose } from "react-icons/io5";
import * as icon from "react-icons/hi2";
import { NotificationListener } from "../../NotificationListener";
import { AiOutlineBell } from "react-icons/ai";
import { useTheme } from "../../hooks/darkmode";
const logo: string = require("../../assets/logo.svg").default;
const profile: string = require("../../assets/avatar.png").default;
const LogoWhite: string = require("../../assets/logoWhite.svg").default;
import jwtDecode from "jwt-decode";
import { destination } from "../../utils/utils";

// Placeholder for profile image
const placeholderImage = profile;
const onImageError = (e) => {
  e.target.src = placeholderImage;
};

function NavBar() {
  const navigate = useNavigate();
  const userDestination = destination();
  const access_token = localStorage.getItem("access_token");
  //@ts-ignore
  const user = access_token ? jwtDecode(access_token).picture : profile;

  const [showNotification, setShowNotification] = useState(false);
  const [showProfileDropdown, setShowprofileDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const [nav, setNav] = useState(false);

  // New state for tracking unread notifications
  const [hasNotification, setHasNotification] = useState(false);

  function handleToggleTheme() {
    setTheme(!theme);
  }

  const handleClick = () => setNav(!nav);
  const handleShowNotification = () => {
    setHasNotification(false);
    setShowNotification(true); // You can toggle it based on current state if needed
    // Navigate after a timeout to ensure state is updated
    setTimeout(() => {
      navigate("/admin/notifications");
    }, 100);
  };
  const handleShowProfileDropdown = () =>
    setShowprofileDropdown(!showProfileDropdown);

  // Simulating notification being received from <NotificationListener />
  // In a real app, this should come from actual notification logic
  const handleNewNotification = () => {
    setHasNotification(true); // Set notification state to true
  };
  return (
    <div className="flex items-center dark:bg-zinc-800 ">
      <NotificationListener onNewNotification={handleNewNotification} />
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
            <Link to={userDestination} className="flex items-center">
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
          <span className="flex items-center relative">
            <AiOutlineBell
              className=" text-[25px] cursor-pointer dark:text-dark-text-fill"
              onClick={handleShowNotification}
            />
            {hasNotification && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
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
              src={user}
              alt="profile"
              onError={onImageError}
              className="w-[30px] cursor-pointer mx-2 rounded"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
