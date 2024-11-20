import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from '../../redux/actions/axiosconfig'
import { toast } from "react-toastify";
import { getStatusClass } from "../../components/application/ApplicationStatus";


interface Application {
  _id:string,
  userId:string,
  jobId?: {
    _id:string,
    title:string
  },
  status:string,
  createdAt: string
}

export const ApplicantApplication = () => {
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState<Application[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [status, setStatus] = useState("All")

  useEffect(() => {
    (async() => {
      await getJobApplications()
    })()
  },[])
 

  const getJobApplications = async() => {
    const query = `query GetOwnJobApplications {
      getOwnJobApplications {
        _id
        jobId {
          _id
          title
        }
        status
        createdAt
      }
    }`

    try {
      setLoading(true)
      const response = await axiosClient.post(
        '/',
        {
          query: query,
        },
      );

      setLoading(false)
      
      if(response.data.errors){
          toast.error(response.data.errors[0].message)
          return
      }

      setApplications(response.data.data.getOwnJobApplications)
      setFilteredApplications(response.data.data.getOwnJobApplications)
  } catch (error) {
      setLoading(false)
      console.log(error)
  }
  }


  useEffect(() => {
    let filtered: Application[] = []

    if(searchQuery){
      filtered = applications.filter(app => `${app.jobId?.title} ${app.createdAt}`.toLowerCase().includes(searchQuery.toLowerCase()))
    }else{
      filtered = applications
    }

    if(status !== 'All'){
      filtered = filtered.filter(app => app.status === status)
    }

    setFilteredApplications(filtered)
  },[searchQuery,status])


  return (
    <div className="p-4">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-row items-center space-x-4">
          <Link
            to="/applicant/available-jobs/trainee-apply"
            className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer"
          >
            Become trainee
          </Link>
          <Link
            to="/applicant/myapplication"
            className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer"
          >
            Track my application
          </Link>
          <select className="sm:text-sm w-full sm:w-40 lg:w-32 h-10 rounded-bt-rd dark:bg-[#293647] dark:text-ltb" onChange={(e) => setStatus(e.target.value)}>
            <option value='All'>Sort by Status</option>
            <option value="All">All</option>
            <option value="submitted">Submitted</option>
            <option value="under-review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="flex-grow w-full sm:w-auto">
            <div className="relative">
              <input
                className="w-full bg-row-gray dark:bg-[#293647] dark:text-ltb border border-bdr dark:border-cg dark:border-opacity-5 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="Search"
                type="text"
                name="search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <DynamicTable headers={headers} data={applications} isLoading={loading} /> */}

      <div className="w-[4/5] flex flex-col bg-gray-800 text-white mt-12">
        <div className="bg-gray-700 w-full h-12 flex items-center justify-between px-4">
          <h2 className="w-40">JOB TITLE</h2>
          <h2 className="w-40">DATE OF SUBMISSION</h2>
          <h2 className="w-32 max-w-32">STATUS</h2>         
        </div>
        {filteredApplications.map((application, i) => (
          <div className={`w-full h-16 flex items-center justify-between px-4 ${i % 2 !== 0 && 'bg-gray-700'}`}>
            <h2 className="w-40 text-sm">{application.jobId?.title}</h2>
            <h2 className="w-40 text-sm">{application.createdAt}</h2>
            <div className="w-32 flex items-center justify-start">
              <div className={`text-sm py-1 px-2 flex items-center justify-center rounded-full ${getStatusClass(application.status)}`}>{application.status}</div>    
            </div>
          </div>
        ))}
        {filteredApplications.length === 0 && <div className="w-full h-12 flex items-center justify-center px-4">
          {loading && '...processing'}
          {!loading && filteredApplications.length === 0 && 'No data available'}
        </div>}
      </div>
    </div>
  );
};
