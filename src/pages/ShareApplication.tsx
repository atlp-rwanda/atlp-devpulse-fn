import { useParams } from 'react-router';
import NavBar from '../components/sidebar/navHeader';
import React, { useEffect } from 'react';
import { fetchSingleJobPost } from '../redux/actions/fetchSingleJobPostAction';
import { connect, useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/hooks';
import { Link } from 'react-router-dom';

type Props = {};

const ShareApplication = (props: any) => {
  const { fetchSingleJobPostStates, updateJobPostStates } = props;
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleJobPost(id));
  }, [id]);
  return (
      <div className="flex flex-col  h-screen absolute w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div>
              <div className="bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden flex justify-center ">
                <div className="flex flex-col w-[60%] dark:bg-dark-tertiary mt-[7rem]  mb-[5rem] rounded-lg p-5 md:ml-0 md:w-[90%] ">
                  <div className="flex justify-center">
                    <p className="text-white  font-semibold underline font-size-10">{fetchSingleJobPostStates?.data?.title}</p>
                  </div>
                  <div className="flex  justify-start width-[80%] ml-3 mt-5">
                    <p className="text-white font-sans">{fetchSingleJobPostStates?.data?.description}</p>
                  </div>
                  <div className="flex flex-col justify-start width-[80%] ml-5 mt-5 ">
                    <p className="text-white  font-semibold">Here are the requirements:</p>
                    <ul className="list-disc ml-5">
                      {fetchSingleJobPostStates?.data?.program?.requirements.map(
                        (item: any) => (
                          <li className="text-white font-sans">{item}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="flex justify-center mt-5">
                    <Link to={`/jobPost/${id}/apply`}>
                      <button className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer">Apply</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

// export default ShareApplication;

const mapState = (state: any) => ({
  fetchSingleJobPostStates: state.fetchSingleJobPost,
});

export default connect(mapState, {
  fetchSingleJobPost,
})(ShareApplication);
