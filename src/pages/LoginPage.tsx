import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { request, GraphQLClient } from "graphql-request";
import { Token } from "../utils/utils";
import { Link } from "react-router-dom";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import { IoClose } from "react-icons/io5";
import * as icon from "react-icons/hi2";
import { AiOutlineBell } from "react-icons/ai";
import { useTheme } from "../hooks/darkmode";
import LoginForm from "../components/form/SignInForm";
const logo: string = require("../assets/logo.svg").default;
const profile: string = require("../assets/avatar.png").default;
const LogoWhite: string = require("../assets/logoWhite.svg").default;
import jwtDecode from "jwt-decode";

const LoginPage = (props: any) => {
  const access_token = Token();
  const authenticated =
  //@ts-ignore
    access_token !== null && access_token !== undefined && access_token !== '';
  const roleName = localStorage.getItem("roleName");
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

  const navigate = useNavigate();

  const CLIENT_ID = process.env.CLIENT_ID;

  const MY_QUERY = `
    {
  getUsers_Logged {
    id
    createdAt
    firstname
    lastname
    email
    authMethod
  }
}
  `;

  return authenticated && roleName === "applicant" ? 
    <Navigate to="/applicant" /> : authenticated && roleName === "superAdmin" ? <Navigate to="/admin" />
   : 
  (
    <>
      <div className="flex items-center dark:bg-zinc-800 ">
        <div
          className={`flex items-center justify-between h-[70px] fixed z-50 top-0 border-b border-gray-400 w-screen bg-gray-300 dark:bg-dark-bg`}
        >
          <div className="flex items-center ">
            <span
              onClick={handleClick}
              onKeyDown={handleClick}
              role="button"
              tabIndex={0}
              className="hidden md:block ml-2"
            ></span>
            <span>
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
            </span>
          </div>
          <div className="flex items-center mr-4">
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
            <Link to={'/signup'}>
              <span className="flex items-center font-bold text-primary dark:text-white">
                SignUp
              </span>
            </Link>
          </div>
        </div>
      </div>
    <LoginForm />
    </>
  );
};

export default LoginPage;
