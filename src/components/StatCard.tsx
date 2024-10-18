import React from "react";
import { useTheme } from "../hooks/darkmode";

interface StatCardProps {
  icon: JSX.Element;
  title: string;
  count: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, count }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center ${
        theme ? "bg-gray-200 border-gray-300" : "bg-[#374151] border-white-500"
      }`}
    >
      {icon}
      <h3 className={`${theme ? "text-black" : "text-white"} mt-4`}>{title}</h3>
      <span className={`${theme ? "text-black" : "text-white"} text-4xl mt-2`}>{count}</span>
    </div>
  );
};

export default StatCard;
