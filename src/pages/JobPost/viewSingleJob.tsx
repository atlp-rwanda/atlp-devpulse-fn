import { useParams } from "react-router";
import NavBar from "../../components/sidebar/navHeader";
import { BsFillPersonLinesFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { fetchSingleJobPost } from "../../redux/actions/fetchSingleJobPostAction";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { connect } from "react-redux";
import { FaLinkedin, FaTelegram, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';

const SingleJobPostDetails = (props: any) => {
  const { fetchSingleJobPostStates } = props;
  const dispatch = useAppDispatch();
  const params = useParams();
  const [jobPostId, setjobPostId] = useState(params.id);

  useEffect(() => {
    dispatch(fetchSingleJobPost(jobPostId));
  }, [jobPostId]);

  const shareMessage = `Check out this job opportunity: ${fetchSingleJobPostStates?.data?.title}\n${window.location.href}`;

  const shareOnTwitterDM = () => {
    const url = `https://twitter.com/messages/compose?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareOnTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };

  const shareOnGmail = () => {
    const subject = encodeURIComponent("Interesting Job Opportunity");
    const body = encodeURIComponent(shareMessage);
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
    window.open(url, "_blank");
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center dark:bg-dark-frame-bg">
        <div className="flex flex-col justify-start mt-24 items-start p-5 w-[95%] md_:mx-auto overflow-hidden dark:bg-dark-bg">
          <h2 className="text-white font-bold my-5">
            <BsFillPersonLinesFill className="float-left m-1" />
            Job Post information
          </h2>
          <div className="flex flex-col justify-center gap-3 mb-8">
            {fetchSingleJobPostStates?.data != null && (
              <>
                <div className="flex flex-col">
                  <h3 className="text-white">Job title</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{fetchSingleJobPostStates.data.title}</p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Program</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{fetchSingleJobPostStates.data.program.title}</p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Cycle</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{fetchSingleJobPostStates.data.cycle.name}</p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Cohort</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{fetchSingleJobPostStates.data.cohort.title}</p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white">Program description</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{fetchSingleJobPostStates.data.description}</p>
                </div>
                <div className="text-white">Share Job Post</div>
                <div className="flex fle gap-4 mt-6">
                  <button onClick={shareOnTwitterDM} className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors">
                    <FaTwitter />
                  </button>
                  <button onClick={shareOnWhatsApp} className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded hover:bg-green-600 transition-colors">
                    <FaWhatsapp />
                  </button>
                  <button onClick={shareOnTelegram} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    <FaTelegram />
                  </button>
                  <button onClick={shareOnLinkedIn} className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition-colors">
                    <FaLinkedin />
                  </button>
                  <button onClick={shareOnGmail} className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 transition-colors">
                    <FcGoogle size={20} />
                  </button>
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
  fetchSingleJobPostStates: state.fetchSingleJobPost,
});

export default connect(mapState, {
  fetchSingleJobPost,
})(SingleJobPostDetails);
