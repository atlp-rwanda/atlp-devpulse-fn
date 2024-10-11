import React, { createContext, useState, useEffect, useContext } from "react";
import Pusher, { Channel } from "pusher-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "./toast";
import { fetchNotifications, updateNotificationStatus } from "./Notifications";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationContextProps {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

const useNotificationsState = (userId: string | null) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchAndSetNotifications(userId);
    }
  }, [userId]);

  const fetchAndSetNotifications = async (userId: string) => {
    try {
      const fetchedNotifications = await fetchNotifications(userId);
      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  const markAsRead = async (id: string) => {
    try {
      await updateNotificationStatus(id, true);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
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
    addNotification,
  };
};

const usePusherNotifications = (
  userId: string | null,
  addNotification: (notification: Notification) => void
) => {
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let pusherChannel: Channel;

    if (userId) {
      const pusher = new Pusher(process.env.PUSHER_KEY!, {
        cluster: process.env.PUSHER_CLUSTER!,
      });

      pusherChannel = pusher.subscribe(`notifications-${userId}`);
      pusherChannel.bind("new-notification", (data: Notification) => {
        addNotification(data);
        toast.info(`New notification: ${data.message}`, toastOptions);
      });

      setChannel(pusherChannel);
    }

    return () => {
      if (pusherChannel) {
        pusherChannel.unbind_all();
        pusherChannel.unsubscribe();
      }
    };
  }, [userId, addNotification]);
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    addNotification,
  } = useNotificationsState(userId);

  usePusherNotifications(userId, addNotification);

  useEffect(() => {
    const handleUserChange = () => {
      const newUserId = localStorage.getItem("userId");
      if (newUserId !== userId) {
        setUserId(newUserId);
      }
    };

    window.addEventListener("storage", handleUserChange);
    return () => {
      window.removeEventListener("storage", handleUserChange);
    };
  }, [userId]);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAsUnread }}
    >
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
