import React, { createContext, useState, useEffect, useContext } from "react";
import Pusher, { Channel } from "pusher-js";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "small-toast",
  bodyClassName: "small-toast-body",
  style: {
    background: "#01acf0",
    color: "#ffffff",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "0.875rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    if (userId) {
      fetchAndSetNotifications(userId);
      setupPusher(userId);
    }
    return () => {
      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }
    };
  }, [userId]);

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

  const fetchAndSetNotifications = async (userId: string) => {
    try {
      const fetchedNotifications = await fetchNotifications(userId);
      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const setupPusher = (userId: string) => {
    const pusher = new Pusher(process.env.PUSHER_KEY!, {
      cluster: process.env.PUSHER_CLUSTER!,
    });

    if (channel) {
      channel.unbind_all();
      channel.unsubscribe();
    }

    const pusherChannel = pusher.subscribe(`notifications-${userId}`);
    pusherChannel.bind("new-notification", (data: Notification) => {
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
      setUnreadCount((prev) => prev + 1);
      toast.info(`New notification: ${data.message}`, toastOptions);
    });

    setChannel(pusherChannel);
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

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAsUnread }}
    >
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

// Function to fetch notifications
const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  const response = await fetch(`${process.env.BACKEND_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetNotifications($userId: ID!) {
          getNotifications(userId: $userId) {
            id
            message
            read
            createdAt
          }
        }
      `,
      variables: { userId },
    }),
  });

  const result = await response.json();
  if (result.data) {
    return result.data.getNotifications;
  }
  throw new Error("Failed to fetch notifications");
};

// Function to update notification status
const updateNotificationStatus = async (id: string, read: boolean) => {
  const response = await fetch(`${process.env.BACKEND_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation MarkNotificationAsRead($id: ID!, $read: Boolean!) {
          markNotificationAsRead(id: $id, read: $read) {
            id
            read
          }
        }
      `,
      variables: { id, read },
    }),
  });

  const result = await response.json();
  if (!result.data.markNotificationAsRead.read) {
    throw new Error("Failed to mark notification as read");
  }
};
