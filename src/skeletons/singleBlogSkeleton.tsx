const SingleBlogSkeleton = () => {
  return (
    <div className="animate-pulse min-h-screen pt-8 w-full dark:bg-slate-900 text-white p-6">
      <div className="flex my-4 flex-row items-end justify-start gap-0 w-full">
          <div className="w-2/5 flex items-center">
            <div className="w-80 h-80 bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
          </div>
          <div className="w-3/5">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 mb-4 rounded w-1/3"></div>
            <div className="h-16 bg-slate-200 dark:bg-slate-800 mb-2 rounded w-2/3"></div>
            <div className="mt-4 px-2 flex gap-4 items-center rounded w-2/3 py-4 bg-slate-200 dark:bg-slate-800">
              <div className="h-10 w-10 bg-slate-300 dark:g-slate-700 rounded-full"></div>
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
              </div>
            </div>
          </div>
      </div>
      
      <div className="w-[80%] space-y-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded px-4 py-1 w-16"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded px-4 py-1 w-20"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded px-4 py-1 w-24"></div>
      </div>
      <div className="flex flex-row mt-4 gap-2">
        <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="w-32 h-32bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-slate-200 dark:bg-slate-800 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                <div className="flex flex-col space-y-1">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                </div>
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              <div className="flex items-center gap-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogSkeleton;
