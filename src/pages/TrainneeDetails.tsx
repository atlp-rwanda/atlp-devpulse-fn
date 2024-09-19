import React, { useState, useEffect } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { FaRecycle } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { getOneTraineeAllDetails } from "../redux/actions/trainnee";
import { connect } from "react-redux";
import Navbar from "./../components/sidebar/navHeader";
import { useParams } from "react-router";
import {
  getAllScoreValues,
  updateManyScoreValues,
} from "../redux/actions/scoreValueActions";
import { toast } from "react-toastify";
import DetailItem from "../components/TraineeDetail/DetailItem";
import ProgramItem from "../components/TraineeDetail/ProgramBox";



const TrainneeDetails = (props: any) => {
  const params = useParams();
  const [key, setKey] = useState(params.traineeId);
  const { oneTraineeDetails, scoreValues } = props;

  const urlId = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const availableScores = scoreValues.data?.filter((values: any) => {
    return values.attr_id?.trainee_id._id === urlId;
  });

  const [scoreValue, setScoreValue] = useState<any>();
  const values = availableScores?.map((values: any) => ({
    test: values.score_id.score_type,
    value: values.score_value,
  }));

  const attrValues = availableScores?.map((values: any) => ({
    attr_id: values.attr_id._id,
    id: values.id,
    score_id: values.score_id.id,
    score_value: values.score_value,
  }));

  const [ID, setId] = useState(key);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setScoreValue(values);
  }, [scoreValues]);

  useEffect(() => {
    props.getOneTraineeAllDetails({ id: ID });
    props.getAllScoreValues();
  }, [ID]);

  const traineeDetails = oneTraineeDetails.data;

  const updateManyScoreValues = () => {
    const scores = scoreValue.map((values: any) => {
      delete values.test;
      return values;
    });
    props.updateManyScoreValues(scores);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center overflow-auto dark:bg-dark-frame-bg">
        <div className="block w-[100%] pl-[16rem] h-max md:pl-0 mx-auto dark:bg-dark-frame-bg pb-10 mt-10 pt-[80px]">
          {traineeDetails && (
            <div className="w-full mx-16 bg-slate-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-6 lg:flex lg:max-w-3xl dark:bg-[#192432] dark:text-white">
              <div className="md:flex">
                <h2 className="top-5 m-5 font-medium md:m-3">
                  <span className="pl-5 text-lg text-[#56C870] uppercase">
                    Trainee Applicant Information
                  </span>
                </h2>
                <div className="m-5 sm:mt-20 sm:ml-[-12rem] md:shrink-0 lg:ml-10 lg:mt-10">
                  <DetailItem
                    title="FirstName"
                    value={traineeDetails?.trainee_id?.firstName}
                  />
                  <DetailItem title="Gender" value={traineeDetails.gender} />
                  <DetailItem title="Address" value={traineeDetails.Address} />
                  <DetailItem
                    title="Phone Number"
                    value={traineeDetails.phone}
                  />
                  <DetailItem
                    title="Field of Study"
                    value={traineeDetails.field_of_study}
                  />
                  <DetailItem
                    title="Education Level"
                    value={traineeDetails.education_level}
                  />
                  <DetailItem
                    title="Is Student"
                    value={traineeDetails.isStudent}
                  />
                  <DetailItem
                    title="Is Employed"
                    value={traineeDetails.isEmployed}
                  />
                  <DetailItem
                    title="Email"
                    value={traineeDetails?.trainee_id?.email}
                  />
                </div>
              </div>
              <div className="m-5 sm:ml-[20rem] md:ml-2 lg:mt-20 lg:ml-[5rem]">
                <DetailItem
                  title="LastName"
                  value={traineeDetails?.trainee_id?.lastName}
                />
                <DetailItem title="Province" value={traineeDetails.province} />
                <DetailItem title="District" value={traineeDetails.district} />
                <DetailItem title="Sector" value={traineeDetails.sector} />
                <DetailItem
                  title="Interview decision"
                  value={traineeDetails.interview_decision}
                />
                <DetailItem
                  title="Hackerrank Score"
                  value={traineeDetails.Hackerrank_score}
                />
                <DetailItem
                  title="English Score"
                  value={traineeDetails.english_score}
                />
                <DetailItem
                  title="Date of Birth"
                  value={new Intl.DateTimeFormat("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(traineeDetails.birth_date)}
                />
              </div>
            </div>
          )}
          {traineeDetails && (
            <div className="w-full mx-16 bg-slate-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-6 lg:flex lg:max-w-3xl dark:bg-[#192432] dark:text-white">
              <div className="">
                <h2 className="top-5 m-5 font-medium">
                  <span className="pl-3 text-lg text-[#56C870] uppercase">
                    Application Information
                  </span>
                </h2>
                <div className="flex flex-col gap-7 m-5 lg:my-14">
                  <ProgramItem
                    title="Application Cycle"
                    value={traineeDetails.trainee_id?.cycle_id?.name}
                    Icon={FaRecycle}
                  />

                  <ProgramItem
                    title="Program"
                    value="Andela Technical Leadership Program"
                    Icon={FaRecycle}
                  />
                </div>
              </div>
              <div className="mt-12">
                <div className="flex flex-col gap-7 m-5 lg:my-14">
                  <ProgramItem
                    title="Application start date"
                    value={traineeDetails.trainee_id?.cycle_id?.startDate}
                    Icon={LuCalendarDays}
                  />
                  <ProgramItem
                    title="Expected program end Date"
                    value={traineeDetails.trainee_id?.cycle_id?.endDate}
                    Icon={LuCalendarDays}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col mx-16 pb-2 bg-slate-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-6 lg:flex lg:max-w-3xl dark:bg-[#192432] dark:text-white">
            <h2 className="font-bold text-lg text-[#56C870] top-5 pb-7 ml-5 mt-5 uppercase">
              Status
            </h2>
            {traineeDetails.Hackerrank_score >= 50 &&
            traineeDetails.english_score >= 50 &&
            traineeDetails.interview_decision === "Passed" ? (
              <div className="py-10 btn ml-5 mt-[-10%] mb-3">
                <button className="btn-Aprov bg-[#10292C] hover:bg-[#56C870] dark:hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mt-7 mr-4 dark:bg-[#56C870]">
                  Passed
                </button>
              </div>
            ) : (
              <div className="py-10 btn ml-5 mt-[-10%] mb-3">
                <button className="btn-Aprov3 bg-red-800 hover:text-white hover:bg-red-500 text-white font-bold mt-7 py-2 px-2 rounded">
                  Failed
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state: any) => ({
  oneTraineeDetails: state.traineeAllDetails,
  scoreValues: state.scoreValues,
});

export default connect(mapState, {
  getOneTraineeAllDetails,
  getAllScoreValues,
  updateManyScoreValues,
})(TrainneeDetails);
