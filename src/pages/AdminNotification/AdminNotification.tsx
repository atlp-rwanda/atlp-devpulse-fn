import React, { ChangeEvent, useEffect, useState } from "react";
import Notification from "./Notification"; // Ensure this path is correct
import SelectField from "../../components/ReusableComponents/Select"; // Ensure this path is correct
import {
  deleteNotification,
  fetchAdminNotifications,
  markNotificationAsRead,
} from "../../redux/actions/adminNotification"; // Combined imports
import { toast } from "react-toastify";

interface NotificationType {
  _id: string;
  message: string;
  createdAt: string;
  read: boolean;
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s";
}

enum FilterOptions {
  All = "all",
  Unread = "unread",
}

enum OrderOptions {
  Recent = "recent",
  Oldest = "oldest",
}

const AdminNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);
  const [orderBy, setOrderBy] = useState<OrderOptions>(OrderOptions.Recent);

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNotifications = await fetchAdminNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        toast.error("Failed to fetch notifications");
      }
    };

    fetchData();
  }, []);
  const handleMarkAsRead = async (id: string) => {
    try {
      const updatedNotification = await markNotificationAsRead(id);

      if (updatedNotification) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === id
              ? { ...notification, read: true }
              : notification
          )
        );
        toast.success("Notification marked as read");
      } else {
        throw new Error("Failed to mark notification as read");
      }
    } catch (error: any) {
      toast.error(`Error marking notification as read: ${error.message}`); // Enhanced error message
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    } catch (error: any) {
      toast.error(`Error deleting notification: ${error.message}   ${id}`);
    }
  };

  const filteredNotifications = getFilteredNotifications(notifications, filter);
  const sortedNotifications = sortNotifications(filteredNotifications, orderBy);

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as OrderOptions);
  };

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
        onDelete={handleDelete} // Pass the delete handler
      />
    </div>
  );
};

// Helper function to filter notifications
const getFilteredNotifications = (
  notifications: NotificationType[],
  filter: FilterOptions
) => {
  if (!Array.isArray(notifications)) return [];
  return notifications.filter((n) =>
    filter === FilterOptions.All ? true : !n.read
  );
};

const sortNotifications = (
  notifications: NotificationType[],
  orderBy: OrderOptions
) => {
  return [...notifications].sort((a, b) => {
    const dateA = new Date(Number(a.createdAt));

    const dateB = new Date(Number(b.createdAt));

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return orderBy === OrderOptions.Recent
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });
};

// NotificationFilter component
const NotificationFilter: React.FC<{
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
  orderBy: OrderOptions;
  onOrderChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ filter, setFilter, orderBy, onOrderChange }) => (
  <div className="flex mt-10 space-x-6 mb-10 items-center">
    <div className="flex">
      <button
        className={`rounded-s-md w-20 py-2 px-4 border transition-colors ${
          filter === FilterOptions.All
            ? "bg-primary text-white dark:bg-[#56C870] dark:text-white"
            : "bg-white text-primary dark:bg-white dark:text-primary"
        }`}
        onClick={() => setFilter(FilterOptions.All)}
      >
        All
      </button>
      <button
        className={`rounded-e-md w-20 py-2 px-4 dark:bg-[#56C870] transition-colors ${
          filter === FilterOptions.Unread
            ? "text-white bg-primary dark:bg-[#56C870] dark:text-white"
            : "bg-white text-primary dark:bg-white dark:text-primary"
        }`}
        onClick={() => setFilter(FilterOptions.Unread)}
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
          { value: OrderOptions.Recent, label: "Most Recent" },
          { value: OrderOptions.Oldest, label: "Oldest" },
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
          key={notification._id}
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
