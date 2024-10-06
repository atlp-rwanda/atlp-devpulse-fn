import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import ProfileDropdown from "../profileDropdown";
import { IoClose } from "react-icons/io5";
import * as icon from "react-icons/hi2";
import * as icons from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { useTheme } from "../../hooks/darkmode";
const logo: string = require("../../assets/logo.svg").default;
const profile: string = require("../../assets/avatar.png").default;
const LogoWhite: string = require("../../assets/logoWhite.svg").default;
import jwtDecode from "jwt-decode";
import {destination} from '../../utils/utils'
import SearchResults from "../../components/SearchResults";

const placeholderImage = profile;

const onImageError = (e) => {
  e.target.src = placeholderImage
}

function NavBar() {
  const userDestination = destination();
  const access_token = localStorage.getItem("access_token");
  //@ts-ignore
  const user = access_token ? jwtDecode(access_token).picture : profile;
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

  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttribute, setFilterAttribute] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);

  const handleSearch = () => {
    setTriggerSearch(true);
  };

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
        
        {/* Add Search Bar */}
        <div className="flex items-center">
        <div className="flex bg-gray-100 dark:bg-dark-tertiary rounded-xl h-10 items-center border-2 ">
          <select
            className="bg-transparent border-none text-gray-500 dark:text-gray-300 outline-none px-3 rounded-l-full"
            value={filterAttribute}
            onChange={(e) => setFilterAttribute(e.target.value)}
          >
            <option value="all">All</option>
            <option value="category1">Cat 1</option>
            <option value="category2">Cat 2</option>
          </select>
          <input
            type="text"
            placeholder="Search devpulse"
            className="bg-transparent outline-none px-2 text-gray-700 dark:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4" onClick={handleSearch}>
            <icons.AiOutlineSearch className="text-gray-600 cursor-pointer hover:text-cyan-300" />
          </button>
        </div>
      </div>

      {triggerSearch && <SearchResults searchTerm={searchTerm} filterAttribute={filterAttribute} />}

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
              src={user}
              alt="profile"
              onError={onImageError}
              className="w-[30px] cursor-pointer mx-2 rounded "
            />
          </span>
        </div>
      </div>
      {/* <ul className={!nav ? "hidden" : "bg-white  cursor-pointer text-black  "}>
        <Sidebar />
      </ul>
      <div className="block md:hidden">{<Sidebar />}</div> */}
    </div>
  );
}

export default NavBar;
