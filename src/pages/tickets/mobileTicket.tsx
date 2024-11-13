import React from 'react';
import { Link } from 'react-router-dom';

const MobileTicketCard = ({ 
  ticket, 
  isAdmin = false,
  showAuthor = false 
}) => {
  const baseRoute = isAdmin ? '/admin' : '/applicant';

  return (
    <div
      key={ticket.id}
      className="flex flex-col w-full gap-2 border border-solid border-transparent border-t-black dark:border-t-white border-t-4 rounded-t-sm p-4 bg-white dark:bg-gray-800 shadow-sm"
    >
      {showAuthor && (
        <>
          <div className="flex flex-col w-full mt-3">
            <label className="text-left text-gray-400 text-sm">
              Author Name
            </label>
            <label className="text-left text-black-text dark:text-white text-base font-normal">
              {ticket.author?.firstname || "N/A"} {ticket.author?.lastname || ""}
            </label>
          </div>
          
          <div className="flex flex-col w-full">
            <label className="text-left text-gray-400 text-sm">
              Author Email
            </label>
            <label className="text-left text-black-text dark:text-white text-base font-normal">
              {ticket.author?.email || "N/A"}
            </label>
          </div>
        </>
      )}

      <div className="flex flex-col w-full">
        <label className="text-left text-gray-400 text-sm">
          Subject
        </label>
        <label className="text-left text-black-text dark:text-white text-base font-normal">
          {ticket.title}
        </label>
      </div>

      <div className="flex flex-col w-full">
        <label className="text-left text-gray-400 text-sm">
          Status
        </label>
        <label className="text-left text-black-text dark:text-white text-base font-normal">
          {ticket.status || "N/A"}
        </label>
      </div>

      <div className="flex flex-col w-full">
        <label className="text-left text-gray-400 text-sm">
          Latest Update
        </label>
        <label className="text-left text-black-text dark:text-white text-base font-normal">
          {new Date(parseInt(ticket.updatedAt)).toLocaleDateString()}
        </label>
      </div>

      <div className="flex flex-col w-full">
        <label className="text-left text-gray-400 text-sm">
          Action
        </label>
        <div className="flex flex-row gap-2 mt-2">
          <Link
            to={`${baseRoute}/ticket/${ticket.id}`}
            className="text-white bg-yellow-500 hover:bg-yellow-600 border border-solid border-yellow-500 rounded-md px-4 py-1 text-xs transition-colors"
          >
            View
          </Link>
          <Link
            to={`${baseRoute}/ticket/${ticket.id}/${isAdmin ? 'resolve' : 'reply'}`}
            className="text-white bg-green hover:bg-green-600 border border-solid border-green rounded-md px-4 py-1 text-xs transition-colors"
          >
            {isAdmin ? 'Resolve' : 'Reply'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileTicketCard;