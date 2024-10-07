import React, { useState, useEffect } from "react";
import { useTheme } from "../hooks/darkmode";
import ToggleSwitch from "./ToggleSwitch";
import DropdownButton from "./DropdownButton"; 

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

const handleThemeLabel = (theme: boolean) =>
  theme ? "Light Theme" : "Dark Theme";

interface ThemeDropdownProps {
  isOpen: boolean;
  handleThemeChange: (theme: string) => void;
  theme: boolean;
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({
  isOpen,
  handleThemeChange,
  theme,
}) => {
  if (!isOpen) return null;

  return (
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
  );
};

interface ThemeSettingsProps {
  theme: boolean;
  setTheme: (theme: boolean) => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  theme,
  setTheme,
}) => {
  const { isOpen, toggle, close } = useDropdown();

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme === "Dark Theme");
    close();
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-medium">Appearance</h2>
      <div className="relative flex justify-between items-center mt-0 pb-0">
        <p className="opacity-70 text-xs">Theme preferences</p>
        <DropdownButton
          label={handleThemeLabel(theme)}
          isOpen={isOpen}
          toggle={toggle}
          theme={theme}
          ariaLabel="Toggle Theme Dropdown"
        />
        <ThemeDropdown
          isOpen={isOpen}
          handleThemeChange={handleThemeChange}
          theme={theme}
        />
      </div>
      <hr
        className={`border-t ${
          theme ? "border-gray-500" : "border-gray-600"
        } my-4`}
      />
    </div>
  );
};

interface LanguageDropdownProps {
  isOpen: boolean;
  handleLanguageChange: (language: string) => void;
  theme: boolean;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  isOpen,
  handleLanguageChange,
  theme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute mt-2 right-0 bg-gray-800 border border-gray-600 rounded-md shadow-lg">
      <ul className={`text-sm ${theme ? "text-black" : "text-white"}`}>
        {["English", "French", "Kinyarwanda"].map((lang) => (
          <li
            key={lang}
            className={`px-4 py-2 cursor-pointer ${
              theme ? "bg-gray-200" : "bg-gray-800"
            }`}
            onClick={() => handleLanguageChange(lang)}
          >
            {lang}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface LanguageSettingsProps {
  theme: boolean;
}

const LanguageSettings: React.FC<LanguageSettingsProps> = ({ theme }) => {
  const { isOpen, toggle, close } = useDropdown();
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || ""
  );

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    close();
  };

  const languageLabel = language
    ? language.charAt(0).toUpperCase() + language.slice(1)
    : "Choose Language";

  return (
    <div className="mb-4">
      <h2 className="text-xl font-medium">Language</h2>
      <div className="relative flex justify-between items-center mt-0 pb-0">
        <p className="opacity-70 text-xs">Language, hearing, ...</p>
        <DropdownButton
          label={languageLabel}
          isOpen={isOpen}
          toggle={toggle}
          theme={theme}
          ariaLabel="Toggle Language Dropdown"
        />
        <LanguageDropdown
          isOpen={isOpen}
          handleLanguageChange={handleLanguageChange}
          theme={theme}
        />
      </div>
      <hr
        className={`border-t ${
          theme ? "border-gray-500" : "border-gray-600"
        } my-4`}
      />
    </div>
  );
};

const AccountSettings: React.FC<{ theme: boolean }> = ({ theme }) => (
  <div className="mb-4">
    <h2 className="text-xl font-medium">My Account</h2>
    <div className="flex justify-between items-center">
      <p className="opacity-70 text-xs">Edit profile, export account data, …</p>
      <button className="text-sm">Change settings</button>
    </div>
    <hr
      className={`border-t ${
        theme ? "border-gray-500" : "border-gray-600"
      } my-4`}
    />
  </div>
);

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
        <h2 className="text-xl font-medium">Email Notifications</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="opacity-70 text-xs">
            Feedback emails, reminder emails, news emails
          </p>
          <ToggleSwitch
            isEnabled={emailNotificationsEnabled}
            toggle={toggleEmailNotifications}
            theme={theme}
          />
        </div>
      </div>
      <hr
        className={`border-t ${
          theme ? "border-gray-500" : "border-gray-600"
        } my-4`}
      />
      <div className="mb-4">
        <h2 className="text-xl font-medium">Push Notifications</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="opacity-70 text-xs">
            Grade updates, session reminders, performance, comments
          </p>
          <ToggleSwitch
            isEnabled={pushNotificationsEnabled}
            toggle={togglePushNotifications}
            theme={theme}
          />
        </div>
      </div>
      <hr
        className={`border-t ${
          theme ? "border-gray-500" : "border-gray-600"
        } my-4`}
      />
    </div>
  );
};

const PrivacySecurity: React.FC<{ theme: boolean }> = ({ theme }) => (
  <div className="mb-4">
    <h2 className="text-xl font-medium">Privacy and Security</h2>
    <div className="flex justify-between items-center">
      <p className="opacity-70 text-xs">Privacy and Security</p>
      <button className="text-sm">Change settings</button>
    </div>
    <hr
      className={`border-t ${
        theme ? "border-gray-500" : "border-gray-600"
      } my-4`}
    />
  </div>
);

const LoginActivity: React.FC<{ theme: boolean }> = ({ theme }) => (
  <div className="mb-4">
    <h2 className="text-xl font-medium">Login Activity</h2>
    <div className="flex justify-between items-center">
      <p className="opacity-70 text-xs">History of your login sessions</p>
      <button className="text-sm">View</button>
    </div>
  </div>
);

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`p-6 ${
        theme ? "bg-gray-100 text-black" : "bg-gray-800 text-white"
      } w-full ml-24 mr-24 mt-6 rounded-2xl`}
    >
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <AccountSettings theme={theme} />
      <ThemeSettings theme={theme} setTheme={setTheme} />
      <LanguageSettings theme={theme} />
      <NotificationSettings theme={theme} />
      <PrivacySecurity theme={theme} />
      <LoginActivity theme={theme} />
    </div>
  );
};

export default SettingsPage;
