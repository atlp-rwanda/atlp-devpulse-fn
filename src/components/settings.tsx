import React, { useState, useEffect } from "react";
import { useTheme } from "../hooks/darkmode";
import ToggleSwitch from "./ToggleSwitch";
import DropdownButton from "./DropdownButton"; 

const Dropdown = ({ isOpen, handleChange, items, theme }) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute mt-2 right-0 ${theme ? 'bg-gray-200' : 'bg-gray-800'} border rounded-md shadow-lg`}>
      <ul className={`text-sm ${theme ? "text-black" : "text-white"}`}>
        {items.map((item) => (
          <li
            key={item} className={`px-4 py-2 cursor-pointer ${theme ? 'bg-gray-200' : 'bg-gray-800'}`} onClick={() => handleChange(item)}> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface SectionProps { title: string; children: React.ReactNode; theme: boolean; isLast?: boolean; }

const Section: React.FC<SectionProps> = ({ title, children, theme, isLast }) => (
  <div className="mb-4">
    <h2 className="text-xl font-medium">{title}</h2> {children} {!isLast && <hr className={`border-t ${theme ? "border-gray-500" : "border-gray-600"} my-4`} />}
  </div>
);

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

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const ThemeSettings = () => {
    const { isOpen, toggle, close } = useDropdown();

    const handleThemeChange = (selectedTheme: string) => {
      setTheme(selectedTheme === "Light Theme");
      close();
    };

    return (
      <Section title="Appearance" theme={theme}>
        <div className="relative flex justify-between items-center mt-0 pb-0">
          <p className="opacity-70 text-xs">Theme preferences</p>
          <DropdownButton
            label={handleThemeLabel(theme)} isOpen={isOpen} toggle={toggle} theme={theme} ariaLabel="Toggle Theme Dropdown"
          />
          <Dropdown
            isOpen={isOpen} handleChange={handleThemeChange} items={["Light Theme", "Dark Theme"]} theme={theme}
          />
        </div>
      </Section>
    );
  };

  const LanguageSettings = () => {
    const { isOpen, toggle, close } = useDropdown();
    const [language, setLanguage] = useState<string>(localStorage.getItem("language") || "");

    const handleLanguageChange = (newLanguage: string) => {
      setLanguage(newLanguage); localStorage.setItem("language", newLanguage); close();
    };

    const languageLabel = language.charAt(0).toUpperCase() + language.slice(1) || "Choose Language";

    return (
      <Section title="Language" theme={theme}>
        <div className="relative flex justify-between items-center mt-0 pb-0">
          <p className="opacity-70 text-xs">Language, hearing, ...</p>
          <DropdownButton label={languageLabel} isOpen={isOpen} toggle={toggle} theme={theme} ariaLabel="Toggle Language Dropdown"
          />
          <Dropdown isOpen={isOpen} handleChange={handleLanguageChange} items={["English", "French", "Kinyarwanda"]} theme={theme}
          />
        </div>
      </Section>
    );
  };

  const AccountSettings = () => (
    <Section title="My Account" theme={theme}>
      <div className="flex justify-between items-center">
        <p className="opacity-70 text-xs">Edit profile, export account data, …</p> <button className="text-sm">Change settings</button>
      </div>
    </Section>
  );

  const NotificationSettings = () => {
    const {
      isEnabled: emailNotificationsEnabled, toggle: toggleEmailNotifications, } = useNotificationToggle("emailNotifications", true);

    const {
      isEnabled: pushNotificationsEnabled, toggle: togglePushNotifications, } = useNotificationToggle("pushNotifications", true);

    return (
      <div>
        <Section title="Email Notifications" theme={theme}>
          <div className="flex justify-between items-center mt-2">
            <p className="opacity-70 text-xs">Feedback emails, reminder emails, news emails</p>
            <ToggleSwitch isEnabled={emailNotificationsEnabled} toggle={toggleEmailNotifications} theme={theme} />
          </div>
        </Section>
        <Section title="Push Notifications" theme={theme}>
          <div className="flex justify-between items-center mt-2">
            <p className="opacity-70 text-xs">Grade updates, session reminders, performance, comments</p>
            <ToggleSwitch isEnabled={pushNotificationsEnabled} toggle={togglePushNotifications} theme={theme} />
          </div>
        </Section>
      </div>
    );
  };

  const PrivacySecurity = () => (
    <Section title="Privacy and Security" theme={theme}>
      <div className="flex justify-between items-center">
        <p className="opacity-70 text-xs">Privacy and Security</p> <button className="text-sm">Change settings</button>
      </div>
    </Section>
  );

  const LoginActivity: React.FC<{ isLast?: boolean }> = ({ isLast }) => (
    <Section title="Login Activity" theme={theme} isLast={isLast}>
      <div className="flex justify-between items-center">
        <p className="opacity-70 text-xs">History of your login sessions</p> <button className="text-sm">View</button>
      </div>
    </Section>
  );

  return (
    <div className={`p-6 ${theme ? "bg-gray-100 text-black" : "bg-gray-800 text-white"} w-full ml-24 mr-24 mt-6 rounded-2xl`}>
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <AccountSettings /> <ThemeSettings /> <LanguageSettings /> <NotificationSettings /> <PrivacySecurity /> <LoginActivity isLast />
    </div>
  );
};

export default SettingsPage;