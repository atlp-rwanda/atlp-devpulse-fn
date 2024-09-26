import React from "react";
import { DownloadPdf } from "../../utils/DownloadPdf";

interface TraineeDetails {
  interview_decision: string;
  trainee_id: {
    email: string;
    lastName: string;
    firstName: string;
  };
}

interface DecisionButtonProps {
  decision: string;
}

const getDecisionDetails = (decision: string) => {
  switch (decision) {
    case "Passed":
    case "Approved":
      return {
        text: "Passed",
        style: "bg-[#56C870] hover:bg-[#67dc82] dark:hover:bg-[#1f544cef] dark:bg-[#56C870]",
      };
    case "Failed":
    case "Rejected":
      return {
        text: "Failed",
        style: "bg-red-800 hover:bg-red-500",
      };
    default:
      return {
        text: "No Decision",
        style: "bg-gray-400",
      };
  }
};

const DecisionButton: React.FC<DecisionButtonProps> = ({ decision }) => {
  const { text, style } = getDecisionDetails(decision);

  return (
    <span className={`btn-Aprov h-11 ${style} text-white font-bold py-3 px-5 rounded`}>
      {text}
    </span>
  );
};

const DecisionSection: React.FC<{ traineeDetails: TraineeDetails }> = ({ traineeDetails }) => {
  const { interview_decision, trainee_id } = traineeDetails;

  return (
    <div className="w-full py-7 flex flex-col mx-16 bg-slate-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl lg:flex lg:max-w-3xl dark:bg-[#192432] dark:text-white">
      <h2 className="font-bold text-lg text-[#56C870] top-5 ml-5 mt-[-10px] pb-2 uppercase">
        Status
      </h2>
      <div className="h-16 flex pl-6 items-center gap-5">
        <DecisionButton decision={interview_decision} />
        <button
          onClick={() => DownloadPdf()}
          className="btn-Aprov h-11 bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white font-bold py-2 px-2 rounded dark:bg-blue-700"
        >
          Download PDF
        </button>
        <button className="btn-Aprov h-11 bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 text-white font-bold py-2 px-8 rounded dark:bg-blue-500">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${trainee_id?.email}&su=Your%20ATLP%20Application%20Email&body=Dear%20${trainee_id?.lastName} ${trainee_id?.firstName},`}
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