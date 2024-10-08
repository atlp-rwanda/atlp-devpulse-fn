import React from "react";
import { FaArchive, FaTrash } from "react-icons/fa"; // Icons for read and delete
import { formatDistanceToNow } from "date-fns";

type NotificationProps = {
  notification: {
    _id: string;
    message: string;
    createdAt: string;
    read: boolean;
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s";
  };
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
};
const DEFAULT_AVATAR_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s";
const Notification: React.FC<NotificationProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  // Convert the createdAt timestamp to a number
  const notificationDate = new Date(Number(notification.createdAt));

  // Check for valid date
  const isDateValid = !isNaN(notificationDate.getTime());

  return (
    <div className="flex flex-row gap-4 justify-between items-center border rounded-lg p-4 bg-gray-100 dark:bg-dark-bg text-primary dark:text-white">
      <div className="flex flex-row gap-4 items-center">
        <img
          src={DEFAULT_AVATAR_URL}
          alt="Notification"
          className="w-12 h-12 rounded-full border-green"
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{notification.message}</h1>
          <span className="text-sm text-gray-400">
            {isDateValid
              ? formatDistanceToNow(notificationDate, {
                  addSuffix: true,
                })
              : "Invalid date"}{" "}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        {!notification.read && (
          <button
            className="text-green-500 hover:text-green-300"
            onClick={() => onMarkAsRead(notification._id)}
          >
            <FaArchive size={16} />
          </button>
        )}
        <button
          className="hover:text-red-300"
          onClick={() => onDelete(notification._id)}
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
