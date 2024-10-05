import React from "react";
import { FaArchive, FaTrash } from "react-icons/fa"; // Icons for read and delete
import { formatDistanceToNow } from "date-fns";
type NotificationProps = {
  notification: {
    id: string;
    message: string;
    time: string;
    read: boolean;
    image: string;
  };
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
};
const Notification: React.FC<NotificationProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  return (
    <div className="flex flex-row gap-4 justify-between items-center border rounded-lg p-4 bg-gray-100 dark:bg-dark-bg text-primary  dark:text-white ">
      <div className="flex flex-row gap-4 items-center">
        <img
          src={notification.image}
          alt="Notification"
          className="w-12 h-12 rounded-full border-green"
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{notification.message}</h1>
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(notification.time), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        {!notification.read && (
          <button
            className="text-green-500 hover:text-green-300"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <FaArchive size={16} />
          </button>
        )}
        <button
          className=" hover:text-red-300"
          onClick={() => onDelete(notification.id)}
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
