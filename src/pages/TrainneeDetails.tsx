import React, { useState, useEffect } from "react";
import { BsEnvelope } from "react-icons/bs";
import { TiExportOutline } from "react-icons/ti";
import { FcApproval } from "react-icons/fc";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
// import Sidebar from "../components/sidebar/sidebar";
import { getOneTraineeAllDetails } from "../redux/actions/trainnee";
import { connect } from "react-redux";
import Navbar from "./../components/sidebar/navHeader";
import { useParams } from "react-router";
import {
  getAllScoreValues,
  updateManyScoreValues,
} from "../redux/actions/scoreValueActions";
import { toast } from "react-toastify";

const TrainneeDetails = (props: any) => {
  const params = useParams();
  const [key, setKey] = useState(params.traineeId);
  const { oneTraineeDetails, scoreValues } = props;

  const urlId = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const availableScores = scoreValues.data?.filter((values: any) => {
    return values.attr_id?.trainee_id._id == urlId;
  });
  const [changed, setChanged] = useState(false);

  const arr = availableScores?.map((values: any) => {
    // return values.score_value;
    return {
      id: values.id,
      test: values.score_id.score_type,
      score_value: values.score_value,
    };
  });

  const [score_value, setscore_value] = useState<any>();

  const values = availableScores?.map((values: any) => {
    return { test: values.score_id.score_type, value: values.score_value };
  });

  const attrValues = availableScores?.map((values: any) => {
    return {
      attr_id: values.attr_id._id,
      id: values.id,
      score_id: values.score_id.id,
      score_value: values.score_value,
    };
  });

  const [ID, setId] = useState(key);

  const [open, setOpen] = useState<boolean>(false);
  const handleDropDown = (state: boolean) => {
    setOpen(!state);
  };

  let input = {
    id: ID,
  };


  useEffect(() => {
    setscore_value(arr);
  }, [scoreValues]);
  useEffect(() => {
    props.getOneTraineeAllDetails(input);
    props.getAllScoreValues();
  }, []);

  const traineeDetails = oneTraineeDetails.data;

  const updateManyScoreValues = () => {
    const tsabus = score_value.map((values: any) => {
      delete values.test;
      return values;
    });
    props.updateManyScoreValues(tsabus);
  };

  return (
    <>
      <Navbar />
      <div className=" m-0 mt-16 dark:bg-[#1F2A37]   ">
        <div className="block lg:ml-[30%]   ">
          {traineeDetails && (
            <div className="max-w-md mx-5 p-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl mb-6 lg:flex lg:max-w-2xl dark:bg-[#192432] dark:text-white ">
              <div className="md:flex  ">
                <h2 className="top-5 m-5  font-medium  md:m-3 ">
                  <BsFillPersonLinesFill className="float-left m-1" />
                  Trainee Applicant Information
                </h2>

                <div className=" m-5 sm:mt-20 sm:ml-[-12rem] md:shrink-0  lg:ml-10 lg:mt-10  ">
                  {traineeDetails?.trainee_id && (
                    <>
                      {" "}
                      <h3>FirstName</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400 ">
                        {traineeDetails?.trainee_id.firstName}
                      </p>
                    </>
                  )}
                  <h3>Gender</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {traineeDetails.gender}
                  </p>
                  <h3>Address</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {traineeDetails.Address}
                  </p>
                  <h3>Phone Number</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {traineeDetails.phone}
                  </p>
                  <h3>Field of Study</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {traineeDetails.field_of_study}
                  </p>
                  <h3>Education Level</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {traineeDetails.education_level}
                  </p>
                  <h3>Is Employed</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {String(traineeDetails.isEmployed)}
                  </p>
                  {traineeDetails?.trainee_id && (
                    <>
                      <h3>Email </h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {traineeDetails?.trainee_id.email}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="m-5 sm:ml-[20rem] md:ml-2 lg:mt-20 lg:ml-[5rem]">
                {traineeDetails?.trainee_id && (
                  <>
                    <h3>LastName</h3>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                      {traineeDetails?.trainee_id.lastName}
                    </p>
                  </>
                )}
                <h3>Province</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {traineeDetails.province}
                </p>
                <h3>District</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {traineeDetails.district}
                </p>
                <h3>Sector</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {traineeDetails.sector}
                </p>
                <h3>Is Student</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {String(traineeDetails.isStudent)}
                </p>
                <h3>Hackerrank Score</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {traineeDetails.Hackerrank_score}
                </p>
                <h3>English Score</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {traineeDetails.english_score}
                </p>
                <h3>Date of Bith</h3>
                <p className="text-gray-500 text-sm">
                  {new Intl.DateTimeFormat("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(traineeDetails.birth_date)}
                </p>
              </div>
            </div>
          )}
          <div className="max-w-md mx-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl mb-6 lg:flex lg:max-w-2xl dark:bg-[#192432] dark:text-white ">
            <form className="w-fit ">
              <h2 className="top-5 m-5 ml-0 font-medium dark:text-zinc-100 lg:ml-5">
                <BsFillPersonLinesFill className="float-left m-1 " />
                User ratings
              </h2>
              <div className="dark:text-zinc-100 sm:grid sm:grid-cols-2 block pl-[0px] py-[10px] mb-5 ">
                {score_value?.map((values: any, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="p-[1px] w-[150px] block mr-0 even:ml-[50px] mt-2 ml-10"
                    >
                      <div>
                        <label htmlFor="">{values.test}</label>
                      </div>
                      <div className="">
                        <input
                          type="number"
                          suppressHydrationWarning
                          value={score_value[idx].score_value}
                          className="block border border-[#bbbbbb] text-[#464646] border-1 bg-[#f4f4f4] rounded-[5px]  px-2  py-0 w-[60px]  dark:bg-dark-tertiary dark:text-zinc-100 "
                          onChange={(e) => {
                            setChanged(true);
                            setscore_value((values) => {
                              const newValue = [...values];
                              newValue[idx] = {
                                ...newValue[idx],
                                score_value: e.target.value,
                              };
                              return newValue;
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {changed && (
                <div className="flex items-center ml-10">
                  <button
                    className="text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] mb-5 block dark:bg-green dark:border"
                    onClick={() => {
                      setChanged(false);
                      updateManyScoreValues();
                    }}
                  >
                    SAVE
                  </button>
                  <button
                    type="reset"
                    className="text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] mb-5 block dark:bg-green dark:border ml-3"
                    onClick={() => {
                      setscore_value(arr);
                      setChanged(false);
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              )}
            </form>
          </div>
          {traineeDetails && (
            <>
              <div className=" max-w-md mx-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl mb-6 lg:flex lg:max-w-2xl dark:bg-[#192432] dark:text-white ">
                <div>
                  <h2 className="top-5 m-5  font-medium">
                    <BsFillPersonLinesFill className="float-left m-1" />
                    Application Information
                  </h2>
                  <div className="m-5 lg:my-14">
                    <h3>Application Cyle</h3>
                    {traineeDetails.trainee_id && (
                      <>
                        {traineeDetails.trainee_id.cycle_id && (
                          <>
                            <p className="text-gray-500 text-sm">
                              {traineeDetails.trainee_id.cycle_id.name}
                            </p>
                          </>
                        )}
                      </>
                    )}
                    <h3 className="mt-5">Program</h3>
                    <p className="text-gray-500 text-sm">
                      {" "}
                      Andela Technical Leadership Program
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mt-8 m-5 lg:mt-24">
                    <h3>Application start date</h3>
                    {traineeDetails.trainee_id && (
                      <>
                        {traineeDetails.trainee_id.cycle_id && (
                          <>
                            <p className="text-gray-500 text-sm">
                              {traineeDetails.trainee_id.cycle_id.startDate}
                            </p>{" "}
                          </>
                        )}
                      </>
                    )}
                    <h3 className="mt-5">Expected program end Date</h3>
                    {traineeDetails.trainee_id && (
                      <>
                        {traineeDetails.trainee_id.cycle_id && (
                          <>
                            <p className="text-gray-500 text-sm">
                              {" "}
                              {traineeDetails.trainee_id.cycle_id.endDate}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>{" "}
            </>
          )}
          <div className=" max-w-md mx-5 bg-slate-50  rounded-xl shadow-md overflow-hidden md:max-w-xl  lg:max-w-2xl lg:mb-10 dark:bg-[#192432] dark:text-white  ">
            <h2 className="font-bold top-5 ml-5 mt-5 ">
              <AiFillSetting className="float-left m-1 " />
              Actions
            </h2>
            <div className=" btn ml-5 mt-[-10%] mb-3   ">
              <button className="btn-Aprov  bg-[#10292C] hover:bg-[#56C870]  dark:hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mt-20 mr-4  dark:bg-[#56C870]">
                <FcApproval className="float-left m-1" />
                Passed
              </button>
              <button className="btn-Aprov2 bg-[#10292C] hover:bg-[#56C870]  dark:hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mr-8 dark:bg-[#56C870] ">
                <BsEnvelope className="float-left m-1" />
                Email
              </button>

             
              <button
                onClick={(e) => handleDropDown(open)}
                className="btn-Aprov  bg-yellow-500 hover:bg-[#f9e84eef] dark:hover:bg-[#f9e84eef] text-white font-bold py-2 px-4 rounded mr-8 dark:bg-yellow-500"
              >
                <TiExportOutline className="float-left m-1" />
                Religated
              </button>
             

             
              <button className="btn-Aprov3 bg-red-800 hover:text-white hover:bg-red-500 text-white font-bold py-2 px-2 rounded ">
                <MdOutlineCancel className="float-left m-1" />
                Failed
              </button>
            </div>
          </div>
        </div>
        <div className="mb-25">
          <h1>end Page</h1>
        </div>
      </div>
    </>
  );
};
//  export default TrainneeDetails
const mapState = (state: any) => ({
  oneTraineeDetails: state.traineeAllDetails,
  scoreValues: state.scoreValues,
});

export default connect(mapState, {
  getOneTraineeAllDetails,
  getAllScoreValues,
  updateManyScoreValues,
})(TrainneeDetails);
