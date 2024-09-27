import React from "react";
import * as icons from "react-icons/ai";

type Props = {};

const NotificationItem = ({ name, message, time }) => (
    <div className="bg-gray-800 p-4 rounded-lg mb-2">
      <div className="flex items-center">
        <img src="" alt={name} className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-grow">
          <h3 className="text-white font-semibold">{name}</h3>
          <p className="text-gray-400 text-sm">{message}</p>
        </div>
        <span className="text-gray-500 text-xs">{time}</span>
      </div>
    </div>
  );
  
  const Notifications = () => {
    const notifications = [
      { name: 'Danny deMontes', message: 'Lorem ipsum is a placeholder text commonly commonly used to demonstrate the visual form of a document or a typ...', time: 'Oct 22, 4:45 PM' },
      { name: 'Danny deMontes', message: 'Lorem ipsum is a placeholder text commonly commonly used to demonstrate the visual form of a document or a typ...', time: 'Oct 22, 4:45 PM' },
      { name: 'Danny deMontes', message: 'Lorem ipsum is a placeholder text commonly commonly used to demonstrate the visual form of a document or a typ...', time: 'Oct 22, 4:45 PM' },
      { name: 'Danny deMontes', message: 'Lorem ipsum is a placeholder text commonly commonly used to demonstrate the visual form of a document or a typ...', time: 'Oct 22, 4:45 PM' },
    ];
  
    return (
      <div className="min-h-screen p-6 min-w-full">
        <div className="flex justify-between items-center mb-6 mt-6">
          <div className="flex space-x-2">
            <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium">All</button>
            <button className="bg-[#56C870] text-white px-4 py-2 rounded-md font-medium">Unread</button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white">Order By:</span>
            <button className="bg-[#56C870] text-white px-4 py-2 rounded-md font-medium flex items-center">
              New <span className="ml-2">▼</span>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <NotificationItem key={index} {...notification} />
          ))}
        </div>
      </div>
    );
  };

export default Notifications;
