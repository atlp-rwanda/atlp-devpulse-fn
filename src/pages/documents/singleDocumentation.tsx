import { useParams } from "react-router";
import NavBar from "../../components/sidebar/navHeader";
import { BsFillPersonLinesFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { fetchSingleProgram } from "../../redux/actions/fetchSingleProgramAction";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { connect } from "react-redux";

const SingleDocumentationDetails = (props: any) => {
  const { fetchSingleProgramStates } = props;
  const dispatch = useAppDispatch();
  const params = useParams();
  const [programId, setProgramId] = useState(params.docId);

  useEffect(() => {
    dispatch(fetchSingleProgram(programId));
  }, [programId]);

  return (
    <>
      <div className="h-screen flex flex-col items-center dark:bg-dark-frame-bg">
        <div className="flex flex-col justify-start mt-24 items-start p-8 w-full lg:w-full md_:mx-auto overflow-hidden bg-white dark:bg-dark-bg rounded-lg shadow-lg">
          <h2 className="dark:text-white text-black font-bold my-5">
            <BsFillPersonLinesFill className="float-left m-1" />
            Docs Information
          </h2>
          <div className="flex flex-col justify-center gap-5 mb-8">
            {fetchSingleProgramStates?.data != null && (
              <>
                <div className="flex flex-col mb-4">
                  <h3 className="dark:text-white text-black text-lg font-semibold">
                     Title
                  </h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleProgramStates.data.title}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <h3 className="dark:text-white text-black text-lg font-semibold">
                     Description
                  </h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleProgramStates.data.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state: any) => ({
  fetchSingleProgramStates: state.fetchSingleProgram,
});

export default connect(mapState, {
  fetchSingleProgram,
})(SingleDocumentationDetails);
