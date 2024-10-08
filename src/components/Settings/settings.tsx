import React, { useState } from "react";

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
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="mb-4">
        <h2 className="text-lg font-medium">My Account</h2>
        <p>Edit profile, export account data, …</p>
        <button className="text-blue-400">Change settings</button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-medium">Appearance</h2>
        <select
          value={theme}
          onChange={handleThemeChange}
          className="p-2 border border-gray-600 bg-gray-700 text-white rounded"
        >
          <option value="light">Choose Theme</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-medium">Language</h2>
        <p>Language, hearing, …</p>
        <button className="text-blue-400">Change Language</button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Email notifications</h2>
        <button
          onClick={handleEmailNotificationToggle}
          className={`p-2 rounded ${emailNotifications ? "bg-green-500" : "bg-red-500"}`}
        >
          {emailNotifications ? "Enabled" : "Disabled"}
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Push notifications</h2>
        <button
          onClick={handlePushNotificationToggle}
          className={`p-2 rounded ${pushNotifications ? "bg-green-500" : "bg-red-500"}`}
        >
          {pushNotifications ? "Enabled" : "Disabled"}
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-medium">Privacy and Security</h2>
        <p>Privacy and Security</p>
        <button className="text-blue-400">Change settings</button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-medium">Login Activity</h2>
        <p>History of your login sessions</p>
        <button className="text-blue-400">View</button>
      </div>
    </div>
  );
};

export default Settings;
