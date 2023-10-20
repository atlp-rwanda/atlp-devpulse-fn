import { useParams } from 'react-router';
import NavBar from '../../components/sidebar/navHeader';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { fetchSingleJobPost } from '../../redux/actions/fetchSingleJobPostAction';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { connect } from 'react-redux';

const SingleJobPostDetails = (props: any) => {
  const { fetchSingleJobPostStates } = props;
  console.log('fetchSingleJobPostStates:', fetchSingleJobPostStates);
  const dispatch = useAppDispatch();
  const params = useParams();
  const [jobPostId, setjobPostId] = useState(params.id);

  useEffect(() => {
    dispatch(fetchSingleJobPost(jobPostId));
  }, [jobPostId]);
  return (
    <>
      <div className="h-screen flex flex-col items-center dark:bg-dark-frame-bg">
        <div className="flex flex-col justify-start mt-24 items-start p-5 w-[95%] lg:w-1/2 md_:mx-auto overflow-hidden dark:bg-dark-bg">
          <h2 className="text-white font-bold my-5">
            <BsFillPersonLinesFill className="float-left m-1" />
            Job Post information
          </h2>
          <div className="flex flex-col justify-center gap-3 mb-8">
            {fetchSingleJobPostStates?.data != null && (
              <>
                <div className="flex flex-col">
                  <h3 className="text-white">Job title</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleJobPostStates.data.title}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Program</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleJobPostStates.data.program.title}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Cycle</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleJobPostStates.data.cycle.name}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Cohort</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleJobPostStates.data.cohort.title}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Program description</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {fetchSingleJobPostStates.data.description}
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex justify-self-start self-start rounded w-15 px-5 py-2 mt-10 bg-green ml-2 sm:ml-80 text-white transition-colors hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
                >
                  Share Post
                </button>
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
  fetchSingleJobPostStates: state.fetchSingleJobPost,
});

export default connect(mapState, {
  fetchSingleJobPost,
})(SingleJobPostDetails);
