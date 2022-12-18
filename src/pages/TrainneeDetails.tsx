import React, { useState, useEffect } from "react";
import { BsEnvelope } from "react-icons/bs";
import { TiExportOutline } from "react-icons/ti";
import { FcApproval } from "react-icons/fc";
import { AiFillSetting, AiFillCaretDown } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Sidebar from "../components/sidebar/sidebar";
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
      <div className="h-screen flex  dark:bg-dark-frame-bg ">
        {/* <div className="min-h-[50vh] dark:bg-dark-frame-bg  w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem] pt-[80px] md:pl-0"> */}
        <div className="block w-[100%] pl-[16rem] h-max md:pl-0 mx-auto dark:bg-dark-frame-bg pb-10 mt-10  pt-[80px]">
          {traineeDetails && (
            <div className=" max-w-md bg-slate-50 dark:text-zinc-100 rounded-xl dark:bg-dark-bg shadow-md  overflow-hidden md:w-[100%] mb-6 lg:flex lg:max-w-2xl mx-auto">
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
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {traineeDetails.birth_date}
                </p>
              </div>
            </div>
          )}
          <div className="bg-slate-50 rounded-xl dark:bg-dark-bg shadow-md overflow-hidden md:w-[90%] px-10 mb-6 lg:max-w-2xl w-[90%] mx-auto">
            <form className="w-fit ">
              <h2 className="top-5 m-5 ml-0 font-medium dark:text-zinc-100">
                <BsFillPersonLinesFill className="float-left m-1 " />
                User ratings
              </h2>
              <div className="dark:text-zinc-100 sm:grid sm:grid-cols-2 block pl-[0px] py-[10px] mb-5">
                {score_value?.map((values: any, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="p-[1px] w-[150px] block mr-0 even:ml-[50px] mt-2"
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
                <div className="flex items-center">
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
          <div className=" max-w-md bg-slate-50 rounded-xl dark:bg-dark-bg shadow-md overflow-hidden md:w-[100%] mb-6 lg:flex lg:max-w-2xl dark:text-zinc-100  mx-auto">
            <div>
              <h2 className="top-5 m-5  font-medium">
                <BsFillPersonLinesFill className="float-left m-1" />
                Application Information
              </h2>
              <div className="m-5 lg:my-14">
                <h3>Application Phase</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Initial Phase
                </p>
                <h3 className="mt-5">Program</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {" "}
                  Andela Technical Leadership Program
                </p>
              </div>
            </div>
            <div>
              <div className="mt-8 m-5 lg:mt-24">
                <h3>Application Date</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  Initial Phase
                </p>
                <h3 className="mt-5">Expected program start date</h3>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {" "}
                  08/01/2022
                </p>
              </div>
            </div>
          </div>{" "}
          <div className=" max-w-md dark:text-zinc-100 dark:bg-dark-bg bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl  lg:max-w-2xl lg:mb-10 pb-5  mx-auto">
            <h2 className="font-bold top-5 ml-5 mt-5 ">
              <AiFillSetting className="float-left m-1 " />
              Actions
            </h2>
            <div className=" btn ml-5 mt-[-10%] mb-3   ">
              <button className="btn-Aprov  bg-[#10292C] dark:bg-green hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mt-20 mr-4">
                <FcApproval className="float-left m-1" />
                Approve
              </button>

              {/* <div className=""> */}
              <button
                onClick={(e) => handleDropDown(open)}
                className="btn-Aprov bg-[#10292C] dark:bg-green hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mr-8"
              >
                <TiExportOutline className="float-left m-1" />
                Export
                <AiFillCaretDown className="float-right m-1" />
                {open && (
                  <ul className="bg-[#1F2A37] font-light text-sm text-white m-1">
                    <li className="border-solid border-black border-b-2 ">
                      Export to PDF
                    </li>
                    <li>Export to CSV</li>
                  </ul>
                )}
              </button>
              {/* </div> */}

              <button className="btn-Aprov2 bg-[#10292C] dark:bg-green hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mr-8 ">
                <BsEnvelope className="float-left m-1" />
                Email
              </button>
              <button className="btn-Aprov3 bg-[#DC5454] hover:text-red-500 hover:bg-[#1f544cef] text-white font-bold py-2 px-2 rounded ">
                <MdOutlineCancel className="float-left m-1" />
                Reject
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
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
