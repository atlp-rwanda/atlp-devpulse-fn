import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { AiOutlineBell } from "react-icons/ai";
import ProfileDropdown from "../profileDropdown";
import jwtDecode from "jwt-decode";
import { useTheme } from "../../hooks/darkmode";
import { useNotifications } from "../../utils/Notifications";
import { useAdminNotifications } from "../../hooks/useAdminNotifications";
const logo = require("../../assets/logo.svg").default;
const LogoWhite: string = require("../../assets/logoWhite.svg").default;
const profilePlaceholder = require("../../assets/default-image.jpg").default;

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");
  const isLoggedIn = Boolean(accessToken);
  //@ts-ignore
  const user = isLoggedIn ? jwtDecode(accessToken)?.data.picture || profilePlaceholder : profilePlaceholder;

  const roleName = localStorage.getItem("roleName");

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const handleToggleTheme = () => setTheme(!theme);


  const handleShowNotification = () => {
    const notificationPath =
      roleName === "superAdmin" || roleName === "admin"
        ? "/admin/notifications"
        : "/applicant/notifications";
    navigate(notificationPath);
  };
  
  const handleShowProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);
  const { unreadCount } = roleName === "superAdmin" || roleName === "admin" ? useAdminNotifications() : useNotifications();

  const onImageError = (e) => {
    e.target.src = profilePlaceholder;
  };

  return (
    <header className="w-full bg-white dark:bg-dark-bg fixed z-20 top-0 left-0 border-b border-gray-200 px-4 sm:px-10">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

            <Link to="/" className="flex items-center">
                {theme ? (
                  <img
                    className="cursor-pointer mx-2 fill-[blue]"
                    src={logo}
                    style={{ fill: '#333' }}
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

   
        <nav className="hidden sm:flex space-x-10">
          <Link to="/" className="text-lg dark:text-white text-primary hover:text-green">Home</Link>
          <Link to="/" className="text-lg dark:text-white text-primary hover:text-green">About</Link>
          <Link to="/blogs" className="text-lg dark:text-white text-primary hover:text-green">Blogs</Link>
        </nav>

      
        <div className="hidden sm:flex items-center space-x-4">
          <div onClick={handleToggleTheme} className="cursor-pointer">
            {theme ? <MoonIcon className="w-6 dark:text-white" /> : <SunIcon className="w-6 text-dark-text-fill" />}
          </div>
          
          {isLoggedIn ? (
            <>
             
              <span className="flex items-center">
                <AiOutlineBell
                  className="text-[25px] cursor-pointer dark:text-dark-text-fill"
                  onClick={handleShowNotification}
                />
                {unreadCount > 0 && (
                  <span className="bg-orange-600 text-white text-xs rounded-full px-1">
                    {unreadCount}
                  </span>
                )}
              </span>

          
              <span onClick={handleShowProfileDropdown}>
                <img
                  src={user}
                  alt="profile"
                  onError={onImageError}
                  className="w-[30px] cursor-pointer mx-2 rounded"
                />
              </span>

              {showProfileDropdown && (
                <ProfileDropdown handleShowProfileDropdown={handleShowProfileDropdown} />
              )}
            </>
          ) : (
            <Link to="/login" className="text-white dark:text-white bg-primary dark:bg-green rounded-md px-4 py-2 hover:bg-dark-bg">
              Sign In
            </Link>
          )}
        </div>

    
        <button onClick={toggleNav} className="sm:hidden text-primary dark:text-white focus:outline-none">
          {isNavOpen ? <XIcon className="w-6 dark:text-white" /> : <MenuIcon className="w-6 dark:text-white" />}
        </button>
      </div>


      {isNavOpen && (
        <div className="sm:hidden px-4 mt-2 h-full">
          <div className="flex items-center justify-between mb-4">
            <div onClick={handleToggleTheme} className="cursor-pointer">
              {theme ? <MoonIcon className="w-6 dark:text-white" /> : <SunIcon className="w-6 text-dark-text-fill" />}
            </div>
          </div>

          <nav>
            <ul className="flex flex-col space-y-4 text-lg">
              <li><Link to="/" className="dark:text-white text-primary hover:text-green">Home</Link></li>
              <li><Link to="/" className="dark:text-white text-primary hover:text-green">About Us</Link></li>
              <li><Link to="/blogs" className="dark:text-white text-primary hover:text-green">Blogs</Link></li>
            </ul>
          </nav>

         {isLoggedIn ? (
            <>
             
              <span className="flex items-center">
                <AiOutlineBell
                  className="text-[25px] cursor-pointer dark:text-dark-text-fill"
                  onClick={handleShowNotification}
                />
                {unreadCount > 0 && (
                  <span className="bg-orange-600 text-white text-xs rounded-full px-1">
                    {unreadCount}
                  </span>
                )}
              </span>

          
              <span onClick={handleShowProfileDropdown}>
                <img
                  src={user}
                  alt="profile"
                  onError={onImageError}
                  className="w-[30px] cursor-pointer mx-2 rounded"
                />
              </span>

              {showProfileDropdown && (
                <ProfileDropdown handleShowProfileDropdown={handleShowProfileDropdown} />
              )}
            </>
          ) : (
            <Link to="/login" className="text-white dark:text-white">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
