import React, { useEffect, useState } from "react";
import { IoMdMailOpen, IoMdMailUnread } from "react-icons/io";
import { useNotifications } from "../../utils/Notifications";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

function ApplicantNotifications() {
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");
  const [searchQuery, setSearchQuery] = useState("");

  const { notifications, markAsRead, markAsUnread, unreadCount } =
    useNotifications();

  const handleToggleRead = (notification: Notification) => {
    if (notification.read) {
      markAsUnread(notification.id);
    } else {
      markAsRead(notification.id);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSortOrder = (order: "new" | "old") => {
    setSortOrder(order);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options).replace(",", "");
  };

  const filteredNotifications =
    activeTab === "Unread"
      ? notifications.filter((notification) => !notification.read)
      : notifications;

  const searchedNotifications = filteredNotifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedNotifications = [...searchedNotifications].sort((a, b) =>
    sortOrder === "new"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <div className="flex space-x-2">
          <button
            onClick={() => handleTabChange("All")}
            className={`${
              activeTab === "All" ? "bg-green" : ""
            } px-4 py-2 rounded-lg text-sm font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => handleTabChange("Unread")}
            className={`${
              activeTab === "Unread" ? "bg-green" : ""
            } px-4 py-2 rounded-lg text-sm font-semibold`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        <div className="flex space-x-2 items-center">
          <span>Order By:</span>
          <select
            onChange={(e) => handleSortOrder(e.target.value as "new" | "old")}
            className="bg-green px-4 py-2 rounded-lg text-sm"
            value={sortOrder}
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-gray-800">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-700 p-2 rounded-lg outline-none text-white"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg mb-4 flex justify-between items-center ${
                notification.read
                  ? "bg-gray-800"
                  : "bg-gray-800 border border-white text-white"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={notification.read ? "text-gray-400" : "text-white"}
                >
                  {notification.message || "No message content available."}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-gray-400 text-sm">
                  {formatDate(notification.createdAt) || "Date not available"}
                </div>
                <button
                  onClick={() => handleToggleRead(notification)}
                  className="text-blue-500"
                >
                  {notification.read ? (
                    <IoMdMailOpen className="text-xl" />
                  ) : (
                    <IoMdMailUnread className="text-xl" />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No notifications available.
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicantNotifications;
