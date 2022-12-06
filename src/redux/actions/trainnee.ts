import creator from "./creator";
// import axios from "axios";
import axios from "./axiosconfig";
import { GET_ONE_TRAINEES_ALL_DETAILS } from "..";

export const getOneTraineeAllDetails =
  ({ id }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
          query GetOneTraineeAllDetails($input: one) {
            getOneTraineeAllDetails(input: $input) {
              gender
              birth_date
              Address
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
              }
            }
          }
        `,
          variables: {
            input: {
              id,
            },
          },
        },
      });

      const response = await datas.data.data.getOneTraineeAllDetails;
      // console.log( response)
      dispatch(creator(GET_ONE_TRAINEES_ALL_DETAILS, response));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
