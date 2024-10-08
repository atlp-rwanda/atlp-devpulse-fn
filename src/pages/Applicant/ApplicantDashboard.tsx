import React from "react";
import { useState, useEffect } from "react";
import NavBar from "components/sidebar/navHeader";
import { getTraineeApplicant } from "../../redux/actions/TraineeAction";
import { getTraineeAttendance } from "../../redux/actions/attendanceAction";
import { getTraineePerformance } from "../../redux/actions/performanceAction";
import { getTraineeByUserId } from "../../redux/actions/TraineeAction";
import { getCohort } from "../../redux/actions/cohortActions";
import { useDispatch, useSelector } from "react-redux";
import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Scatter,
    ComposedChart,
    Label
  } from "recharts";

const calendar: string = require("../../assets/assets/calendar.svg").default;
const collaboration: string =
  require("../../assets/assets/collaborative-learning.svg").default;
const performanceIcon: string =
  require("../../assets/assets/performance.svg").default;
const strategy: string = require("../../assets/assets/strategy.svg").default;

const DashboardCard = ({ title, value, img }) => {
  return (
    <>
      <div className="bg-gray-300 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-[#DFE3E8] flex-1 min-w-[250px] ">
        <div className="flex items-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mr-3">
            <img src={img} alt={title} />
          </div>
          <div>
            <h2 className="text-gray-600 dark:text-gray-300 text-lg font-medium">{title}</h2>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const ApplicantChart = ({ performance }) => {
  const transformPerformanceData = (performanceData) => {
      if (!performanceData?.performances) return [];
      
      const sortedPerformances = [...performanceData.performances].sort((a, b) => {
        return parseInt(a.date) - parseInt(b.date);
      });

        
        return sortedPerformances.map((performance, index) => ({
          name: index + 1,
          score: performance.score || 0,
          
        }));
        
    };
  
    const chartData = transformPerformanceData(performance);

  if (chartData.length === 0) {
    return <div>No performance data available</div>;
  }



  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 20,
        }}
      >
        <XAxis 
          dataKey="name"
          tick={{ fill: "white" }}
        >
          <Label value="Sprints" offset={-10} position="insideBottom" fill="white" />
        </XAxis>
        
        <YAxis
          domain={[0, 100]}
          tick={{ fill: "white" }}
        >
          <Label value="Performance" angle={-90} position="insideLeft" fill="white" />
        </YAxis>
        <Tooltip 
        />
        {chartData.length === 1 ? (
          <Scatter name="Performance" dataKey="score" fill="#56C870" />
        ) : (
          <Area type="monotone" dataKey="score" stroke="#56C870" fill="rgba(86, 200, 112, 0.1)" />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
  }


const useTraineeData = () => {
  const dispatch = useDispatch();
  const traineeId = useSelector((state: any) => state.traineeApplicant.currentTrainee);
  const traineeData = useSelector((state: any) => state.traineeApplicant.data);
  const attendance = useSelector((state: any) => state.traineeAttendance);
  const performance = useSelector((state: any) => state.traineePerformance);
  const cohort = useSelector((state: any) => state.cohorts);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(getTraineeByUserId(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchTraineeData = async () => {
      if (!traineeId) return;
      try {
        await dispatch(getTraineeApplicant(traineeId));
        await dispatch(getTraineeAttendance(traineeId));
        await dispatch(getTraineePerformance(traineeId));
      } catch (err) {
        console.error("Failed to fetch trainee details:", err);
      }
    };
    fetchTraineeData();
  }, [dispatch, traineeId]);

  useEffect(() => {
    const fetchCohortData = async () => {
      if (traineeData && traineeData.cohort) {
        try {
          await dispatch(getCohort(traineeData.cohort));
        } catch (err) {
          console.error("Failed to fetch cohort data:", err);
        }
      }
    };
    fetchCohortData();
  }, [dispatch, traineeData]);

  
  return { traineeData, attendance, performance, cohort };

}

const formatters = {
  extractCohortNumber: (cohortTitle: string): string => {
    if (!cohortTitle) return "N/A";
    const match = cohortTitle.match(/\d+/);
    return match ? match[0] : "N/A";
  },

  formatPercentage: (value: number | string | undefined): string => {
    if (typeof value === 'number') {
      return value % 1 === 0 ? `${value}%` : `${value.toFixed(1)}%`;
    }
    return 'N/A';
  },

  calculateAttendancePercentage: (ratio: string | undefined): string => {
    if (!ratio) return 'N/A';
    const [attended, total] = ratio.split('/').map(Number);
    if (isNaN(attended) || isNaN(total) || total === 0) return 'N/A';
    return formatters.formatPercentage(attended / total * 100);
  }
}

const ApplicantDashboard = (props: any) => {

  const { cohort, performance, attendance } = useTraineeData();
  const cohortData = cohort?.traineeCohort || {};
  const { extractCohortNumber, formatPercentage, calculateAttendancePercentage } = formatters;

  const dashboardData = [
    {
      title: "Cohort",
      value: cohortData.title ? extractCohortNumber(cohortData.title) : "N/A",
      img: collaboration,
    },
    {
      title: "Current Phase",
      value: cohortData.phase || "N/A",
      img: strategy,
    },
    {
      title: "Performance",
      value: formatPercentage(performance?.averageScore),
      img: performanceIcon,
    },
    {
      title: "Attendance",
      value: calculateAttendancePercentage(attendance?.attendanceRatio),
      img: calendar,
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-[#374151] w-full min-h-screen p-8">
        <div>
          <div className="mt-6">
            <div>
              <div className="flex flex-wrap gap-4">
                {dashboardData.map((item, index) => (
                  <DashboardCard
                    key={index}
                    title={item.title}
                    value={item.value}
                    img={item.img}
                  />
                ))}
              </div>
              <div className="w-full border border-slate-200 py-10 px-7 rounded-2xl dark:bg-dark-bg bg-white mt-10">
          <div className="w-full flex flex-col mb-8">
            <h2 className="text-gray-900 dark:text-white font-medium text-xl">
              My overall performance
            </h2>
            <p className="text-gray-900 dark:text-white text-sm">
            As of {new Date().toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      })}
            </p>
          </div>
          <ApplicantChart performance={performance}  />
        </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDashboard;
