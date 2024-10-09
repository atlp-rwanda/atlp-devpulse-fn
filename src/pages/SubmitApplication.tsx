import { useParams } from "react-router";
import NavBar from "../components/sidebar/navHeader";
import React, { useEffect, useState } from "react";
import { fetchSingleJobPost } from "../redux/actions/fetchSingleJobPostAction";
import { connect, useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import axios from "axios";

type Props = {};

const SubmitApplication = (props: any) => {
  const { fetchSingleJobPostStates } = props;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleJobPost(id));
  }, [id]);

  const handleSaveApplication = async () => {
    const { spreadsheetlink, formrange } = fetchSingleJobPostStates?.data || {};

    if (!spreadsheetlink || !formrange) {
      showErrorToast("Missing spreadsheet link or form range");
      return;
    }

    setLoading(true);

    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "POST",
        data: {
          query: `
          mutation SaveSheetData($sheetLink: String!, $range: String!) {
            saveSheetData(sheetLink: $sheetLink, range: $range)
          }
          `,
          variables: {
            sheetLink: fetchSingleJobPostStates?.data?.spreadsheetlink,
            range: fetchSingleJobPostStates?.data?.formrange,
          },
        },
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      if (response.data.data?.saveSheetData) {
        showSuccessToast("Application saved successfully!");
        window.location.href = "/#/applications";
      } else {
        throw new Error("Failed to save application data");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Failed to save application";

      showErrorToast(errorMessage);
      console.error("Save application error:", error);
    } finally {
      setLoading(false);
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
                <iframe
                  src={fetchSingleJobPostStates.data.link}
                  width="100%"
                  height="740"
                  className="w-full"
                >
                  Loading…
                </iframe>
              </div>

              {/* SAVE BUTTON */}
              <div className="flex justify-center w-full">
                <button
                  onClick={handleSaveApplication}
                  disabled={loading}
                  className={`
                    flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 
                    text-white font-medium transition-opacity duration-200
                    ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:opacity-90"
                    }
                  `}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Application"
                  )}
                </button>
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
