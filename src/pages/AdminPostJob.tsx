import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import NavBar from '../components/sidebar/navHeader';
import {
  BsShareFill,
  BsBackspace,
  BsLinkedin,
  BsTwitter,
} from 'react-icons/bs';
import {
  FiMail,
} from 'react-icons/Fi';
import { fetchSingleJobPost } from '../redux/actions/fetchSingleJobPostAction';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

function AdminPostJob(props: any) {
  const url = window.location.href;

  const { fetchSingleJobPostStates } = props;
  console.log('fetchSingleJobPostStates:', fetchSingleJobPostStates);
  const dispatch = useAppDispatch();
  const params = useParams();
  const [jobPostId, setjobPostId] = useState(params.id);

  useEffect(() => {
    dispatch(fetchSingleJobPost(jobPostId));
  }, [jobPostId]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center dark:bg-dark-frame-bg">
        <div className="flex flex-col justify-start mt-24 items-start p-5 w-[95%] h-[75%] lg:w-1/2 md_:mx-auto overflow-hidden bg-white dark:bg-dark-bg">
          <a href="/sharedPosts#/job-post">
            <h2 className="text-black font-bold my-5">
              <BsBackspace className="float-left m-1" />
              Back
            </h2>
          </a>
          <h2 className="dark:text-white text-black font-bold my-5">
            <div className="float-left m-1" />
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
                <div className="relative inline-block">
                  <button
                    id="dropdownDelayButton"
                    data-dropdown-toggle="dropdownDelay"
                    data-dropdown-delay="500"
                    data-dropdown-trigger="hover"
                    className="text-white focus:ring-4 focus:outline-none focus:#56C870 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-[#56C870] dark:hover:bg-[#56C870] dark:focus:#56C870"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    Share Via{' '}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div
                      id="dropdownDelay"
                      className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <BsLinkedin
                            className="float-left m-1"
                            style={{ display: 'inline-block' }}
                          />
                          <a
                            href={`https://www.linkedin.com/shareArticle?url=/jobPost/:id/apply`}
                            target="_blank"
                          >
                            LinkedIn
                          </a>
                        </li>
                        <li>
                          <FiMail
                            className="float-left m-1"
                            style={{ display: 'inline-block' }}
                          />
                          <a
                            href={`mailto:?subject=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&body=${url}`}
                            target="_blank"
                          >
                            Gmail
                          </a>
                        </li>
                        <li>
                          <BsTwitter
                            className="float-left m-1"
                            style={{ display: 'inline-block' }}
                          />
                          <a
                            href={`https://twitter.com/intent/tweet?url=${url}`}
                            target="_blank"
                          >
                            Twitter
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapState = (state: any) => ({
  fetchSingleJobPostStates: state.fetchSingleJobPost,
});

export default connect(mapState, {
  fetchSingleJobPost,
})(AdminPostJob);
