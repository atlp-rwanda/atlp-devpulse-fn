export const ApplicationsSkeleton = () => {
  return (
    <div className="space-y-4 mt-0 mx-10 bg-white dark:bg-dark-bg shadow-lg py-8 rounded-md w-[97%] mx-auto">
      <div className="h-12 flex items-center gap-4 rounded w-[98%] mb-2 px-4 ml-4">
        <div className="bg-gray-600 h-10 rounded w-[20%] mb-2 space-x-4 px-4"></div>
        <div className="bg-gray-600 h-10 rounded w-[10%] mb-2 space-x-4 px-4"></div>
        <div className="bg-gray-600 h-10 rounded w-[70%] mb-2 space-x-4 px-4"></div>
       </div>
      <div className="bg-gray-600 h-12 rounded w-[95%] mb-2 space-x-8 px-4 ml-8"></div>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="animate-pulse flex items-center space-x-8 px-4 ml-4">
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/4"></div>
          </div>
        ))}
    </div>
  );
};
