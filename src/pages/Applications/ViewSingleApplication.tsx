import React, { useState, useEffect } from "react";
import { BsEnvelope } from "react-icons/bs";
import { TiExportOutline } from "react-icons/ti";
import { FcApproval } from "react-icons/fc";
import { AiFillSetting, AiFillCaretDown } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useParams } from "react-router";
import NavBar from "../../components/sidebar/navHeader";
import { ViewSingleApplication } from "../../redux/actions/adminListApplications";
import { fetchApplications } from "../../redux/actions/adminListApplications";
import { updateApplicationStatus } from "../../redux/actions/adminListApplications";
import toast, { Toaster } from "react-hot-toast";

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
  const [key, setKey] = useState(params.appId);
  const [statusScope, setStatusScope] = useState<Status | undefined>(undefined);
  const [status, setStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [singleApplication, setSingleApplication] = useState<
    ApplicationData | undefined
  >(undefined);
  const [filteredStatusOptions, setFilteredStatusOptions] = useState<string[]>(
    []
  );
  const [applications, setApplications]: any = useState();
  const [isInDanger, setIsInDanger] = useState(true);

  const statusChange = [
    {
      defaultStatus: "submitted",
      scope: ["Reject", "Shortlisted"],
    },
    {
      defaultStatus: "Shortlisted",
      scope: ["English assessment"],
    },
    {
      defaultStatus: "English assessment",
      scope: ["Reject", "Techinical assessment", "Missed English assessment"],
    },

    {
      defaultStatus: "Techinical assessment",
      scope: ["Reject", "Done Techinical assessment", "Missed Techinical assessment"],
    },
    {
      defaultStatus: "Done Techinical assessment",
      scope: ["Invited for Home Challenge"],
    },
    {
      defaultStatus: "Invited for Home Challenge",
      scope: ["Missed Home Challenge", "Reject", "Done Home Challenge"],
    },
    {
      defaultStatus: "Done Home Challenge",
      scope: ["Invited for Interview"],
    },
    {
      defaultStatus: "Invited for Interview",
      scope: ["Accepted", "Reject", "Missed  Interview"],
    },
  ];

  const urlId = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  useEffect(() => {
    const applicationsData = async () => {
      const data = await fetchApplications();
      setApplications(data);
    };
    const singleApplicationData = async () => {
      const data: any = await ViewSingleApplication(urlId);
      setSingleApplication(data);
    };
    applicationsData();
    singleApplicationData();
  }, [urlId]);

  useEffect(() => {
    if (singleApplication) {
      const matchedStatusChange = statusChange.find(
        (change) => change.defaultStatus === singleApplication?.status
      );

      if (matchedStatusChange) {
        setStatusScope(matchedStatusChange);
      } else {
        setStatusScope(undefined);
      }
    }
  }, [singleApplication]);

  useEffect(() => {
    if (statusScope) {
      setFilteredStatusOptions(statusScope.scope);
      setIsInDanger(false);
    }
    setCurrentStatus(singleApplication?.status || "");
  }, [statusScope, singleApplication]);

  const handleLinkClick = (link: string) => {
    window.open(link, "_blank");
  };

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    setCurrentStatus(selectedStatus);
    const selectedStatusChange = statusChange.find(
      (change) => change.defaultStatus === selectedStatus
    );
    await toast.promise(
      updateApplicationStatus(selectedStatus, singleApplication?._id),
      {
        loading: "update statu...",
        success: <b>status updated successfully!</b>,
        error: <b>Failed to update status.</b>,
      }
    );
    if (selectedStatusChange) {
      setFilteredStatusOptions(selectedStatusChange.scope);
    } else {
      setFilteredStatusOptions([]);
    }
  };
  return (
    <>
      <NavBar />
      <div className="flex items-center flex-col overflow-auto dark:bg-dark-frame-bg">
        <div className="min-h-[100vh] dark:bg-dark-frame-bg w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem] pt-[80px] md:pl-0">
          <div className="block w-[100%] pl-[16rem] h-max md:pl-0 mx-auto dark:bg-dark-frame-bg pb-10  ">
            {singleApplication && (
              <div className="max-w-full   bg-slate-50 dark:text-zinc-100 rounded-xl dark:bg-dark-bg shadow-md overflow-hidden md:w-[100%] mb-6 lg:flex lg:w-[90%]">
                <div className="md:flex">
                  <div className="m-5 sm:mt-20  grid grid-col-1 md:gap-4 lg:gap-5 md:grid-cols-4 w-full lg:grid-cols-4 sm:ml-[-12rem] md:shrink-0 lg:ml-10 lg:mt-10">
                    <div>
                      <p className="uppercase">candidate infomation</p>
                      <h3 className="mt-4">Address</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.address}
                      </p>
                      <h3>First Name</h3>
                      <p className="text-gray-500 uppercase text-sm dark:text-gray-400">
                        {singleApplication?.firstName}
                      </p>
                      <h3>Last Name</h3>
                      <p className="text-gray-500 uppercase text-sm dark:text-gray-400">
                        {singleApplication?.lastName}
                      </p>
                      <h3>Email</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.email}
                      </p>
                      <h3>Phone Number</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.telephone}
                      </p>
                      <h3>Gender</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.gender}
                      </p>
                      <h3>Date of submission</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.dateOfSubmission}
                      </p>
                      <h3>Available for interview</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.availability_for_interview}
                      </p>
                      <h3>Resume</h3>
                      <a
                        href={singleApplication?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 underline hover:opacity-80"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(singleApplication?.resume);
                        }}
                      >
                        {singleApplication?.resume
                          .split("")
                          .slice(0, 15)
                          .map((link) => link)}
                      </a>
                      <a
                        className="text-sm text-blue-500 underline hover:opacity-80"
                        href={singleApplication?.associatedFormData.link}
                      >
                        ....
                      </a>
                      <h3>Comment</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.comments}
                      </p>

                      <h3>Status</h3>
                      <p
                        className="text-gray-500 text-sm dark:text-gray-400"
                      >
                        {String(currentStatus)}
                      </p>
                    </div>
                    <div>
                      <h1 className="uppercase">Form</h1>
                      <h3 className="mt-4">Title</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.associatedFormData.title}
                      </p>
                      <h3>Link</h3>
                      <a
                        href={singleApplication?.associatedFormData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 underline hover:opacity-80"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(
                            singleApplication?.associatedFormData.link
                          );
                        }}
                      >
                        {singleApplication?.associatedFormData.jobpost.link
                          .split("")
                          .slice(0, 15)
                          .map((link) => link)}
                      </a>
                      <a
                        className="text-sm text-blue-500 underline hover:opacity-80"
                        href={singleApplication?.associatedFormData.link}
                      >
                        ....
                      </a>
                    </div>
                    <div>
                      <h1 className="uppercase ">JoB Post</h1>
                      <h3 className="mt-4">Title</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.associatedFormData.jobpost.title}
                      </p>
                      <h3>Link</h3>
                      <a
                        href={
                          singleApplication?.associatedFormData.jobpost.link
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 underline hover:opacity-80"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(
                            singleApplication?.associatedFormData.jobpost.link
                          );
                        }}
                      >
                        {singleApplication?.associatedFormData.jobpost.link
                          .split("")
                          .slice(0, 15)
                          .map((link) => link)}
                      </a>
                      <a
                        className="text-sm text-blue-500 underline hover:opacity-80"
                        href={
                          singleApplication?.associatedFormData.jobpost.link
                        }
                      >
                        ....
                      </a>
                      <h3>Label</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {singleApplication?.associatedFormData.jobpost.label}
                      </p>
                      <div>
                        <h1 className="py-4 uppercase">Circle</h1>
                        <h3>Name</h3>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {
                            singleApplication?.associatedFormData.jobpost.cycle
                              .name
                          }
                        </p>
                        <h3>Starting Date</h3>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {
                            singleApplication?.associatedFormData.jobpost.cycle
                              .startDate
                          }
                        </p>
                        <h3>Closed Date</h3>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {
                            singleApplication?.associatedFormData.jobpost.cycle
                              .endDate
                          }
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <h1 className="uppercase">Cohort</h1>
                      <h3 className="mt-4">Title</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {
                          singleApplication?.associatedFormData.jobpost.cohort
                            .title
                        }
                      </p>
                      <h3>Starting Date</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {
                          singleApplication?.associatedFormData.jobpost.cohort
                            .start
                        }
                      </p>
                      <h3>closed Date</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {
                          singleApplication?.associatedFormData.jobpost.cohort
                            .end
                        }
                      </p>

                      <div>
                        <h1 className="uppercase py-4">Program</h1>
                        <h3>Title</h3>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {
                            singleApplication?.associatedFormData.jobpost
                              .program.title
                          }
                        </p>
                        <h3>Duration</h3>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {
                            singleApplication?.associatedFormData.jobpost
                              .program.duration
                          }
                        </p>
                        <h3>Main objective</h3>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {
                            singleApplication?.associatedFormData.jobpost
                              .program.mainObjective
                          }
                        </p>
                        <h3>Mode of excution</h3>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {
                            singleApplication?.associatedFormData.jobpost
                              .program.modeOfExecution
                          }
                        </p>
                        <h3>Mode of excution</h3>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {singleApplication?.associatedFormData.jobpost.program.requirements?.map(
                            (requirement: any) => {
                              return <p>{requirement}</p>;
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="max-w-md flex justify-between items-center p-4 dark:text-zinc-100 dark:bg-dark-bg bg-slate-50 rounded-xl shadow-md overflow-hidden  lg:mb-10 pb-5 mx-auto">
            <select
              name=""
              id=""
              className="bg-[#10292C] flex items-center text-white justify-center dark:bg-white hover:bg-[#1f544cef] dark:text-zinc-700 font-bold py-2 px-4 rounded"
              onChange={handleStatusChange}
              value={status}
            >
              <option value="">Update status</option>
              {filteredStatusOptions.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
            <button
              className="bg-[#DC5454] hover:text-red-500 hover:bg-[#1f544cef] text-white font-bold py-2 px-2 rounded"
            >
              Softdelete
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ApplicationDetails;
