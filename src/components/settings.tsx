import React, { useState, useEffect } from "react";
import { useTheme } from "../hooks/darkmode";
const ToggleOff: string = require("../assets/Toggle_Button_off.png").default;
const ToggleOn: string = require("../assets/toggle_on.png").default;
const dropDownIcon: string = require("../assets/dropDown.png").default;

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  return { isOpen, toggle, close };
};

const useNotificationToggle = (key: string, defaultValue: boolean) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  const toggle = () => {
    setIsEnabled((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(isEnabled));
  }, [key, isEnabled]);

  return { isEnabled, toggle };
};

const AccountSettings: React.FC<{ theme: boolean }> = ({ theme }) => (
  <div className="mb-4">
    <h2 className="text-md font-medium">My Account</h2>
    <div className="flex justify-between items-center">
      <p className="opacity-70 text-xs">Edit profile, export account data, …</p>
      <button className="text-sm">Change settings</button>
    </div>
    <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />
  </div>
);

const ThemeSettings: React.FC<{ theme: boolean; setTheme: (theme: boolean) => void }> = ({ theme, setTheme }) => {
  const { isOpen, toggle, close } = useDropdown();

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme === "Dark Theme");
    close();
  };

  return (
    <div className="mb-4">
      <h2 className="text-md font-medium">Appearance</h2>
      <div className="relative flex justify-between items-center mt-0 pb-0">
        <p className="opacity-70 text-xs">Theme preferences</p>
        <button
          onClick={toggle}
          className={`${theme ? "bg-gray-200" : "bg-gray-800"} py-1 pl-3 pr-3 border ${
            theme ? "border-gray-300" : "border-gray-600"
          } rounded text-xs flex items-center`}
        >
          {theme ? "Light Theme" : "Dark Theme"}
          <img src={dropDownIcon} alt="Dropdown Icon" className="ml-2" />
        </button>
        {isOpen && (
          <div
            className={`absolute mt-2 right-0 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg`}
          >
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
      <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />
    </div>
  );
};

const LanguageSettings: React.FC<{ theme: boolean }> = ({ theme }) => {
  const { isOpen, toggle, close } = useDropdown();
  const [language, setLanguage] = useState<string>(localStorage.getItem("language") || "");

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    close();
  };

  return (
    <div className="mb-4">
      <h2 className="text-md font-medium">Language</h2>
      <div className="relative flex justify-between items-center mt-0 pb-0">
        <p className="opacity-70 text-xs">Language, hearing, ...</p>
        <button
          onClick={toggle}
          className={`${theme ? "bg-gray-200" : "bg-gray-800"} py-1 pl-3 pr-3 border ${
            theme ? "border-gray-300" : "border-gray-600"
          } rounded text-xs flex items-center`}
        >
          {language ? language.charAt(0).toUpperCase() + language.slice(1) : "Choose Language"}
          <img src={dropDownIcon} alt="Dropdown Icon" className="ml-2" />
        </button>
        {isOpen && (
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
      <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />
    </div>
  );
};

const NotificationSettings: React.FC<{ theme: boolean }> = ({ theme }) => {

  const {
    isEnabled: emailNotificationsEnabled,
    toggle: toggleEmailNotifications,
  } = useNotificationToggle("emailNotifications", true);

  const {
    isEnabled: pushNotificationsEnabled,
    toggle: togglePushNotifications,
  } = useNotificationToggle("pushNotifications", true);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-md font-medium">Email Notifications</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="opacity-70 text-xs">Feedback emails, reminder emails, news emails</p>
          <button onClick={toggleEmailNotifications} className="p-1 rounded">
            {emailNotificationsEnabled ? (
              <img src={ToggleOff} alt="Disabled" className="w-12 h-6" />
            ) : (
              <img src={ToggleOn} alt="Enabled" className="w-12 h-6" />
            )}
          </button>
        </div>
      </div>
      <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />

      <div className="mb-4">
        <h2 className="text-md font-medium">Push Notifications</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="opacity-70 text-xs">Grade updates, session reminders, performance, comments</p>
          <button onClick={togglePushNotifications} className="p-1 rounded">
            {pushNotificationsEnabled ? (
              <img src={ToggleOff} alt="Disabled" className="w-12 h-6" />
            ) : (
              <img src={ToggleOn} alt="Enabled" className="w-12 h-6" />
            )}
          </button>
        </div>
      </div>
      <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />
    </div>
  );
};

const PrivacySecurity: React.FC<{ theme: boolean }> = ({ theme }) => (
  <div className="mb-4">
    <h2 className="text-md font-medium">Privacy and Security</h2>
    <div className="flex justify-between items-center">
      <p className="opacity-70 text-xs">Privacy and Security</p>
      <button className="text-sm">Change settings</button>
    </div>
    <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />
  </div>
);

const LoginActivity: React.FC<{ theme: boolean }> = ({ theme }) => (
  <div className="mb-4">
    <h2 className="text-lg font-medium">Login Activity</h2>
    <div className="flex justify-between items-center">
      <p className="opacity-70 text-xs">History of your login sessions</p>
      <button className="text-sm">View</button>
    </div>
  </div>
);

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const roleName = localStorage.getItem("roleName");
  const isAdmin = roleName === "superAdmin";
  const isApplicant = roleName === "applicant";

  return (
    <div
      className={`p-6 ${
        theme ? "bg-gray-100 text-black" : "bg-gray-800 text-white"
      } w-full ml-24 mr-24 mt-6 rounded-2xl`}
    >
      <h1 className="text-xl font-semibold mb-6">Settings</h1>
      <AccountSettings theme={theme} />
      <ThemeSettings theme={theme} setTheme={setTheme} />
      <LanguageSettings theme={theme} />
      <NotificationSettings theme={theme} />
      <PrivacySecurity theme={theme} />
      <LoginActivity theme={theme} />
    </div>
  );
};

export default Settings;
