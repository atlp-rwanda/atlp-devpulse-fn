import { useParams } from "react-router";
import NavBar from "../../components/sidebar/navHeader";
import { BsFillPersonLinesFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { fetchSingleProgram } from "../../redux/actions/fetchSingleProgramAction";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { connect } from "react-redux";

const SingleProgramDetails = (props: any) => {
  const { fetchSingleProgramStates } = props;
  const dispatch = useAppDispatch();
  const params = useParams();
  const [programId, setProgramId] = useState(params.id);

  useEffect(() => {
    dispatch(fetchSingleProgram(programId));
  }, [programId]);
  return (
    <>
      <div className="h-screen flex flex-col items-center dark:bg-dark-frame-bg">
        <div className="flex flex-col justify-start mt-24 items-start p-5 w-[95%] lg:w-1/2 md_:mx-auto overflow-hidden bg-white dark:bg-dark-bg">
          <h2 className="dark:text-white text-black font-bold my-5">
            <BsFillPersonLinesFill className="float-left m-1" />
            Program information
          </h2>
          <div className="flex flex-col justify-center gap-3 mb-8">
            {fetchSingleProgramStates?.data != null && (
              <>
                <div className="flex flex-col">
                  <h3 className="dark:text-white text-black">Program title</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleProgramStates.data.title}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="dark:text-white text-black">
                    Program description
                  </h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleProgramStates.data.description}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="dark:text-white text-black">Main objective</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleProgramStates.data.mainObjective}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="dark:text-white text-black">
                    Mode of execution
                  </h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleProgramStates.data.modeOfExecution}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="dark:text-white text-black">Requirements</h3>
                  {fetchSingleProgramStates.data.requirements &&
                    fetchSingleProgramStates.data?.requirements.map(
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
  fetchSingleProgramStates: state.fetchSingleProgram,
});

export default connect(mapState, {
  fetchSingleProgram,
})(SingleProgramDetails);
