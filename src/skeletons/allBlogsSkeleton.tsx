import React from 'react';

const AllBlogsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen w-full dark:bg-slate-900 text-white px-2 py-4">
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-lg animate-pulse"
          >
            <div className="h-28 w-28 bg-slate-300 dark:bg-slate-700 rounded-md"></div>
            <div className="flex-grow">
              <div className="h-5 w-3/5 bg-slate-300 dark:bg-slate-700 rounded-md mb-2"></div>
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded-md mb-1"></div>
              <div className="h-4 w-4/5 :darkbg-slate-700 rounded-md"></div>
            </div>
            <div className="w-1/6 flex flex-col items-end">
              <div className="h-4 w-2/3 bg-slate-300 dark:bg-slate-700 rounded-md mb-1"></div>
              <div className="h-4 w-1/2 bg-slate-300 dark:bg-slate-700 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogsSkeleton;
