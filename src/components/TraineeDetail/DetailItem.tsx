import React from "react";

interface DetailItemProps {
  title: string;
  value: string | number | boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ title, value }) => {
  return (
    <div className="w-72 bg-slate-300 pl-2 py-2 mb-3 rounded-md dark:bg-gray-800 dark:text-white">
      <h3 className="pb-1">{title}</h3>
      <p className="text-gray-500 text-sm dark:text-gray-400">
        {String(value)}
      </p>
    </div>
  );
};

export default DetailItem;
