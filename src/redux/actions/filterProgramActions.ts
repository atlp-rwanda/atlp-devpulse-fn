import creator from "./creator";
import axios from "./axiosconfig";
import { GET_ALL_FILTERED_PROGRAMS, SEND_EMAIL, SEND_EMAIL_ERROR } from "..";
import {fetchprogramcount } from "../actiontypes/deleteactiontype";
import { toast } from "react-toastify";

export const getAllFilteredPrograms =
  ({ page, itemsPerPage, All, wordEntered, filterAttribute }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
        query Query($input: filterOptions) {
          filterProgramsDetails(input: $input) {
            program_id {
              programName
              mainObjective
              _id
              modeOfExecution
              requirements
              delete_at
              cycle_id {
                id
                name
                startDate
                endDate
              }
            }
            duration
            programDescription
            program_id {
                programName
                mainObjective
                _id
                modeOfExecution
                requirements
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
      // console.log("result",datas.data.data.filterProgramsDetails);
      const programs = await datas.data.data.filterProgramsDetails;
      // console.log( "actionnnnnnnnnnn", programs )
      dispatch(creator(GET_ALL_FILTERED_PROGRAMS, programs));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const getAllprograms = () => async (dispatch: any) => {
  try {
    const datas = await axios.post("/", {
      query: `
            query GetAllprogramAttributescount {
                getAllprogramAttributescount {
                  total
                }
              }
              `,
    });

    const totalPrograms = await datas.data.data
      .getAllprogramAttributescount.total;
    console.log(totalPrograms);
    dispatch({
      type: fetchprogramcount.fetchprogramcount_success,
      data: totalPrograms,
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
