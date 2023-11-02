import React, { useState, useEffect } from "react";
import { FcApproval } from "react-icons/fc";
import { AiFillSetting } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useParams } from "react-router";
import Candidate from "../../dummyData/Candidate.json";
import NavBar from "../../components/sidebar/navHeader";

const ApplicationDetails = () => {
  const params = useParams();
  const [key, setKey] = useState(params.appId);
  const urlId = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const singleData = Candidate.filter((candidate: any) => {
    return candidate.id == urlId;
  });

  const [ID, setId] = useState(key);

  const [open, setOpen] = useState<boolean>(false);
  const handleDropDown = (state: boolean) => {
    setOpen(!state);
  };

  let input = {
    id: ID,
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center flex-col overflow-auto  dark:bg-dark-frame-bg ">
        <div className="block w-[100%] pl-[16rem] h-max md:pl-0 mx-auto dark:bg-dark-frame-bg pb-10 mt-10  pt-[80px]">
          {singleData && (
            <div className=" max-w-md bg-slate-50 dark:text-zinc-100 rounded-xl dark:bg-dark-bg shadow-md  overflow-hidden md:w-[100%] mb-6 lg:flex lg:max-w-2xl mx-auto">
              <div className="md:flex">
                <h2 className="top-5 m-5 font-medium md:m-3 ">
                  <BsFillPersonLinesFill className="float-left m-1" />
                  Applicant Information
                </h2>

                <div className=" grid gap-2 top-5 m-5 font-medium md:m-3">
                  {singleData[0]?.id && (
                    <>
                      {" "}
                      <h3>FirstName</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400 ">
                        {singleData[0]?.firstname}
                      </p>
                    </>
                  )}
                  <h3>Gender</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {singleData[0]?.lastname}
                  </p>
                  <h3>Address</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {singleData[0]?.email}
                  </p>
                  <h3>Phone Number</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {singleData[0]?.suite}
                  </p>
                  <h3>Field of Study</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {singleData[0]?.availability}
                  </p>
                  <h3>Education Level</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {singleData[0]?.city}
                  </p>
                  <h3>Is Employed</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {String(singleData[0]?.status)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="max-w-md dark:text-zinc-100 dark:bg-dark-bg bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl lg:max-w-2xl lg:mb-10 pb-5 mx-auto">
          <h2 className="font-bold top-5 ml-5 mt-5 ">
            <AiFillSetting className="float-left m-1 " />
            Actions
          </h2>
          <div className=" flex btn ml-5 mt-[-10%] mb-3">
            <button className="  bg-[#10292C] dark:bg-green hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mt-20 mr-4">
              <FcApproval className="float-left m-1" />
              Approve
            </button>
            <button
              onClick={(e) => handleDropDown(open)}
              className="  bg-[#10292C] flex items-center  dark:bg-green hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mt-20 mr-4"
            >
              <FcApproval className="float-left m-1" />
              Softdelete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationDetails;
