import { useState, useEffect } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { FaRecycle } from "react-icons/fa6";
import { getOneTraineeAllDetails } from "../redux/actions/trainnee";
import { connect } from "react-redux";
import { useParams } from "react-router";
import DetailItem from "../components/TraineeDetail/DetailItem";
import ProgramItem from "../components/TraineeDetail/ProgramBox";
import DecisionSection from "../components/TraineeDetail/decisionSection";


const TrainneeDetails = (props: any) => {
    const params = useParams();
    const [key, setKey] = useState(params.traineeId);
    const [loading, setLoading] = useState(true);
    const { oneTraineeDetails } = props;

    const [ID, setId] = useState(key);

     useEffect(() => {
      const fetchData = async () => {
        await props.getOneTraineeAllDetails({ id: ID });
        setLoading(false);
      };
      fetchData();
    }, [ID]);

  const traineeDetails = oneTraineeDetails.data;

  return (
    <>
      <div className="w-full flex items-center bg-white overflow-auto dark:bg-dark-frame-bg">
        <div className="block w-[100%] pl-20 h-max md:pl-0 mx-auto dark:bg-dark-frame-bg pb-10  pt-[80px]">
          <div className="" id="trainee-info">
            {traineeDetails && (
              <div className="w-full bg-slate-200 mx-16 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-6 lg:flex lg:max-w-3xl dark:bg-[#192432] dark:text-white">
                <div className=" md:flex ">
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
                    <DetailItem
                      title="Address"
                      value={traineeDetails.Address}
                    />
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
                  <DetailItem
                    title="Province"
                    value={traineeDetails.province}
                  />
                  <DetailItem
                    title="District"
                    value={traineeDetails.district}
                  />
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
          </div>

          <DecisionSection traineeDetails={traineeDetails} />
        </div>
      </div>
    </>
  );
};

const mapState = (state: any) => ({
  oneTraineeDetails: state.traineeAllDetails,
});

export default connect(mapState, {
  getOneTraineeAllDetails,
})(TrainneeDetails);
