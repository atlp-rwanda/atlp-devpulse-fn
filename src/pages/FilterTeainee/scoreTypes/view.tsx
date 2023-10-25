import { useParams } from "react-router";
import NavBar from "./../../../components/sidebar/navHeader";
import { BsFillPersonLinesFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import {getOneScoreType} from "../../../redux/actions/scoreTypesActions"
import { useAppDispatch,useAppSelector } from "../../../hooks/hooks";
import { connect } from "react-redux";

const SingleAssessment = (props: any) => {
  const { getOneScoreTypeStates } = props;
  const dispatch = useAppDispatch();
  const params = useParams();
  const [assessmentId, setassessmentId] = useState(params.id);

  console.log(assessmentId)
  useEffect(() => {
    dispatch(getOneScoreType(assessmentId));
  }, [assessmentId]);
  console.log('view single score type: --------->>>>>>',getOneScoreTypeStates)
  return (
    <>
      <div className="h-screen flex flex-col items-center dark:bg-dark-frame-bg">
        <div className="flex flex-col justify-start mt-24 items-start p-5 w-[95%] lg:w-1/2 md_:mx-auto overflow-hidden dark:bg-dark-bg">
          <h2 className="text-white font-bold my-5">
            <BsFillPersonLinesFill className="float-left m-1" />
            Program information
          </h2>
          <div className="flex flex-col justify-center gap-3 mb-8">
            {getOneScoreTypeStates?.data != null && (
              <>
                <div className="flex flex-col">
                  <h3 className="text-white">Program title</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {getOneScoreTypeStates.data.title}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Program description</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {getOneScoreTypeStates.data.description}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Main objective</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {getOneScoreTypeStates.data.mainObjective}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Mode of execution</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {getOneScoreTypeStates.data.modeOfExecution}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Requirements</h3>
                  {getOneScoreTypeStates.data.requirements &&
                    getOneScoreTypeStates.data?.requirements.map(
                      (req: any, index: any) => (
                        <p
                          key={req}
                          className="text-gray-500 text-sm dark:text-gray-400"
                        >
                          {`${index + 1}. ${req}`}
                        </p>
                      )
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};

const mapState = (state: any) => ({
  getOneScoreTypeStates: state.getOneScoreType,
});

export default connect(mapState, {
  getOneScoreType,
})(SingleAssessment);
