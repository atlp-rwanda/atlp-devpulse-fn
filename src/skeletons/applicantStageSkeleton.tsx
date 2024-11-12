import React from 'react';

type props ={
    rows:number
}
export const TableSkeleton:React.FC<props> = ({ rows = 5 }) => {
  return (
    <tbody className='overflow-y-auto'>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="animate-pulse bg-gray-100 dark:bg-dark-tertiary">
          <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary">
            <div className="h-6 w-1/5 md:w-1/6 lg:w-1/4 bg-gray-500 dark:bg-gray-700 rounded"></div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary">
            <div className="h-6 w-1/5 md:w-1/6 lg:w-1/4 bg-gray-500 dark:bg-gray-700 rounded"></div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary">
            <div className="h-6 w-1/5 md:w-1/6 lg:w-1/4 bg-gray-500 dark:bg-gray-700 rounded"></div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary">
            <div className="h-6 w-1/5 md:w-1/6 lg:w-1/4 bg-gray-500 dark:bg-gray-700 rounded"></div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary">
            <div className="h-6 w-1/5 md:w-1/6 lg:w-1/4 bg-gray-500 dark:bg-gray-700 rounded"></div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary">
            <div className="h-6 w-1/5 md:w-1/6 lg:w-1/4 bg-gray-500 dark:bg-gray-700 rounded"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
