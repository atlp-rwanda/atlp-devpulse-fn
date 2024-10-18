import React from "react";
import {
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

interface PerformanceChartGraphProps {
  data: { name: string; performance: number }[];
  theme: boolean;
}

const PerformanceChartGraph: React.FC<PerformanceChartGraphProps> = ({
  data,
  theme,
}) => (
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={data}>
      <CartesianGrid vertical={false} stroke={theme ? "#ccc" : "#374151"} />
      <XAxis
        dataKey="name"
        tick={{ fill: theme ? "black" : "white" }}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        domain={[0, 2]}
        ticks={[1, 2]}
        tick={{ fill: theme ? "black" : "white" }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="performance"
        stroke="#56C870"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="1%"
            stopColor={theme ? "#F5F5F5" : "#243A3D"}
            stopOpacity={1}
          />
          <stop
            offset="99%"
            stopColor={theme ? "#F5F5F5" : "#243A3D"}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <Line
        type="monotone"
        dataKey="performance"
        stroke="#56C870"
        strokeWidth={4}
        dot={false}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default PerformanceChartGraph;
