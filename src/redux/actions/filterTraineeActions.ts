import creator from "./creator";
import { GET_ALL_FILTERED_TRAINEES } from "..";
import axios from "axios";



export const getAllFilteredTraineess = ({ page,itemsPerPage,  All, wordEntered, filterAttribute }:any) => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: "http://localhost:4000/",
      // url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
        query FilterTraineesDetails($input: filterOptions) {
          filterTraineesDetails(input: $input) {
            trainee_id {
              lastName
              firstName
              _id
              email
            }
            gender
            birth_date
            Address
            phone
            field_of_study
            education_level
            province
            district
            sector
            cohort
            isEmployed
            haveLaptop
            isStudent
            Hackerrank_score
            english_score
            interview_decision
            past_andela_programs
            _id
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