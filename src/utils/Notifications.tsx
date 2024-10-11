import { Channel } from "pusher-js";
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializePusher, unsubscribePusher } from "./applicantNotifications/pusher";
import { fetchNotifications, updateNotificationStatus } from "./applicantNotifications/NotificationService";
import { Notification } from "./applicantNotifications/types";
import { toastOptions } from "./toast";

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
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    if (userId) {
      fetchAndSetNotifications(userId);
      const pusherChannel = initializePusher(userId, addNotification);
      setChannel(pusherChannel);
    }

    return () => unsubscribePusher(channel);
  }, [userId]);

  const fetchAndSetNotifications = async (userId: string) => {
    const fetchedNotifications = await fetchNotifications(userId);
    setNotifications(fetchedNotifications);
    setUnreadCount(fetchedNotifications.filter((n) => !n.read).length);
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
    toast.info(`New notification: ${notification.message}`, toastOptions);
  };

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
