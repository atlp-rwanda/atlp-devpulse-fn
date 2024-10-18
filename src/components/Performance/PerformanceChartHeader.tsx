import React from "react";

interface PerformanceChartHeaderProps {
  theme: boolean;
  currentDate: string;
}

const PerformanceChartHeader: React.FC<PerformanceChartHeaderProps> = ({
  theme,
  currentDate,
}) => (
  <>
    <h2 className={`${theme ? "text-black" : "text-white"} text-lg mb-2 ml-11`}>
      Overall performance
    </h2>
    <p
      className={`${
        theme ? "text-gray-800" : "text-gray-400"
      } text-sm mb-4 ml-11`}
    >
      as of {currentDate}
    </p>
    <p className={`${theme ? "text-black" : "text-white"} text-sm ml-11`}>
      Overall performance
    </p>
  </>
);

export default PerformanceChartHeader;
