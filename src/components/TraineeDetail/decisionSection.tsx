import React, { useState } from "react";
import { DownloadPdf } from "../../utils/DownloadPdf";
import { TiExportOutline } from "react-icons/ti";
import { AiFillCaretDown } from "react-icons/ai";
import { CSVLink } from "react-csv"; // Import CSVLink
import { Link } from "lucide-react";

interface TraineeDetails {
  interview_decision: string;
  trainee_id: {
    email: string;
    lastName: string;
    firstName: string;
  };
  gender: string;
  Address: string;
  phone: string;
  field_of_study: string;
  education_level: string;
  province: string;
  district: string;
  sector: string;
  isEmployed: boolean;
  haveLaptop: boolean;
  isStudent: boolean;
  Hackerrank_score: any;
  english_score: any;
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


const createCSVData = (traineeDetails: TraineeDetails) => {
  const { interview_decision, trainee_id, gender, Address, phone, field_of_study, education_level, province, district, sector, isEmployed, haveLaptop, isStudent, Hackerrank_score, english_score } = traineeDetails;
  const { email, firstName, lastName } = trainee_id;


  console.log(phone)
  return [
    [
      "First Name",
      "Last Name",
      "Email",
      "Gender",
      "Address",
      "Phone",
      "Field of Study",
      "Education Level",
      "Province",
      "District",
      "Sector",
      "Is Employed",
      "Have Laptop",
      "Is Student",
      "Hackerrank Score",
      "English Score",
      "Interview Decision",
    ],
    [
      firstName,
      lastName,
      email,
      gender,
      Address,
      phone,
      field_of_study,
      education_level,
      province,
      district,
      sector,
      isEmployed ? "Yes" : "No", 
      haveLaptop ? "Yes" : "No", 
      isStudent ? "Yes" : "No",   
      Hackerrank_score ?? "N/A",
      english_score ?? "N/A",  
      interview_decision ?? "N/A",
    ],
  ];
};


const DecisionSection: React.FC<{ traineeDetails: TraineeDetails }> = ({ traineeDetails }) => {
  const { interview_decision, trainee_id } = traineeDetails;
  const [open, setOpen] = useState<boolean>(false);

  const handleDropDown = (state: boolean) => {
    setOpen(!state);
  };

  const csvData = createCSVData(traineeDetails); 

  return (
    <div className="w-full py-7 flex flex-col mx-16 bg-slate-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl lg:flex lg:max-w-3xl dark:bg-[#192432] dark:text-white">
      <h2 className="font-bold text-lg text-[#56C870] top-5 ml-5 mt-[-10px] pb-2 uppercase">
        Status
      </h2>
      <div className="h-16 flex pl-6 items-center gap-5">
        <DecisionButton decision={interview_decision} />
        <button
          onClick={(e) => handleDropDown(open)}
          className="bg-[#56C870] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mr-16"
        >
          <TiExportOutline className="float-left m-1" />
          Export
          <AiFillCaretDown className="float-right m-1" />
          {open && (
            <ul className="font-light text-sm text-white m-1 flex flex-col">
              <button className="hover:bg-[#215a51ef]" onClick={() => DownloadPdf()}>
                PDF
              </button>
              <CSVLink
                data={csvData} 
                filename={"trainee-info.csv"} 
                className="hover:bg-[#215a51ef]"
              >
                CSV
              </CSVLink>
            </ul>
          )}
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
