import React, { PureComponent } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
//   const data = [
//     { name: "1", uv: 1.45, amt: 1.78 },
//     { name: "2", uv: 0.67, amt: 1.29 },
//     { name: "3", uv: 1.93, amt: 0.55 },
//     { name: "4", uv: 1.12, amt: 1.68 },
//     { name: "5", uv: 0.45, amt: 1.82 },
//     { name: "6", uv: 1.85, amt: 0.94 },
//     { name: "7", uv: 0.97, amt: 1.15 },
//     { name: "8", uv: 1.33, amt: 1.78 },
//     { name: "9", uv: 0.56, amt: 1.47 },
//     { name: "10", uv: 1.74, amt: 0.88 },
//     { name: "11", uv: 0.39, amt: 1.9 },
//     { name: "12", uv: 1.52, amt: 0.67 },
//     { name: "13", uv: 0.77, amt: 1.34 },
//     { name: "14", uv: 1.89, amt: 0.42 },
//     { name: "15", uv: 0.63, amt: 1.81 },
//     { name: "16", uv: 1.18, amt: 0.95 },
//     { name: "17", uv: 0.84, amt: 1.5 },
//   ];
  const ApplicantChart = ({ performance }) => {
    
    const transformPerformanceData = (performanceData) => {
        if (!performanceData?.performances) return [];
        
        const sortedPerformances = [...performanceData.performances].sort(
            (a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime()
          );
          
          
          return sortedPerformances.map((performance) => ({
            name: new Date(performance.date).toLocaleDateString(),
            score: performance.score || 0,
          }));
      };
    
      const chartData = transformPerformanceData(performance);
      return (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "white" }} // Horizontal numbers in white
              label={{
                value: "Sprints",
                position: "insideBottom",
                fill: "white",
              }} // X-axis label
            />
            <YAxis
              domain={[0, 2]}
              ticks={[0, 1, 2]}
              tick={{ fill: "white" }} // Vertical numbers in white
              label={{
                value: "Performance",
                angle: -90,
                position: "insideLeft",
                fill: "white",
              }} // Y-axis label
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#56C870"
              strokeWidth={2}
              fill="rgba(86, 200, 112, 0.1)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
  