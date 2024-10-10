import { toast } from "react-toastify";
import { gql, useSubscription } from "@apollo/client";
import { useEffect } from "react";

const NOTIFICATION_SUBSCRIPTION = gql`
  subscription OnNotificationReceived {
    notificationReceived {
      _id
      message
      type
      read
      createdAt
    }
  }
`;

interface NotificationListenerProps {
  onNewNotification: () => void;
}

export const NotificationListener: React.FC<NotificationListenerProps> = ({
  onNewNotification,
}) => {
  // Use the subscription hook
  const { data, error } = useSubscription(NOTIFICATION_SUBSCRIPTION);

  if (error) {
    console.error("Subscription error:", error.message || error);
    toast.error("Failed to connect to the notification service.");
  }

  useEffect(() => {
    if (data) {
      const { notificationReceived } = data;
      // Display the notification in a toast
      // toast.info(`New Notification: ${notificationReceived.message}`);

      // Trigger the callback to update the notification state in NavBar
      onNewNotification();
    }

    if (error) {
      console.error("Subscription error:", error);
      toast.error("Error receiving new notifications");
    }
  }, [data, error, onNewNotification]);

  return null;
};
