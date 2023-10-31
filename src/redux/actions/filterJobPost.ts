import creator from "./creator";
import axios from "./axiosconfig";
import { GET_ALL_FILTERED_JOB_POST, SEND_EMAIL, SEND_EMAIL_ERROR } from "..";
import {fetchjobpostcount } from "../actiontypes/deleteactiontype";
import { toast } from "react-toastify";

export const getAllFilteredJobPosts =
  ({ page, itemsPerPage, All, wordEntered, filterAttribute }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
        query Query($input: filterOptions) {
          filterJobPostsDetails(input: $input) {
            jobPost_id {
              jobTitle
              program
              _id
              cycle
              cohort
              delete_at
              cycle_id {
                id
                name
                startDate
                endDate
              }
            }
            duration
            description
            jobPost_id {
                jobTitle
                program
                _id
                cycle
                cohort
                delete_at
                cycle_id {
                  id
                  name
                  startDate
                  endDate
                }
              }
              delete_at
              status
            }
          
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
      // console.log("result",datas.data.data.filterJobPostsDetails);
      const jobs = await datas.data.data.filterJobPostsDetails;
      // console.log( "actionnnnnnnnnnn", jobs )
      dispatch(creator(GET_ALL_FILTERED_JOB_POST, jobs));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const getAllJobPosts = () => async (dispatch: any) => {
  try {
    const datas = await axios.post("/", {
      query: `
            query GetAllJobPostAttributescount {
                getAllJobPostAttributescount {
                  total
                }
              }
              `,
    });

    const totalJobPosts = await datas.data.data
      .getAllJobPostAttributescount.total;
    console.log(totalJobPosts);
    dispatch({
      type: fetchjobpostcount.fetchjobpostcount_success,
      data: totalJobPosts,
    });
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};

export const sendBulkyEmail =
  ({ to, subject, html, cc, bcc }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
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
      const emailResponse = await datas.data.data.sendBulkyEmail;

      if (emailResponse.status === "success") {
        toast.success(emailResponse.mail_res);
        dispatch(creator(SEND_EMAIL, emailResponse));
      } else {
        toast.error(emailResponse.mail_res);
        dispatch(creator(SEND_EMAIL_ERROR, emailResponse));
      }
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
