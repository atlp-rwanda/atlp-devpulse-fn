import React from "react";
import { useState, useEffect } from "react";
import NavBar from "components/sidebar/navHeader";
import { getTraineeApplicant } from "../../redux/actions/TraineeAction";
import { getTraineeAttendance } from "../../redux/actions/attendanceAction";
import { getTraineePerformance } from "../../redux/actions/performanceAction";
import { getTraineeByUserId } from "../../redux/actions/TraineeAction";
import { getCohort } from "../../redux/actions/cohortActions";
import { useDispatch, useSelector } from "react-redux";

const calendar: string = require("../../assets/assets/calendar.svg").default;
const collaboration: string =
  require("../../assets/assets/collaborative-learning.svg").default;
const performanceIcon: string =
  require("../../assets/assets/performance.svg").default;
const strategy: string = require("../../assets/assets/strategy.svg").default;

const DashboardCard = ({ title, value, img }) => {
  return (
    <>
      <div className="bg-gray-300 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-[#DFE3E8] min-w-[260px]  ">
        <div className="flex items-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mr-3">
            <img src={img} alt={title} />
          </div>
          <div>
            <h2 className="text-gray-600 dark:text-gray-300 text-lg font-medium">{title}</h2>
            <p className="text-gray-900 dark:text-white text-2xl font-bold">{value}</p>
          </div>
        </div>
        {/* <div
          className={`text-sm font-medium ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
          <p className="text-gray-400 text-xs">For this year</p>
        </div> */}
      </div>
    </>
  );
};

const ApplicantDashboard = (props: any) => {
  const dispatch = useDispatch();

  const traineeId = useSelector(
    (state: any) => state.traineeApplicant.currentTrainee
  );
  
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

  const cohortData = cohort?.traineeCohort || {};
  const extractCohortNumber = (cohortTitle: string) => {
    if (!cohortTitle) return "N/A";
    const match = cohortTitle.match(/\d+/);
    return match ? match[0] : "N/A";
  };

  const formatPercentage = (value: number | string | undefined): string => {
    if (typeof value === 'number') {
      return `${value}%`;
    }
    return 'N/A';
  };

  const calculateAttendancePercentage = (ratio: string | undefined): string => {
    if (!ratio) return 'N/A';
    const [attended, total] = ratio.split('/').map(Number);
    if (isNaN(attended) || isNaN(total) || total === 0) return 'N/A';
    return formatPercentage(attended / total * 100);
  };

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
      <div className="bg-white dark:bg-[#374151] w-full h-screen p-8">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDashboard;
