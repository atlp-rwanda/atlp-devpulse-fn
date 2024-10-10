export const JobPostSkeleton = () => {
  return (
    <div className="space-y-4 mx-10 bg-white dark:bg-dark-bg shadow-lg py-8 rounded-md w-[90%] mx-auto">
      <div className="bg-gray-600 h-12 rounded w-[95%] mb-2 space-x-8 px-4 ml-8"></div>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="animate-pulse flex items-center space-x-8 px-4 ml-4">
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/5"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/5"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/5"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/8 lg:w-1/5"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/8 lg:w-1/5"></div>
          </div>
        ))}
    </div>
  );
};
