export const ApplicantsSkeleton = () => {
  return (
     <div className="space-y-4 mx-10 px-4 ml-4 bg-white dark:bg-dark-bg shadow-lg py-8 rounded-md w-[90%] mx-auto">
     <div className="w-[95%] ml-8 mb-4 animate-pulse flex items-center space-x-4">
        <div className="bg-gray-600 h-8 rounded w-1/6"></div>
        <div className="bg-gray-600 h-8 rounded w-1/6"></div>
        <div className="bg-gray-600 h-8 rounded w-4/6"></div>
     </div>
     <div className="ml-8 bg-gray-600 h-10 rounded w-[95%]"></div>
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="animate-pulse flex items-center space-x-8 px-4 ml-4">
            <div className="bg-gray-600 h-6 rounded w-1/4 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-6 rounded w-1/4 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-6 rounded w-1/4 md:w-1/6 lg:w-1/4"></div>
            <div className="bg-gray-600 h-6 rounded w-1/4 md:w-1/8 lg:w-1/4"></div>
            <div className="bg-gray-600 h-6 rounded w-1/4 md:w-1/8 lg:w-1/4"></div>
          </div>
        ))}
    </div>
  );
};