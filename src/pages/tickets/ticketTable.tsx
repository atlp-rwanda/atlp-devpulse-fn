import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

const TicketTable = ({
    columns,
    data,
    actionLinks,
    onActionToggle,
    actionsList,
    emptyMessage = "No data",
  }) => {
    const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item);
    }

    // Handle nested properties using split and reduce
    const keys = column.key.split('.');
    const value = keys.reduce((obj, key) => obj?.[key], item);
    
    if (column.key === 'updatedAt' && value) {
      return new Date(parseInt(value)).toLocaleDateString();
    }
    
    return value || '-';
  };

  return (
    <table className="min-w-full leading-normal">
      <thead className="w-full px-32 sticky top-0">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className={`px-5 py-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider ${
                column.className || ''
              }`}
            >
              {column.header}
            </th>
          ))}
          {actionLinks && (
            <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
              Action
            </th>
          )}
        </tr>
      </thead>
      <tbody className="overflow-y-auto">
        {data && data.length > 0 ? (
          data.map((item) => (
            <tr
              key={item.id}
              className="dark:hover:bg-slate-700 hover:bg-slate-300 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.key}`}
                  className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm"
                >
                  <div className="flex items-center">
                    <div className="">
                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                        {renderCell(item, column)}
                      </p>
                    </div>
                  </div>
                </td>
              ))}
              {actionLinks && (
                <td>
                  <div>
                    <HiDotsVertical
                      size={16}
                      onClick={(e) => {
                        e.preventDefault();
                        onActionToggle?.(item.id);
                      }}
                      className="text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer"
                    />
                    <div
                      className={`${
                        actionsList === item.id ? 'block' : 'hidden'
                      } absolute bg-white dark:bg-dark-tertiary dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                    >
                      <ul className="py-1" aria-labelledby="dropdown">
                        {actionLinks.map((link, index) => (
                          <li key={index}>
                            <Link
                              to={`${link.to.replace('{id}', item.id)}`}
                              className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white block px-4 py-2"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td></td>
            <td className="float-right text-fb p-5 font-normal text-stone-500 dark:text-stone-400">
              {emptyMessage}
            </td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TicketTable;