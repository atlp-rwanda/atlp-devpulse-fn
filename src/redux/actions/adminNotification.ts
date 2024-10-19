import axios from "./axiosconfig";
import { toast } from "react-toastify";
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

export const markNotificationAsRead = async (id) => {
  const response = await axios({
    url: process.env.BACKEND_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `
        mutation MarkAdminNotificationAsRead($markAdminNotificationAsReadId: ID!) {
  markAdminNotificationAsRead(id: $markAdminNotificationAsReadId) {
    _id
    message
    type
    createdAt
    read

 
  }
}
      `,
      variables: {
        markAdminNotificationAsReadId: id,
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

  return response.data.data.markAdminNotificationAsRead;
};

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
        deleteNotificationId: id,
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
