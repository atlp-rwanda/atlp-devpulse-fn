import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import ProfileDropdown from "../profileDropdown";
import { IoClose } from "react-icons/io5";
import * as icon from "react-icons/hi2";
import { AiOutlineBell } from "react-icons/ai";
import { useTheme } from "../../hooks/darkmode";
import jwtDecode from "jwt-decode";
import { useNotifications } from "../../utils/Notifications";

const logo: string = require("../../assets/logo.svg").default;
const profile: string = require("../../assets/avatar.png").default;
const LogoWhite: string = require("../../assets/logoWhite.svg").default;
import {destination} from '../../utils/utils'
import SearchBar from "../../components/SearchBar";

const placeholderImage = profile;

const onImageError = (e) => {
  e.target.src = placeholderImage;
};

const ThemeToggle = ({ theme, handleToggleTheme }) => (
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
);

const NotificationBell = ({ unreadCount, handleShowNotification }) => (
  <span className="flex items-center">
    <AiOutlineBell
      className=" text-[25px] cursor-pointer  dark:text-dark-text-fill  "
      onClick={handleShowNotification}
    />
    {unreadCount > 0 && (
      <span className="top-0 bg-orange-600 text-white text-xs rounded-full px-1">
        {unreadCount}
      </span>
    )}
  </span>
);

const ProfileSection = ({ user, onImageError, handleShowProfileDropdown }) => (
  <span onClick={handleShowProfileDropdown}>
    <img
      src={user}
      alt="profile"
      onError={onImageError}
      className="w-[30px] cursor-pointer mx-2 rounded"
    />
  </span>
);

function NavBar() {
  const userDestination = destination();
  const access_token = localStorage.getItem("access_token");
  //@ts-ignore
  const user = access_token ? jwtDecode(access_token).picture : profile;

  const [nav, setNav] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { theme, setTheme } = useTheme();
  const handleToggleTheme = () => setTheme(!theme);

  const navigate = useNavigate();
  const handleShowNotification = () => navigate("/applicant/notifications");
  const handleShowProfileDropdown = () =>
    setShowProfileDropdown(!showProfileDropdown);

  const { unreadCount } = useNotifications();

  const handleClick = () => setNav(!nav);

  return (
    <div className="flex items-center dark:bg-zinc-800">
      {showProfileDropdown && (
        <ProfileDropdown
          handleShowProfileDropdown={handleShowProfileDropdown}
        />
      )}
      <div className="flex items-center justify-between h-[70px] fixed z-50 top-0 border-b w-screen bg-white dark:bg-dark-bg">
        <div className="flex items-center">
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
                <img className="cursor-pointer mx-2 fill-[blue]" src={logo} />
              ) : (
                <img
                  className="cursor-pointer mx-2"
                  src={LogoWhite}
                  alt="logoWhite"
                />
              )}
              <h1 className="sm-text-1xl mr-12 font-bold font-lexend text-primary md:hidden dark:text-green">
                PULSE
              </h1>
            </Link>
          </span>

        </div>
        
        {/* Add Search Bar */}
        <SearchBar />
        {/* End of Search Bar */}

        <div className="flex items-center mr-4">
          <NotificationBell
            unreadCount={unreadCount}
            handleShowNotification={handleShowNotification}
          />
          <ThemeToggle theme={theme} handleToggleTheme={handleToggleTheme} />
          <ProfileSection
            user={user}
            onImageError={onImageError}
            handleShowProfileDropdown={handleShowProfileDropdown}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
