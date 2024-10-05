import creator from "./creator";
import axios from "./axiosconfig";
import { GET_ALL_FILTERED_JOB_POST, SEND_EMAIL, SEND_EMAIL_ERROR } from "..";
import { fetchjobpostcount } from "../actiontypes/deleteactiontype";
import { toast } from "react-toastify";

export const getAllFilteredJobPosts =
  ({ page, itemsPerPage, All, wordEntered, filterAttribute }: any) =>
  async (dispatch: any) => {
    try {
    
      const response = await axios.post("/", {
        query: `
        query FilterJobDetails($input: FilterOptions) {
          filterJobDetails(input: $input) {
            title
            program {
              _id
              description
              duration
              mainObjective
              modeOfExecution
              requirements
              title
            }
            cohort {
              cycle
              end
              id
              program
              start
              title
            }
            cycle {
              startDate
              name
              endDate
            }
            description
            id
            label
          }
        }
      `,
        variables: {
          input: {
            page,
            itemsPerPage,
            All,
            wordEntered,
            filterAttribute,
          },
        },
      });

      const jobs = await response.data.data.filterJobDetails;
      if (jobs.length===0){
        toast.error("No jobs found! Try again")
      }
      console.log('response',jobs) 
      dispatch(creator(GET_ALL_FILTERED_JOB_POST, jobs));
      return jobs
    } catch (error) {
      console.error("Error fetching filtered job posts:", error);
    }
  };

export const getAllJobPosts = () => async (dispatch: any) => {
  try {
    const response = await axios.post("/", {
      query: `
        query GetAllJobAttributescount {
          getAllJobAttributescount {
            total
          }
        }
      `,
    });

    const totalJobPosts = response.data.data.getAllJobAttributescount.total;
    dispatch({
      type: fetchjobpostcount.fetchjobpostcount_success,
      data: totalJobPosts,
    });
  } catch (error) {
    console.error("Error fetching job post count:", error);
  }
};

export const sendBulkyEmail =
  ({ to, subject, html, cc, bcc }: any) =>
  async (dispatch: any) => {
    try {
      const response = await axios.post("/", {
        query: `
        query SendBulkyEmail($params: sendParams) {
          sendBulkyEmail(params: $params) {
            status
            mail_res
          }
        }
      `,
        variables: {
          params: {
            html,
            subject,
            to,
            cc,
            bcc,
          },
        },
      });
      const emailResponse = response.data.data.sendBulkyEmail;

      if (emailResponse.status === "success") {
        toast.success(emailResponse.mail_res);
        dispatch(creator(SEND_EMAIL, emailResponse));
      } else {
        toast.error(emailResponse.mail_res);
        dispatch(creator(SEND_EMAIL_ERROR, emailResponse));
      }
    } catch (error) {
      console.error("Error sending bulk email:", error);
    }
  };