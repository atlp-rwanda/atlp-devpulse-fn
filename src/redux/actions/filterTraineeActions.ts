import creator from "./creator";
import axios from "./axiosconfig";
import { GET_ALL_FILTERED_TRAINEES, SEND_EMAIL, SEND_EMAIL_ERROR } from "..";
import { fetchtrainapplicantcount } from "../actiontypes/deleteactiontype";
import { toast } from "react-toastify";

export const getAllFilteredTraineess =
  ({ page, itemsPerPage, All, wordEntered, filterAttribute }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
        query Query($input: filterOptions) {
          filterTraineesDetails(input: $input) {
            trainee_id {
              lastName
              firstName
              _id
              email
              delete_at
              cycle_id {
                id
                name
                startDate
                endDate
              }
            }
            gender
            birth_date
            phone
            field_of_study
            education_level
            province
            district
            sector
            isEmployed
            haveLaptop
            isStudent
            Hackerrank_score
            english_score
            interview_decision
            past_andela_programs
            _id
            trainee_id {
              lastName
              firstName
              _id
              email
              cycle_id {
                id
                name
                startDate
                endDate
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
      // console.log("result",datas.data.data.filterTraineesDetails);
      const traineesss = await datas.data.data.filterTraineesDetails;
      // console.log( "actionnnnnnnnnnn", traineesss )
      dispatch(creator(GET_ALL_FILTERED_TRAINEES, traineesss));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const getAlltraineeapplicants = () => async (dispatch: any) => {
  try {
    const datas = await axios.post("/", {
      query: `
            query GetAlltraineEAttributescount {
                getAlltraineEAttributescount {
                  total
                }
              }
              `,
    });

    const totalTraineeApllicants = await datas.data.data
      .getAlltraineEAttributescount.total;
    console.log(totalTraineeApllicants);
    dispatch({
      type: fetchtrainapplicantcount.fetchtrainapplicantcount_success,
      data: totalTraineeApllicants,
    });
    return totalTraineeApllicants;
  } catch (error) {
    return 0;
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
