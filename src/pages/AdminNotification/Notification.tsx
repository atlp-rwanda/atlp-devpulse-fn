import React from "react";
import { FaTrash } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { MdMarkChatRead } from "react-icons/md";

type NotificationProps = {
  notification: {
    _id: string;
    message: string;
    createdAt: string;
    read: boolean;
    image: string;
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
  const notificationDate = new Date(Number(notification.createdAt));
  const isDateValid = !isNaN(notificationDate.getTime());

  return (
    <div
      className={`flex flex-row gap-4 justify-between items-center border rounded-lg p-4 max-w-full 
      ${
        notification.read
          ? "bg-gray-300 text-gray-500"
          : "bg-gray-500 text-white"
      } 
      dark:${
        notification.read
          ? "bg-gray-700 text-gray-400"
          : "bg-dark-bg text-white"
      }`}
    >
      <div className="flex-shrink-0">
        <img
          src={DEFAULT_AVATAR_URL}
          alt="Notification"
          className="w-12 h-12 rounded-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold truncate">{notification.message}</h2>
        <span className="text-sm text-gray-400">
          {isDateValid
            ? formatDistanceToNow(notificationDate, {
                addSuffix: true,
              })
            : "Invalid date"}
        </span>
      </div>

      <div className="flex flex-row gap-4 items-center">
        {!notification.read && (
          <button
            className="text-green-500 hover:text-green-300"
            onClick={() => onMarkAsRead(notification._id)}
          >
            <MdMarkChatRead size={16} />
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
