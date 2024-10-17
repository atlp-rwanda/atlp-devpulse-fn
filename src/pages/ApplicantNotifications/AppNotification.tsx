import React, { useState } from "react";
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

  const handleToggleRead = (notification: Notification) =>
    notification.read
      ? markAsUnread(notification.id)
      : markAsRead(notification.id);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const filteredNotifications = filterNotifications(
    notifications,
    activeTab,
    searchQuery
  );
  const sortedNotifications = sortNotifications(
    filteredNotifications,
    sortOrder
  );

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      <Header
        activeTab={activeTab}
        unreadCount={unreadCount}
        onTabChange={setActiveTab}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <NotificationList
        notifications={sortedNotifications}
        onToggleRead={handleToggleRead}
        formatDate={formatDate}
      />
    </div>
  );
}

const filterNotifications = (
  notifications: Notification[],
  activeTab: string,
  searchQuery: string
) =>
  notifications.filter(
    (notification) =>
      (activeTab === "Unread" ? !notification.read : true) &&
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

const sortNotifications = (
  notifications: Notification[],
  sortOrder: "new" | "old"
) =>
  [...notifications].sort((a, b) =>
    sortOrder === "new"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const Header = ({
  activeTab,
  unreadCount,
  onTabChange,
  sortOrder,
  onSortOrderChange,
  searchQuery,
  onSearchChange,
}: {
  activeTab: string;
  unreadCount: number;
  onTabChange: (tab: string) => void;
  sortOrder: "new" | "old";
  onSortOrderChange: (order: "new" | "old") => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <div className="flex justify-between items-center p-4 bg-gray-800">
      <div className="flex space-x-2">
        <button
          onClick={() => onTabChange("All")}
          className={`${
            activeTab === "All" ? "bg-green" : ""
          } px-4 py-2 rounded-lg text-sm font-semibold`}
        >
          All
        </button>
        <button
          onClick={() => onTabChange("Unread")}
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
          onChange={(e) => onSortOrderChange(e.target.value as "new" | "old")}
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
        onChange={onSearchChange}
      />
    </div>
  </div>
);

const NotificationList = ({
  notifications,
  onToggleRead,
  formatDate,
}: {
  notifications: Notification[];
  onToggleRead: (notification: Notification) => void;
  formatDate: (dateString: string) => string;
}) => (
  <div className="flex-1 p-4 overflow-y-auto">
    {notifications.length > 0 ? (
      notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg mb-4 flex justify-between items-center ${
            notification.read
              ? "bg-gray-800"
              : "bg-gray-800 border border-white text-white"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={notification.read ? "text-gray-400" : "text-white"}>
              {notification.message || "No message content available."}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-400 text-sm">
              {formatDate(notification.createdAt) || "Date not available"}
            </div>
            <button
              onClick={() => onToggleRead(notification)}
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
);

export default ApplicantNotifications;
