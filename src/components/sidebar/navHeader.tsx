
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from './sidebar';

import ProfileDropdown from '../profileDropdown';
import * as fi from "react-icons/fa";
import * as icon from "react-icons/hi2";
import {AiOutlineClose,AiOutlineBell}from "react-icons/ai";
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
      <div className="w-screen h-[8vh] z-10 bg-white dark:bg-dark-bg fixed border-b test-black">
        <div className="px-3 flex items-center w-full h-full">
          <div className="flex px-5 lg:hidden">
            <div
              onClick={handleClick}
              onKeyDown={handleClick}
              role="button"
              tabIndex={0}
            >

              {!nav ? (
                <icon.HiBars3 className="w-7 dark:text-dark-text-fill text-9xl ml-0 md:hidden" />
              ) : (
                <AiOutlineClose className="w-7 dark:text-dark-text-fill text-9xl md:hidden" />
              )}
            </div>
          </div>
          <div className="flex items-center h-full lg:w-full">
            <Link to="/dashboard/super-admin" className="flex flex-row lg:px-5">
             
               
              <img className="w-full cursor-pointer mr-2" src={logo} />
              <h1 className=" sm-text-1xl mr-12 lg:text-3xl font-bold font-lexend text-primary dark:text-dark-text-fill md:test-1xl mt-2 ">
                PULSE
              </h1>
            </Link>

          </div>
         <span className="md:ml-20 flex p-3"> <fi.FaMoon className="  sm:w-5 text-9xl mr-3  md:ml-20 lg:w-10 ml-[10%]  cursor-pointer  text-[200%] "/>
          <AiOutlineBell
            className=" sm:w-6 text-9xl md:ml-7 lg:mr-10 lg:w-10 cursor-pointer  dark:text-dark-text-fill text-[200%] "
            onClick={handleShowNotification}
          />
          </span>
          <div onClick={handleShowProfileDropdown}>
            
            <img src={profile} alt="profile" className=" sm:w-6 text-9xl  lg:w-10 cursor-pointer ml-4 mr-8 text-[200%] " />
          </div>
        </div>
        <ul
          className={
            !nav
              ? 'hidden'
              : 'bg-white dark:bg-dark-bg cursor-pointer text-black  lg:hidden '
          }
        >
        <Sidebar />
        </ul>
        <div className="sm:hidden md:block"><Sidebar /></div>
      </div>
      
   
    </>
  );
}

export default NavBar;
