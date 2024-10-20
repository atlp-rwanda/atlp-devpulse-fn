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
  userId: string | null;
  setUserId: (userId: string | null) => void;
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
  const { notifications, unreadCount, markAsRead, markAsUnread,userId, setUserId} =
    useNotificationsState();

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAsUnread,
        userId,
        setUserId,
      }}
    >
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

const useNotificationsState = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
    toast.info(`New notification: ${notification.message}`, toastOptions);
  };

  useFetchNotifications(userId, setNotifications, setUnreadCount);
  usePusherNotifications(userId, addNotification);

  const updateNotificationReadStatus = (id: string, read: boolean) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read } : n))
    );
    setUnreadCount((prev) => prev + (read ? -1 : 1));
  };

  const markAsRead = async (id: string) => {
    await updateNotificationStatus(id, true);
    updateNotificationReadStatus(id, true);
  };

  const markAsUnread = async (id: string) => {
    await updateNotificationStatus(id, false);
    updateNotificationReadStatus(id, false);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    userId,
    setUserId
  };
};
