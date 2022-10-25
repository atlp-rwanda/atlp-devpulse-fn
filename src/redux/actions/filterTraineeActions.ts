import creator from "./creator";
import { GET_ALL_FILTERED_TRAINEES } from "..";
import axios from "axios";



export const getAllFilteredTraineess = ({ page,itemsPerPage,  All, wordEntered, filterAttribute }:any) => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
        query FilterTraineesDetails($input: filterOptions) {
            filterTraineesDetails(input: $input) {
              gender
              birth_date
              trainee_id {
                lastname
                firstname
                _id
                email
              }
              education_level
              isEmployed
              Address
              phone
              field_of_study
              province
              district
              sector
              cohort
              haveLaptop
              Hackerrank_score
              isStudent
              english_score
              interview_decision
              past_andela_programs
            }
          }
      `,  variables: {
        input: {
          page,
          itemsPerPage,
          All,
          wordEntered,
          filterAttribute
        },
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