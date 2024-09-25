import React from "react";
import { DownloadPdf } from "../../utils/DownloadPdf";


const DecisionSection: React.FC<{ traineeDetails: any }> = ({
  traineeDetails,
}) => {
  const getStatusButton = () => {
    const decision = traineeDetails.interview_decision;
    if (decision === "Passed" || decision === "Approved") {
      return (
        <span className="btn-Aprov h-11 bg-[#56C870] hover:bg-[#67dc82] dark:hover:bg-[#1f544cef] text-white font-bold py-3 px-5 rounded mt-7 mr-4 dark:bg-[#56C870]">
          Passed
        </span>
      );
    } else if (decision === "Failed" || decision === "Rejected") {
      return (
        <span className="btn-Aprov h-11 bg-red-800 hover:text-white hover:bg-red-500 text-white font-bold mt-7 py-3 px-5 rounded">
          Failed
        </span>
      );
    } else {
      return (
        <span className="btn-Aprov h-11 bg-gray-400 text-white font-bold mt-7py-3 px-5 rounded">
          No Decision
        </span>
      );
    }
  };

  return (
    <div className="w-full py-7 flex  flex-col mx-16 bg-slate-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl lg:flex lg:max-w-3xl dark:bg-[#192432] dark:text-white">
      <h2 className="font-bold text-lg text-[#56C870] top-5 ml-5 mt-[-10px] pb-2 uppercase">
        Status
      </h2>
      <div className="h-16 flex pl-6  items-center mt-[-8px] gap-5">
        <div>{getStatusButton()}</div>
        <button
          onClick={() => DownloadPdf()}
          className="btn-Aprov h-11 bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white font-bold py-2 px-2 rounded dark:bg-blue-700"
        >
          Download PDF
        </button>
        <button className="btn-Aprov h-11 bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 text-white font-bold py-2 px-8 rounded dark:bg-blue-500">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${traineeDetails?.trainee_id?.email}&su=Your%20ATLP%20Application%20Email&body=Dear%20${traineeDetails?.trainee_id?.lastName} ${traineeDetails?.trainee_id?.firstName},`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
        </button>
      </div>
    </div>
  );
};

export default DecisionSection;
