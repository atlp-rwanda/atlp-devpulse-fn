import React from 'react';

export const LoadingSkeleton = ({ filterStages, rows }) => {
    return (
      <tbody>
        {Array.from({ length: rows }).map((_, index) => (
          <tr key={index} className="animate-pulse">
            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
              <div className="flex">
                <div className="w-full h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
              <div className="flex items-center">
                <div className="w-full h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </td>
            <td className="px-5  py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
              <div className="inline-block w-20 h-5  px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
              <div className="inline-block w-20 h-5  px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
              <div className="inline-block w-20 h-5  px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </td>
            {filterStages === "Technical Assessment" || filterStages === "Interview Assessment" ? (
              <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                <div className="inline-block w-20 h-5 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </td>
            ) : null}
            { filterStages === "Shortlisted" || filterStages === true ?
            (<td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
              <div className="flex justify-center gap-2">
                <div className="w-2 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </td>): null
            }
            {filterStages === "Technical Assessment" || filterStages === "Interview Assessment" ? (
              <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                <div className="flex justify-center">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    );
  };
  

export default LoadingSkeleton;
