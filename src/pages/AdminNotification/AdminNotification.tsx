import React, { ChangeEvent, useEffect, useState } from "react";
import Notification from "./Notification";
import * as icons from "react-icons/ai";
import SelectField from "../../components/ReusableComponents/Select";

import {
  deleteNotification,
  fetchAdminNotifications,
  markNotificationAsRead,
} from "../../redux/actions/adminNotification";
import { toast } from "react-toastify";
import {
  useCustomPagination,
  DOTS,
} from "../../components/Pagination/useCustomPagination";

interface NotificationType {
  _id: string;
  message: string;
  createdAt: string;
  read: boolean;
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s";
}

enum FilterOptions {
  All = "all",
  Unread = "unread",
}

enum OrderOptions {
  Recent = "recent",
  Oldest = "oldest",
}

const PAGE_SIZE = 4;

const AdminNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);
  const [orderBy, setOrderBy] = useState<OrderOptions>(OrderOptions.Recent);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNotifications = await fetchAdminNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        toast.error("Failed to fetch notifications");
      }
    };
    fetchData();
  }, []);
  const handleMarkAsRead = async (id: string) => {
    try {
      const updatedNotification = await markNotificationAsRead(id);
      if (updatedNotification) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === id
              ? { ...notification, read: true }
              : notification
          )
        );
        toast.success("Notification marked as read");
      } else {
        throw new Error("Failed to mark notification as read");
      }
    } catch (error: any) {
      toast.error(`Error marking notification as read: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    } catch (error: any) {
      toast.error(`Error deleting notification: ${error.message}`);
    }
  };

  const filteredNotifications = getFilteredNotifications(notifications, filter);
  const sortedNotifications = sortNotifications(filteredNotifications, orderBy);
  const totalPageCount = Math.ceil(sortedNotifications.length / PAGE_SIZE);
  const paginatedNotifications = sortedNotifications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const paginationRange = useCustomPagination({
    totalPageCount,
    siblingCount: 1,
    currentPage,
  });

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as OrderOptions);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen w-full px-4 md:px-8">
      <NotificationFilter
        filter={filter}
        setFilter={setFilter}
        orderBy={orderBy}
        onOrderChange={handleOrderChange}
      />
      <NotificationList
        notifications={paginatedNotifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
      <Pagination
        paginationRange={paginationRange}
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        onPageChange={onPageChange}
      />
    </div>
  );
};

const getFilteredNotifications = (
  notifications: NotificationType[],
  filter: FilterOptions
) => {
  return notifications.filter((n) =>
    filter === FilterOptions.All ? true : !n.read
  );
};

const sortNotifications = (
  notifications: NotificationType[],
  orderBy: OrderOptions
) => {
  return [...notifications].sort((a, b) => {
    const dateA = new Date(Number(a.createdAt)).getTime();
    const dateB = new Date(Number(b.createdAt)).getTime();
    return orderBy === OrderOptions.Recent ? dateB - dateA : dateA - dateB;
  });
};

// Notification Filter component
const NotificationFilter: React.FC<{
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
  orderBy: OrderOptions;
  onOrderChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ filter, setFilter, orderBy, onOrderChange }) => (
  <div className="flex mt-10 space-x-6 mb-10 items-center ">
    <div className="flex">
      <button
        className={`rounded-s-md w-20 py-2 px-4 border transition-colors ${
          filter === FilterOptions.All
            ? "bg-primary text-white dark:bg-[#56C870] dark:text-white"
            : "bg-white text-primary dark:bg-white dark:text-primary"
        }`}
        onClick={() => setFilter(FilterOptions.All)}
      >
        All
      </button>
      <button
        className={`rounded-e-md w-20 py-2 px-4 transition-colors ${
          filter === FilterOptions.Unread
            ? "text-white bg-primary dark:bg-[#56C870] dark:text-white"
            : "bg-white text-primary dark:bg-white dark:text-primary"
        }`}
        onClick={() => setFilter(FilterOptions.Unread)}
      >
        Unread
      </button>
    </div>
    <div className="ml-8 flex flex-row gap-2 items-center">
      <span className="text-primary mr-3 dark:text-white">OrderBy:</span>
      <SelectField
        value={orderBy}
        onChange={onOrderChange}
        options={[
          { value: OrderOptions.Recent, label: "Most Recent" },
          { value: OrderOptions.Oldest, label: "Oldest" },
        ]}
        className="rounded py-2 px-4 bg-primary dark:bg-[#56C870] text-white focus:outline-none cursor-pointer"
      />
    </div>
  </div>
);

const NotificationList: React.FC<{
  notifications: NotificationType[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ notifications, onMarkAsRead, onDelete }) => (
  <div className="space-y-4">
    {notifications.length ? (
      notifications.map((notification) => (
        <Notification
          key={notification._id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))
    ) : (
      <p className="text-primary dark:text-white text-center">
        No notifications available.
      </p>
    )}
  </div>
);

// Pagination component
const Pagination: React.FC<{
  paginationRange: (number | string)[] | undefined;
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
}> = ({ paginationRange, currentPage, onPageChange }) => {
  if (paginationRange && paginationRange.length < 2) return null;

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  return (
    <ul className="flex list-none space-x-2 justify-center mt-8 items-center">
      <li>
        <button
          className="bg-primary dark:bg-[#56C870] text-white px-3 py-2 rounded-md "
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          <icons.AiOutlineArrowLeft />
        </button>
      </li>
      {paginationRange?.map((pageNumber, idx) =>
        pageNumber === DOTS ? (
          <li key={idx} className="text-gray-500 px-2 py-1">
            {DOTS}
          </li>
        ) : (
          <li key={idx}>
            <button
              className={`${
                pageNumber === currentPage
                  ? "bg-primary dark:bg-[#56C870] text-white"
                  : "bg-white text-primary"
              } px-3 py-1 rounded-md`}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </button>
          </li>
        )
      )}
      <li>
        <button
          className="bg-primary dark:bg-[#56C870] text-white px-3 py-2 rounded-md"
          disabled={
            currentPage === paginationRange?.[paginationRange.length - 1]
          }
          onClick={onNext}
        >
          <icons.AiOutlineArrowRight />
        </button>
      </li>
    </ul>
  );
};

export default AdminNotification;
