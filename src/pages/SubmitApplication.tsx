import { useParams } from 'react-router';
import NavBar from '../components/sidebar/navHeader';
import React, { useEffect } from 'react';
import { fetchSingleJobPost } from '../redux/actions/fetchSingleJobPostAction';
import { connect, useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/hooks';
const banner: string = require('../assets/assets/banner.png').default;

type Props = {};

const SubmitApplication = (props: any) => {
  const { fetchSingleJobPostStates, updateJobPostStates } = props;
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(fetchSingleJobPost(id));
  }, [id]);

  console.log(fetchSingleJobPostStates?.data);

  return (
    <>
      <div className="flex flex-col  h-screen absolute w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div>
              <div className="bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden flex justify-center lg:ml-[5rem] md:ml-0 ">
                {/* form */}
                <div className="flex flex-col w-[60%] dark:bg-dark-tertiary ml-[7rem] mt-[7rem]  mb-[5rem] rounded-lg p-5 md:ml-0 md:w-[90%] ">
                  {/* TITLE */}
                  <div className="flex justify-center">
                    <p className="text-white  font-semibold underline font-size-10">
                      {fetchSingleJobPostStates?.data?.title}
                    </p>
                  </div>
                  {/* DESCRIPTION */}
                  <div className="flex  justify-start width-[80%] ml-3 mt-5">
                    <p className="text-white font-sans">
                      {fetchSingleJobPostStates?.data?.description}
                    </p>
                  </div>
                  {/* REQUIREMENTS */}
                  <div className="flex flex-col justify-start width-[80%] ml-5 mt-5 ">
                    <p className="text-white  font-semibold">
                      Here are the requirements:
                    </p>
                    <ul className="list-disc ml-5">
                      {fetchSingleJobPostStates?.data?.program?.requirements.map(
                        (item: any) => (
                          <li className="text-white font-sans">{item}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  {/* FORM */}
                  <div className="flex justify-center round-md mt-5">
                    <iframe
                      src={fetchSingleJobPostStates?.data?.link}
                      width="640"
                      height="1000"
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};

// export default SubmitApplication;

const mapState = (state: any) => ({
  fetchSingleJobPostStates: state.fetchSingleJobPost,
});

export default connect(mapState, {
  fetchSingleJobPost,
})(SubmitApplication);
