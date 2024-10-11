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

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [channel, setChannel] = useState<Channel | null>(null);

  const markAsRead = async (id: string) => {
    setNotifications((prevNotifications) => {
      const notificationToMark = prevNotifications.find((n) => n.id === id);
      if (notificationToMark && !notificationToMark.read) {
        setUnreadCount((prev) => prev - 1);
      }
      return prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      );
    });

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation MarkNotificationAsRead($id: ID!) {
              markNotificationAsRead(id: $id) {
                id
                read
              }
            }
          `,
          variables: { id },
        }),
      });

      const result = await response.json();
      if (!result.data?.markNotificationAsRead.read) {
        throw new Error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: false }
            : notification
        )
      );
      setUnreadCount((prev) => prev + 1);
    }
  };

  const markAsUnread = (id: string) => {
    setNotifications((prevNotifications) => {
      const notificationToMark = prevNotifications.find((n) => n.id === id);
      if (notificationToMark && notificationToMark.read) {
        setUnreadCount((prev) => prev + 1);
      }
      return prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: false } : notification
      );
    });
  };

  const fetchNotifications = async (userId: string) => {
    try {
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
        setNotifications(result.data.getNotifications);
        const unread = result.data.getNotifications.filter(
          (n: Notification) => !n.read
        ).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    let pusher: Pusher;
    let pusherChannel: Channel;

    if (userId) {
      fetchNotifications(userId);

      pusher = new Pusher(process.env.PUSHER_KEY!, {
        cluster: process.env.PUSHER_CLUSTER!,
      });

      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }

      pusherChannel = pusher.subscribe(`notifications-${userId}`);
      pusherChannel.bind("new-notification", (data: Notification) => {
        setNotifications((prevNotifications) => [data, ...prevNotifications]);
        setUnreadCount((prev) => prev + 1);

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

        toast.info(`New notification: ${data.message}`, toastOptions);
      });

      // Set the channel state
      setChannel(pusherChannel);
    }

    return () => {
      if (pusherChannel) {
        pusherChannel.unbind_all();
        pusherChannel.unsubscribe();
      }
    };
  }, [userId]);

  // Listen for userId change from localStorage
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
