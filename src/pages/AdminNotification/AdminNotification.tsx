import React, { ChangeEvent, useState } from "react";
import Notification from "./Notification";
import SelectField from "../../components/ReusableComponents/Select";

// Define the notification type
interface NotificationType {
  id: string;
  message: string;
  time: string;
  read: boolean;
  image: string;
}

const AdminNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([
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
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as "recent" | "oldest");
  };

  const filteredNotifications = notifications.filter((n) =>
    filter === "all" ? true : !n.read
  );

  const sortedNotifications = [...filteredNotifications].sort((a, b) =>
    orderBy === "recent"
      ? new Date(b.time).getTime() - new Date(a.time).getTime()
      : new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  return (
    <div className="h-screen w-full px-4 md:px-8">
      <NotificationFilter
        filter={filter}
        setFilter={setFilter}
        orderBy={orderBy}
        onOrderChange={handleOrderChange}
      />
      <NotificationList
        notifications={sortedNotifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </div>
  );
};

const NotificationFilter: React.FC<{
  filter: "all" | "unread";
  setFilter: (filter: "all" | "unread") => void;
  orderBy: "recent" | "oldest";
  onOrderChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ filter, setFilter, orderBy, onOrderChange }) => (
  <div className="flex mt-10 space-x-6 mb-10 items-center">
    <div className="flex">
      <button
        className={`rounded-s-md w-20 py-2 px-4  border transition-colors ${
          filter === "all"
            ? " bg-primary text-white dark:bg-[#56C870] dark:text-white"
            : "bg-white text-primary dark:bg-white dark:text-primary"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`rounded-e-md w-20 py-2 px-4  dark:bg-[#56C870] transition-colors ${
          filter === "unread"
            ? "text-white bg-primary dark:bg-[#56C870] dark:text-white"
            : "bg-white text-primary  dark:bg-white dark:text-primary"
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
        onChange={onOrderChange}
        options={[
          { value: "recent", label: "Most Recent" },
          { value: "oldest", label: "Oldest" },
        ]}
        className="rounded py-2 px-4 bg-primary dark:bg-[#56C870] text-white focus:outline-none cursor-pointer"
      />
    </div>
  </div>
);

const NotificationList: React.FC<{
  notifications: NotificationType[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ notifications, onMarkAsRead, onDelete }) => (
  <div className="space-y-4">
    {notifications.length ? (
      notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))
    ) : (
      <p className="text-primary dark:text-white text-center">
        No notifications available.
      </p>
    )}
  </div>
);

export default AdminNotification;
