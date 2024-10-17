import { useParams } from "react-router";
import NavBar from "../components/sidebar/navHeader";
import React, { useEffect, useState } from "react";
import { fetchSingleJobPost } from "../redux/actions/fetchSingleJobPostAction";
import { connect, useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import axios from "axios";
import jwtDecode from "jwt-decode";

type Props = {};
interface data {
  data:{
    userId: string;
    email: string;
  }
}

const SubmitApplication: React.FC = (props: any) => {
  const { fetchSingleJobPostStates } = props;
  const dispatch = useDispatch();
  const { id } = useParams();
  const loggedUser:data | null = localStorage.getItem('access_token') ? jwtDecode(localStorage.getItem('access_token') as string) : null;
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchSingleJobPost(id));
  }, [id]);
console.log(fetchSingleJobPostStates)
  const validateLink = (link:string) => {
    
    const userIdPattern = /entry\.\d+=USERID/;
    const userEmailPattern = /entry\.\d+=USEREMAIL/;
    const jobTitlePatten = /entry\.\d+=JOBTITLE/;
  
    const isValidUserId = userIdPattern.test(link);
    const isValidUserEmail = userEmailPattern.test(link);
    const isValidJobTitle = jobTitlePatten.test(link);

    if(isValidUserId && isValidUserEmail && isValidJobTitle){
      const updateLink = link.replace('USERID',(loggedUser?.data?.userId) as string).replace('USEREMAIL',(loggedUser?.data?.email) as string).replace('JOBTITLE',(fetchSingleJobPostStates.data.title))
      return updateLink;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center dark:bg-dark-frame-bg w-full">
        <div className="flex flex-col justify-start mt-24 items-start p-5 w-[95%] lg:w-[85%] xl:w-[80%] md_:mx-auto overflow-hidden dark:bg-dark-bg">
          {fetchSingleJobPostStates?.data && (
            <div className="w-full">
              {/* TITLE */}
              <div className="flex justify-center mb-8">
                <p className="text-white text-xl font-semibold underline">
                  {fetchSingleJobPostStates.data.title}
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="flex justify-start w-full mb-8">
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {fetchSingleJobPostStates.data.description}
                </p>
              </div>

              {/* REQUIREMENTS */}
              <div className="flex flex-col w-full mb-8">
                <p className="text-white font-semibold mb-4">
                  Here are the requirements:
                </p>
                <ul className="list-disc ml-5">
                  {fetchSingleJobPostStates.data.program?.requirements?.map(
                    (item: any, index: number) => (
                      <li
                        key={index}
                        className="text-gray-500 text-sm dark:text-gray-400 mb-2"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* FORM */}
              <div className="flex justify-center w-full mb-8">

                <a
                  // href={`${fetchSingleJobPostStates.data.link}&entry.978913318=${loggedUser?.data?.userId}`}
                  href={`${validateLink(fetchSingleJobPostStates.data.link)}`}
                  target="_blank"
                  className="bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 
                    text-white font-medium transition-opacity duration-200"
                >
                  Apply here
                </a>
              </div>
            </div>
          )}
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
})(SubmitApplication);
