export const CohortDetailSkeleton = () => {
  return (
    <div className="space-y-6 bg-white dark:bg-dark-bg shadow-lg py-8 rounded-md w-[90%] mx-auto">
      {/* Title */}
      <div className="h-8 bg-gray-600 rounded w-1/4 ml-4 mb-4"></div>

      {/* Information Section */}
      <div className="bg-gray-200 dark:bg-dark-tertiary rounded-lg w-[50%] ml-4 p-6 space-y-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex justify-between  bg-gray-600 h-6 rounded w-[60%] px-4"
            ></div>
          ))}
      </div>

      {/* Trainees Section */}
      <div className="w-[70%] ml-4 mt-8">
        <div className="flex justify-between items-center pb-5">
          <div className="bg-gray-600 h-8 rounded w-1/4"></div>
          <div className="bg-gray-600 h-10 rounded w-1/6"></div>
        </div>
        <div className="space-y-3">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between space-x-4 bg-gray-600 h-8 rounded w-full"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};
