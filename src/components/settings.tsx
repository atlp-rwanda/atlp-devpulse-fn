import React, { useState } from "react";
import { useTheme } from "../hooks/darkmode";
const ToggleOff: string = require("../assets/Toggle_Button_off.png").default;
const ToggleOn: string = require("../assets/toggle_on.png").default;
const dropDownIcon: string = require("../assets/dropDown.png").default;

const Settings = () => {

  const { theme, setTheme } = useTheme();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  const [language, setLanguage] = useState(localStorage.getItem("language") || "");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications") || "true")
  );
  const [emailNotifications, setEmailNotifications] = useState(
    JSON.parse(localStorage.getItem("emailNotifications") || "true")
  );
  const [pushNotifications, setPushNotifications] = useState(
    JSON.parse(localStorage.getItem("pushNotifications") || "true")
  );

  const roleName = localStorage.getItem("roleName");

  const isAdmin = roleName === "superAdmin";
  const isApplicant = roleName === "applicant";

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme === "Dark Theme");
    setIsThemeDropdownOpen(false);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    setIsLanguageDropdownOpen(false); 
  };

  const handleNotificationToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem("notifications", JSON.stringify(newValue));
  };

  const handleEmailNotificationToggle = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    localStorage.setItem("emailNotifications", JSON.stringify(newValue));
  };

  const handlePushNotificationToggle = () => {
    const newValue = !pushNotifications;
    setPushNotifications(newValue);
    localStorage.setItem("pushNotifications", JSON.stringify(newValue));
  };

  return (
    <div className={`p-6 ${theme ? "bg-gray-100 text-black" : "bg-gray-800 text-white"} w-full ml-24 mr-24 mt-6 rounded-2xl`}>
      <h1 className="text-xl font-semibold mb-6">Settings</h1>

        <div className="mb-4">
          <h2 className="text-md font-medium">My Account</h2>
          <div className="flex justify-between items-center">
            <p className="opacity-70 text-xs">Edit profile, export account data, …</p>
            <button className="text-sm">Change settings</button>
          </div>
        </div>
      <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`}/>

      <div className="mb-4">
        <h2 className="text-md font-medium">Appearance</h2>
        <div className="relative flex justify-between items-center mt-0 pb-0">
          <p className="opacity-70 text-xs">Theme preferences</p>
          <button
            onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
            className={`${theme ? "bg-gray-200" : "bg-gray-800"} py-1 pl-3 pr-3 border ${theme ? "border-gray-300" : "border-gray-600"} rounded text-xs flex items-center`}
          >
            {theme ? "Light Theme" : "Dark Theme"}
            <img src={dropDownIcon} alt="Dropdown Icon" className="ml-2" />
          </button>
          {isThemeDropdownOpen && (
            <div className={`absolute mt-2 right-0 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg`}>
              <ul className={`text-sm ${theme ? "text-black" : "text-white"}`}>
                <li
                  className={`px-4 py-2 cursor-pointer bg-gray-200 dark:bg-gray-800`}
                  onClick={() => handleThemeChange("Dark Theme")}
                >
                  Light Theme
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer bg-gray-200 dark:bg-gray-800`}
                  onClick={() => handleThemeChange("Light Theme")}
                >
                  Dark Theme
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t-2 border-gray-600 my-4" />

        <div className="mb-4">
          <h2 className="text-md font-medium">Language</h2>
          <div className="relative flex justify-between items-center mt-0 pb-0">
            <p className="opacity-70 text-xs">Language, hearing, ...</p>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className={`${theme ? "bg-gray-200" : "bg-gray-800"} py-1 pl-3 pr-3 border ${theme ? "border-gray-300" : "border-gray-600"} rounded text-xs flex items-center`}
            >
              {language ? language.charAt(0).toUpperCase() + language.slice(1) : "Choose Language"}
              <img src={dropDownIcon} alt="Dropdown Icon" className="ml-2" />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute mt-2 right-0 bg-gray-800 border border-gray-600 rounded-md shadow-lg">
                <ul className={`text-sm ${theme ? "text-black" : "text-white"}`}>
                  <li
                    className={`px-4 py-2 cursor-pointer ${theme ? "bg-gray-200" : "bg-gray-800"}`}
                    onClick={() => handleLanguageChange("English")}
                  >
                    English
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer ${theme ? "bg-gray-200" : "bg-gray-800"}`}
                    onClick={() => handleLanguageChange("French")}
                  >
                    French
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer ${theme ? "bg-gray-200" : "bg-gray-800"}`}
                    onClick={() => handleLanguageChange("Kinyarwanda")}
                  >
                    Kinyarwanda
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />

      <div className="mb-0">
        <h2 className="text-md font-medium">Email notifications</h2>
        <div className="flex justify-between items-center mt-0 pb-0">
          <p className="opacity-70 text-xs">Feedback emails, reminder emails, news emails</p>
          <button onClick={handleEmailNotificationToggle} className="p-1 rounded">
            {emailNotifications ? (
              <img src={ToggleOff} alt="Disabled" className="w-12 h-6" />
            ) : (
              <img src={ToggleOn} alt="Enabled" className="w-12 h-6" />
            )}
          </button>
        </div>
      </div>
      <hr className="border-t-2 border-gray-600 my-4" />

      <div className="mb-2">
        <h2 className="text-md font-medium mb-0">Push notifications</h2>
        <div className="flex justify-between items-center mt-0">
          <p className="opacity-70 text-xs mt-0">Grade updates, session reminders, performance, comments</p>
          <button onClick={handlePushNotificationToggle} className="p-1 rounded">
            {pushNotifications ? (
              <img src={ToggleOff} alt="Disabled" className=" w-12 h-6" />
            ) : (
              <img src={ToggleOn} alt="Enabled" className="w-12 h-6" />
            )}
          </button>
        </div>
      </div>

      <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />

        <div className="mb-4">
          <h2 className="text-md font-medium">Privacy and Security</h2>
          <div className="flex justify-between items-center">
            <p className="opacity-70 text-xs">Privacy and Security</p>
            <button className="text-sm">Change settings</button>
          </div>
        </div>

      <hr className="border-t-2 border-gray-600 my-4" />

        <div className="mb-4">
          <h2 className="text-lg font-medium">Login Activity</h2>
          <div className="flex justify-between items-center">
            <p className="opacity-70 text-xs">History of your login sessions</p>
            <button className="text-sm">View</button>
          </div>
        </div>
    </div>
  );
};

export default Settings;
