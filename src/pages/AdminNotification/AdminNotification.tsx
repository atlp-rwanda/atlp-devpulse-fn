import React, { ChangeEvent, useState } from "react";
import Notification from "./Notification";
import SelectField from "../../components/ReusableComponents/Select";
const AdminNotification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      message: "New team member joined",
      time: "2024-10-01T12:00:00Z",
      read: false,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
    {
      id: "2",
      message: "Server maintenance completed",
      time: "2023-09-30T08:00:00Z",
      read: true,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
    {
      id: "3",
      message: "Payment received",
      time: "2023-09-29T15:00:00Z",
      read: false,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    },
  ]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [orderBy, setOrderBy] = useState<"recent" | "oldest">("recent");
  const handleMarkAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  const handleDelete = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };
  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as "recent" | "oldest");
  };
  const filteredNotifications = notifications.filter((notification) =>
    filter === "all" ? true : !notification.read
  );
  const sortedNotifications = [...filteredNotifications].sort((a, b) =>
    orderBy === "recent"
      ? new Date(b.time).getTime() - new Date(a.time).getTime()
      : new Date(a.time).getTime() - new Date(b.time).getTime()
  );
  return (
    <div className="h-screen w-full px-4 md:px-8">
      <div className="flex mt-10 space-x-6 mb-10 items-center">
        <div className="flex">
          <button
            className={`rounded-s-md w-20 py-2 px-4 bg-white text-[#56C870]  border transition-colors ${
              filter === "all"
                ? "bg-green text-black"
                : "hover:bg-green hover:text-white"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`rounded-e-md w-20 py-2 px-4 bg-primary dark:bg-[#56C870]  text-white transition-colors ${
              filter === "unread"
                ? " text-green bg-primary dark:bg-[#56C870] "
                : "hover:bg-dark-frame-bg hover:text-white"
            }`}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
        </div>
        <div className="ml-8 flex flex-row gap-2 items-center">
          <span className="text-primary mr-3 dark:text-white">OrderBy:</span>
          <SelectField
            value={orderBy}
            onChange={handleOrderChange}
            options={[
              { value: "recent", label: "Most Recent" },
              { value: "oldest", label: "Oldest" },
            ]}
            className="rounded py-2 px-4 bg-primary dark:bg-[#56C870]  text-white focus:outline-none cursor-pointer "
          />
        </div>
      </div>
      <div className="space-y-4">
        {sortedNotifications.length ? (
          sortedNotifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-white">No notifications available.</p>
        )}
      </div>
    </div>
  );
};
export default AdminNotification;
