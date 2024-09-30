import React, { useState } from "react";

function ApplicantNotifications() {
  const [activeTab, setActiveTab] = useState("All");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <div className="flex space-x-2">
          <button
            onClick={() => handleTabChange("All")}
            className={`${
              activeTab === "All" ? "bg-gray-700" : ""
            } px-4 py-2 rounded-lg text-sm font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => handleTabChange("Unread")}
            className={`${
              activeTab === "Unread" ? "bg-gray-700" : ""
            } px-4 py-2 rounded-lg text-sm font-semibold`}
          >
            Unread
          </button>
        </div>
        <div className="flex space-x-2 items-center">
          <span>Order By:</span>
          <button className="bg-green-500 px-4 py-2 rounded-lg text-sm">
            New
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-800">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-700 p-2 rounded-lg outline-none text-white"
        />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {[1, 2, 3, 4].map((notification) => (
          <div
            key={notification}
            className="bg-gray-800 p-4 rounded-lg mb-4 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50"
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-bold text-lg">Danny deMontes</div>
                <div className="text-gray-400">
                  Lorem ipsum is a placeholder text commonly used to demonstrate
                  the visual form of a document or a typ...
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-sm">Oct 22, 4:45 PM</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicantNotifications;
