/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ViewSingleApplication, fetchApplications, updateApplicationStatus } from "../../redux/actions/adminListApplications";
import toast, { Toaster } from "react-hot-toast";
import WarningModal from '../../components/application/WarningModal'

type Status = {
  defaultStatus: string;
  scope: string[];
};

interface ApplicationData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  availability_for_interview: string;
  gender: string;
  resume: string;
  comments: string;
  address: string;
  status: string;
  formUrl: string;
  dateOfSubmission: string;
  associatedFormData: JobPost;
}

type JobPost = {
  _id: string;
  title: string;
  description: string;
  link: string;
  jobpost: AllJobPost;
};

type AllJobPost = {
  cohort: Cohort;
  cycle: Cycle;
  program: Programs;
  description: string;
  label: string;
  link: string;
  title: string;
};

type Cohort = {
  end: string;
  id: string;
  title: string;
  start: string;
};

type Cycle = {
  id: string;
  endDate: string;
  name: string;
  startDate: string;
};

type Programs = {
  _id: string;
  title: string;
  description: string;
  mainObjective: string;
  modeOfExecution: string;
  duration: string;
  requirements: string[];
};

const ApplicationDetails = () => {
  const params = useParams();
  const [statusScope, setStatusScope] = useState<Status | undefined>(undefined);
  const [status, setStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [singleApplication, setSingleApplication] = useState<ApplicationData | undefined>(undefined);
  const [filteredStatusOptions, setFilteredStatusOptions] = useState<string[]>([]);
  const [applications, setApplications]: any = useState();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusChange = [
    {
      defaultStatus: "submitted",
      scope: ["Shortlisted", "Rejected"],
    },
    {
      defaultStatus: "Shortlisted",
      scope: ["English assessment", "Rejected"],
    },
    {
      defaultStatus: "English assessment",
      scope: ["Technical assessment", "Missed English assessment", "Rejected"],
    },
    {
      defaultStatus: "Technical assessment",
      scope: ["Done Technical assessment", "Rejected"],  
    },
    {
      defaultStatus: "Done Technical assessment",
      scope: ["Invited for Home Challenge", "Rejected"],
    },
    {
      defaultStatus: "Invited for Home Challenge",
      scope: [ "Done Home Challenge", "Rejected"],
    },
    {
      defaultStatus: "Done Home Challenge",
      scope: ["Invited for Interview", "Rejected"],
    },
    {
      defaultStatus: "Invited for Interview",
      scope: ["Accepted",  "Rejected"],
    },
    {
      defaultStatus: "Rejected",
      scope: [],
    },
    {
      defaultStatus: "Missed English assessment",
      scope: ["Rejected"],
    }
    
  ];

  useEffect(() => {
    const fetchData = async () => {
      const applicationsData = await fetchApplications();
      setApplications(applicationsData);
      
      const singleAppData = await ViewSingleApplication(params.appId);
      setSingleApplication(singleAppData);
    };
    
    fetchData();
  }, [params.appId]);

  useEffect(() => {
    if (singleApplication) {
      const matchedStatusChange = statusChange.find(change => change.defaultStatus === singleApplication?.status);
      setStatusScope(matchedStatusChange || undefined);
    }
  }, [singleApplication]);

  useEffect(() => {
    if (statusScope) {
      setFilteredStatusOptions(statusScope.scope);
    }
    setCurrentStatus(singleApplication?.status || "");
  }, [statusScope, singleApplication]);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;

    if (selectedStatus === "Rejected") {
      setShowRejectModal(true);
      setSelectedStatus(selectedStatus);
    } else {
      await updateStatus(selectedStatus);
    }
  };

  const updateStatus = async (status: string) => {
    setStatus(status);
    setCurrentStatus(status);
    await toast.promise(
      updateApplicationStatus(status, singleApplication?._id),
      {
        loading: "Updating status...",
        success: "Status updated successfully!",
        error: "Failed to update status.",
      }
    );
    const selectedStatusChange = statusChange.find(change => change.defaultStatus === status);
    setFilteredStatusOptions(selectedStatusChange?.scope || []);
  };

  const confirmRejection = async () => {
    setShowRejectModal(false);
    await updateStatus("Rejected");
  };

  const cancelRejection = () => {
    setShowRejectModal(false);
  };

  return (
    <>
      <div className="flex flex-col items-center dark:bg-dark-frame-bg min-h-screen">
        <div className="w-full max-w-6xl mt-10 p-6">
          {singleApplication && (
            <div className="bg-white dark:bg-dark-bg shadow-lg rounded-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="uppercase text-gray-800 dark:text-white font-bold">Candidate Information</h3>
                  <p className="text-gray-500 dark:text-gray-300"> <span className="font-medium"> Address:</span> {singleApplication?.address}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium"> First Name: </span> {singleApplication?.firstName}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Last Name:</span> {singleApplication?.lastName}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Email: </span> {singleApplication?.email}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Phone Number:</span> {singleApplication?.telephone}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Gender: </span> {singleApplication?.gender}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Date of Submission:</span> {singleApplication?.dateOfSubmission}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Available for Interview:</span> {singleApplication?.availability_for_interview}</p>
                  <p className="text-gray-500 dark:text-gray-300 font-medium"> Resume:{" "}<a href={singleApplication?.resume} target="_blank" rel="noreferrer noopener" className="text-blue-500 font-normal hover:underline"> View Resume </a> </p>
                  <p className="text-gray-500 pt-2 dark:text-gray-300"><span className="font-medium">Status:</span>  {currentStatus}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="uppercase text-gray-800 dark:text-white font-bold">Form Information</h3>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Title:</span> {singleApplication?.associatedFormData.title}</p>
                  <a href={singleApplication?.associatedFormData.link} target="_blank" rel="noreferrer noopener" className="text-blue-500 mt-2 hover:underline">View Form</a>
                </div>
                <div className="space-y-4">
                  <h3 className="uppercase text-gray-800 dark:text-white font-bold">Job Post</h3>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Title:  </span> {singleApplication?.associatedFormData.jobpost.title}</p>
                </div>
              </div>
            </div>
          )}

       <div className="mt-8 flex justify-between gap-8 items-center">           
       <select name="" id=""  value={status}  onChange={handleStatusChange}
              className="bg-[#10292C] flex items-center text-white justify-center dark:bg-white hover:bg-[#1f544cef] dark:text-zinc-700 font-bold py-2 px-4 rounded" >
              <option value="">Update status</option>
              {filteredStatusOptions.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
      </select>     
      <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md mt-2"> Soft Delete </button>
          </div>
        </div>
      </div>

      <WarningModal isOpen={showRejectModal} message="Are you sure you want to reject this application? This action is irreversible." onConfirm={confirmRejection} onCancel={cancelRejection} />

      <Toaster position="top-center" />
    </>
  );
};

export default ApplicationDetails;