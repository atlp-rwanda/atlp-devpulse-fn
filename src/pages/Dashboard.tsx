import React, { useEffect } from "react";
import NavBar from "../components/sidebar/navHeader";
import StatCard from "../components/StatCard";
import PerformanceChart from "../components/Performance/PerformanceChart";
import {
  CoordinatorIcon,
  PerformanceIcon,
  TraineeIcon,
  CohortIcon,
} from "../components/iconss/SvgIcons";
import { useDashboardData } from "../hooks/useDashboardData";
import { useTheme } from "../hooks/darkmode";


const Dashboard = () => {

    const {
      traineeCount,
      cohortCount,
      coordinatorCount,
      programCount,
      performanceData,
      averagePerformance,
      currentDate,
    } = useDashboardData();
    const { theme, setTheme } = useTheme();
    useEffect(() => {
      if (theme) {
        document.body.classList.add("light-mode");
      } else {
        document.body.classList.remove("light-mode");
      }
    }, [theme]);
  
  return (
    <>
      <div
        className={`${
          theme ? "bg-white text-black" : "bg-[#262E3D] text-white"
        } w-full h-screen p-8`}
      >
        <h1 className="text-center text-3xl font-bold text-white">
          ADMIN DASHBOARD
        </h1>

        <div
          className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 ${
            theme ? "bg-gray-100" : "bg-[#374151]"
          } p-6 rounded-3xl`}
        >
          <StatCard
            icon={<CoordinatorIcon />}
            title="All coordinators"
            count={coordinatorCount}
          />
          <StatCard
            icon={<TraineeIcon />}
            title="All trainees"
            count={traineeCount}
          />
          <StatCard icon={<CohortIcon />} title="Cohorts" count={cohortCount} />
          <StatCard
            icon={<PerformanceIcon />}
            title="Performance"
            count={averagePerformance.toFixed(2)}
          />
        </div>

        <PerformanceChart data={performanceData} currentDate={currentDate} />
      </div>
    </>
  );

};

export default Dashboard;
