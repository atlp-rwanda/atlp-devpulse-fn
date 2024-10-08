import axios from "./axiosconfig";
import { toast } from "react-toastify";

// Function to fetch admin notifications
export const fetchAdminNotifications = async () => {
  const response = await axios({
    url: process.env.BACKEND_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `
        query GetAdminNotifications {
          getAdminNotifications {
            _id
            message
            type
            read
            createdAt
          }
        }
      `,
    },
  });

  if (response.data.errors) {
    toast.error("Error fetching notifications");
    return [];
  }

  return response.data.data.getAdminNotifications;
};

// Function to mark a notification as read
export const markNotificationAsRead = async (id) => {
  const response = await axios({
    url: process.env.BACKEND_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `
        mutation MarkNotificationAsRead($markNotificationAsReadId: ID!) {
          markNotificationAsRead(id: $markNotificationAsReadId) {
            _id
            message
            type
            createdAt
            read
          }
        }
      `,
      variables: {
        markNotificationAsReadId: id, // <-- change this
      },
    },
  });

  if (response.data.errors) {
    toast.error(
      "Error marking notification as read: " +
        response.data.errors.map((error) => error.message).join(", ")
    );
    return null;
  }

  return response.data.data.markNotificationAsRead;
};

// Function to delete a notification
export const deleteNotification = async (id) => {
  const response = await axios({
    url: process.env.BACKEND_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `
        mutation DeleteNotification($deleteNotificationId: ID!) {
          deleteNotification(id: $deleteNotificationId)
        }
      `,
      variables: {
        deleteNotificationId: id, // Pass the ID of the notification
      },
    },
  });

  if (response.data.errors) {
    toast.error(
      "Error deleting notification: " +
        response.data.errors.map((error) => error.message).join(", ")
    );
    return false;
  }

  toast.success("Notification deleted successfully");
  return true;
};
