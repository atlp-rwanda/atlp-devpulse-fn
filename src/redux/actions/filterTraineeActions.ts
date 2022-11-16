import creator from "./creator";
import { GET_ALL_FILTERED_TRAINEES } from "..";
import axios from "axios";

export const getAllFilteredTraineess =
  ({ page, itemsPerPage, All, wordEntered, filterAttribute }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
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
