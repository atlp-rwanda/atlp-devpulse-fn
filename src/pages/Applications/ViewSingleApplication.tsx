/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ViewSingleApplication, fetchApplications, updateApplicationStatus } from "../../redux/actions/adminListApplications";
import toast, { Toaster } from "react-hot-toast";
import WarningModal from '../../components/application/WarningModal'
import { ApplicationDetailsSkeleton } from '../../skeletons/applicationDetailsSkeleton';
import axiosClient from '../../redux/actions/axiosconfig'
import { getStatusClass } from "../../components/application/ApplicationStatus";


interface Application {
  _id:string,
  userId?:{
    _id:string,
    firstname:string,
    lastname:string,
    email:string,
    gender:string,
    country:string,
    telephone:string,
  }
  jobId?: {
    _id:string,
    title:string
  },
  status:string,
  resume:string,
  essay:string,
  createdAt: string
}

const ApplicationDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<Application | null>(null)
  const [status, setStatus] = useState("")

  const getJobApplication = async() => {
    const query = `query GetOneJobApplication($input: SingleJobApplicationInput!) {
      getOneJobApplication(input: $input) {
        _id
        userId {
          _id
          firstname
          lastname
          email
          gender
          country
          telephone
        }
        jobId {
          _id
          title
        }
        status
        essay
        resume
        createdAt
      }
    }`

    try {
      setIsLoading(true)
      const response = await axiosClient.post(
        '/',
        {
          query: query,
          variables:{
            input:{
              applicationId:params.appId
            }
          }
        },
      );

      setIsLoading(false)
      
      if(response.data.errors){
          toast.error(response.data.errors[0].message)
          return
      }

      setApplication(response.data.data.getOneJobApplication)
    } catch (error) {
      setIsLoading(false)
      toast.error('Failed to fetch application')
      console.log(error)
    }
  }

  const updateStatus = async() => {
    if(!status){
      return
    }
    const toastId = toast.loading('Updating status...');
    try{
      const mutation = `mutation ChangeApplicationStatus($input: StatusInput!) {
        changeApplicationStatus(input: $input) {
          _id
          userId {
            _id
            firstname
            lastname
            email
            gender
            country
            telephone
          }
          jobId {
            _id
            title
          }
          status
          essay
          resume
          createdAt
        }
      }
    `
      const response = await axiosClient.post(
        '/',
        {
          query: mutation,
          variables:{
            input:{
              applicationId:params.appId,
              status: status
            }
          }
        },
      );
      toast.dismiss(toastId);

      if(response.data.errors){
        toast.error(response.data.errors[0].message)
        return
      }

    toast.success('Status updated successfully')  
    setApplication(response.data.data.changeApplicationStatus)
    }catch(err){
      toast.dismiss(toastId);
      toast.error('Failed to update status')
      console.log(err)
    }
  }

  useEffect(() => {
    (async() => {
      await getJobApplication()
    })()
  },[])

  useEffect(() => {
    if(status && status !== application?.status){
      (async() => {
        await updateStatus()
      })()
    }
  },[status])


  return (
    <>
      <div className="flex flex-col min-w-full items-center dark:bg-dark-frame-bg min-h-screen">
        <div className="w-full max-w-6xl mt-10 p-6">          
        {isLoading ? (
            <ApplicationDetailsSkeleton />
          ) : (
            application && (
            <div className="bg-white dark:bg-dark-bg shadow-lg rounded-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="uppercase text-gray-800 dark:text-white font-bold">Candidate Information</h3>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium"> First Name: </span> {application.userId?.firstname}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Last Name:</span> {application.userId?.lastname}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Email: </span> {application.userId?.email}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Phone Number:</span> {application.userId?.telephone}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Gender: </span> {application.userId?.gender}</p>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Date of Submission:</span> {application.createdAt}</p>
                  <p className="text-gray-500 dark:text-gray-300 font-medium"> Resume:{" "}<a href={application.resume} target="_blank" rel="noreferrer noopener" className="text-blue-500 font-normal hover:underline"> View Resume </a> </p>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg text-white">Interest essay:</h2>
                    <div className="text-white" dangerouslySetInnerHTML={{__html:application.essay}}></div>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="font-medium">Status:</span>
                    <div className={`px-3 h-7 flex items-center justify-center rounded-full text-sm ${getStatusClass(application.status)}`}>{application.status}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="uppercase text-gray-800 dark:text-white font-bold">Job Post</h3>
                  <p className="text-gray-500 dark:text-gray-300"><span className="font-medium">Title:  </span> {application.jobId?.title}</p>
                </div>
              </div>
            </div>
           ))}

       <div className="mt-8 flex justify-between gap-8 items-center">           
      <select
        name=""
        id=""
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={isLoading}
        className="bg-[#10292C] flex items-center text-white justify-center dark:bg-white hover:bg-[#1f544cef] dark:text-zinc-700 font-bold py-2 px-4 rounded"
      >
        <option defaultChecked value="">Update status</option>
        <option value='submitted'>Submitted</option>
        <option value='under-review'>Under Review</option>
        <option value='accepted'>Accepted</option>
        <option value='rejected'>Rejected</option>
      </select>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default ApplicationDetails;
