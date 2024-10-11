import React, { createContext, useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "./toast";
import { useFetchNotifications } from "./applicantNotifications/useFetchNotifications";
import { usePusherNotifications } from "./applicantNotifications/usePusher";
import { updateNotificationStatus } from "./applicantNotifications/NotificationService";
import { Notification } from "./applicantNotifications/types";

interface NotificationContextProps {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { notifications, unreadCount, markAsRead, markAsUnread } =
    useNotificationsState(localStorage.getItem("userId"));

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAsUnread }}
    >
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

const useNotificationsState = (userId: string | null) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
    toast.info(`New notification: ${notification.message}`, toastOptions);
  };

  useFetchNotifications(userId, setNotifications, setUnreadCount);
  usePusherNotifications(userId, addNotification);

  const markAsRead = async (id: string) => {
    await updateNotificationStatus(id, true);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => prev - 1);
  };

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
    setUnreadCount((prev) => prev + 1);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
  };
};
