import React, { useState } from "react";
const ToggleOff: string = require("../assets/Toggle_Button_off.png").default;

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
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

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
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
    <div className="p-6 bg-gray-800 text-white w-full ml-24 mr-24 mt-6 mb-12 rounded-2xl">
      <h1 className="text-xl font-semibold mb-6">Settings</h1>

      {isAdmin && (
        <div className="mb-4">
          <h2 className="text-md font-medium">My Account</h2>
          <div className="flex justify-between items-center">
            <p className="opacity-70 text-xs">Edit profile, export account data, …</p>
            <button className="opacity-70 text-sm">Change settings</button>
          </div>
        </div>
      )}
      <hr className="border-t border-gray-300 my-4" />

      <div className="mb-4">
        <h2 className="text-md font-medium">Appearance</h2>
        <div className="flex justify-between items-center">
            <p className="opacity-70 text-xs">Theme preferences</p>
            <button className="py-1 pl-3 pr-3 border border-white-600 rounded bg-gray-800 opacity-70 text-xs">Choose Theme</button>
        </div>
      </div>
      <hr className="border-t-2 border-gray-600 my-4" />

      {isAdmin && (
        <div className="mb-4">
          <h2 className="text-md font-medium">Language</h2>
          <div className="flex justify-between items-center">
          <p className="opacity-70 text-xs">Language, hearing, ...</p>
          <button className="py-1 pl-3 pr-3 border border-white-600 rounded bg-gray-800 opacity-70 text-xs">Change Language</button>
          </div>
        </div>
      )}
      <hr className="border-t border-gray-300 my-4" />

      <div className="mb-0">
        <h2 className="text-md font-medium">Email notifications</h2>
        <div className="flex justify-between items-center mt-0 pb-0">
        <p className="opacity-70 text-xs">Feedback emails, reminder emails, news emails</p>
        <button
          onClick={handleEmailNotificationToggle} className="p-1 rounded"
        >
          {emailNotifications ? (
            <img src={ToggleOff} alt="Disabled" className="w-12 h-6" />
          ) : (
            <img src={ToggleOff} alt="Enabled" className="w-12 h-6" />
          )}
        </button>
        </div>
      </div>
      <hr className="border-t-2 border-gray-600 my-4" />

      <div className="mb-2">
        <h2 className="text-md font-medium mb-0">Push notifications</h2>
        <div className="flex justify-between items-center mt-0">
        <p className="opacity-70 text-xs mt-0">Grade updates, session reminders, perfomance, comments</p>
        <button
          onClick={handlePushNotificationToggle} className="p-1 rounded"
        >
          {pushNotifications ? (
            <img src={ToggleOff} alt="Disabled" className=" w-12 h-6" />
          ) : (
            <img src={ToggleOff} alt="Enabled" className="w-12 h-6" />
          )}
        </button>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-4" />

      {isAdmin && (
        <div className="mb-4">
          <h2 className="text-md font-medium">Privacy and Security</h2>
          <div className="flex justify-between items-center">
            <p className="opacity-70 text-xs">Privacy and Security</p>
            <button className="opacity-70 text-sm">Change settings</button>
          </div>
        </div>
      )}

      {isApplicant && (
        <div className="mb-4">
          <h2 className="text-lg font-medium">Login Activity</h2>
          <div className="flex justify-between items-center">
            <p className="opacity-70 text-xs">History of your login sessions</p>
            <button className="opacity-70 text-sm">View</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
