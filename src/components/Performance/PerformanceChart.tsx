import React from "react";
import { useTheme } from "../../hooks/darkmode";
import PerformanceChartHeader from "./PerformanceChartHeader";
import PerformanceChartGraph from "./PerformanceChartGraph";

interface PerformanceChartProps {
  data: { name: string; performance: number }[];
  currentDate: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  currentDate,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 rounded-lg mt-8 border-2 ${
        theme ? "bg-gray-100 border-gray-300" : "bg-[#1F2A37] border-white-500"
      }`}
    >
      <PerformanceChartHeader theme={theme} currentDate={currentDate} />
      <div className="mt-6">
        <PerformanceChartGraph data={data} theme={theme} />
      </div>
    </div>
  );
};

export default PerformanceChart;
