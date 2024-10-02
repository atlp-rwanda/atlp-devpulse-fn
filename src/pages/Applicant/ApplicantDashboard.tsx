import React from "react";
import { useState, useEffect } from "react";
import NavBar from "components/sidebar/navHeader";
import { getTraineeApplicant } from "../../redux/actions/TraineeAction";
import { getTraineeAttendance } from "../../redux/actions/attendanceAction";
import { getTraineePerformance } from "../../redux/actions/performanceAction";
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
      <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-[#DFE3E8] min-w-[260px]  ">
        <div className="flex items-center">
          <div className="bg-gray-700 p-2 rounded-lg mr-3">
            <img src={img} alt={title} />
          </div>
          <div>
            <h2 className="text-gray-300 text-sm font-medium">{title}</h2>
            <p className="text-white text-2xl font-bold">{value}</p>
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
  const trainee = useSelector((state: any) => state.currentTrainee);
  const attendance = useSelector((state: any) => state.traineeAttendance);
  const performance = useSelector((state: any) => state.traineePerformance);

  useEffect(() => {
    const traineeId = trainee?.id;
    if (traineeId) {
      dispatch(getTraineeApplicant(traineeId));
      dispatch(getTraineeAttendance(traineeId));
      dispatch(getTraineePerformance(traineeId));
    }
  }, [dispatch, trainee?.id]);

  const dashboardData = [
    {
      title: "Cohort",
      value: trainee?.cohort?.title || "N/A",
      img: collaboration,
    },
    {
      title: "Current Phase",
      value: trainee?.cohort?.phase || "N/A",
      img: strategy,
    },
    {
      title: "Performance",
      value: performance?.averageScore?.toFixed(2) || "N/A",
      img: performanceIcon,
    },
    {
      title: "Attendance",
      value: attendance?.attendanceRatio || "N/A",
      img: calendar,
    },
  ];

  return (
    <>
      <div className="bg-[#374151] w-full h-screen p-8">
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
