import React from "react";
import NavBar from "components/sidebar/navHeader";
const calendar: string = require("../../assets/assets/calendar.svg").default;
const collaboration: string =
  require("../../assets/assets/collaborative-learning.svg").default;
const performance: string = require("../../assets/assets/performance.svg").default;
const strategy: string = require("../../assets/assets/strategy.svg").default;

const DashboardCard = ({ title, value, change, img }) => {
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
        <div
          className={`text-sm font-medium ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
          {/* <p className="text-gray-400 text-xs">For this year</p> */}
        </div>
      </div>
    </>
  );
};

const ApplicantDashboard = () => {
  return (
    <>
      <div className="bg-[#374151] w-full h-screen p-8">
        <div>
          <div className="mt-6">
            <div>
              <div className="flex flex-wrap gap-4">
                <DashboardCard
                  title="Cohort"
                  value="5"
                  change={-5}
                  img={collaboration}
                />
                <DashboardCard
                  title="Current Phase"
                  value="2"
                  change={20}
                  img={strategy}
                />
                <DashboardCard
                  title="Performance"
                  value="3"
                  change={-10}
                  img={performance}
                />
                <DashboardCard
                  title="Attendance"
                  value="2"
                  change={15}
                  img={calendar}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantDashboard;