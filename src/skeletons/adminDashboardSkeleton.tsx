export const AdminDashboardSkeleton = () => {
  return (
    <div className="space-y-4 mx-10 dark:bg-dark-bg shadow-lg mt-8 py-8 rounded-md w-[90%] mx-auto">
          <div className="animate-pulse flex items-center space-x-8 px-4 ml-4">
            <div className="bg-gray-600 h-20 rounded w-1/4 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-20 rounded w-1/4 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-20 rounded w-1/4 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-20 rounded w-1/4 md:w-1/8 lg:w-1/4"></div>
          </div>
         <div className="bg-gray-600 h-80 rounded w-[95%] space-x-8 px-4 mt-8 ml-8 "></div>
    </div>
  );
};
