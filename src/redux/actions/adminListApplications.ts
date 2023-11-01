import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  fetchApplicationsType,
  ActionFetchApplications,
} from "../actiontypes/fetchApplicationsActionTypes"; // Import your action types
// Updated fetchApplications action
export const fetchApplications = () => {
  return async (dispatch) => {
    dispatch({ type: fetchApplicationsType.FETCH_APPLICATIONS_LOADING });
    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
            query {
              adminViewApplications {
                applications {
                  _id
                  firstName
                  lastName
                  email
                  telephone
                  availability_for_interview
                  gender
                  resume
                  comments
                  address
                  status
                  dateOfSubmission
                  formUrl
                  associatedFormData {
                    _id
                    title
                    description
                    link
                    jobpost {
                      _id
                      title
                      cycle {
                        id
                        name
                        startDate
                        endDate
                      }
                      program {
                        _id
                        title
                        description
                        mainObjective
                        requirements
                        modeOfExecution
                        duration
                      }
                      cohort {
                        id
                        title
                        start
                        end
                      }
                      link
                      description
                      label
                    }
                  }
                }
              }
            }
          `,
        },
      });

      if (response.data.data && response.data.data.adminViewApplications) {
        dispatch({
          type: fetchApplicationsType.FETCH_APPLICATIONS_SUCCESS,
          data: response.data.data.adminViewApplications.applications,
        });
      } else if (response.data.errors) {
        const errorMessages = response.data.errors.map((error) => error.message);
        toast.error("Applications could not be fetched");
        dispatch({
          type: fetchApplicationsType.FETCH_APPLICATIONS_FAIL,
          error: errorMessages.join(", "),
        });
      } else {
        // Handle the case where adminViewApplications is null or missing
        dispatch({
          type: fetchApplicationsType.FETCH_APPLICATIONS_FAIL,
          error: "adminViewApplications is null or missing in the response data.",
        });
      }
    } catch (error: any) { // Specify the type here
      console.error(error); // Log the error for debugging
      toast.error("Applications could not be fetched: " + error.toString());
      dispatch({
        type: fetchApplicationsType.FETCH_APPLICATIONS_FAIL,
        error: error.toString(),
      });
    }
  };
};

  
  