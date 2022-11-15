import creator from "./creator";
import { GET_SOFT_DELETED_TRAINEES, GET_SOFT_DELETED_TRAINEES_ERROR } from "..";
// import axios from "axios";
import axios from "./axiosconfig";

import { toast } from "react-toastify";

export const getAllSoftDeletedTrainees =
  ({ page, itemsPerPage }: any) =>
  async (dispatch: any) => {
    try {
      await axios
        .post("/", {
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
            },
          },
        })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Fetched all deleted trainees successfuly.");
            console.log('data',response.data.data.filterTraineesDetails);
            dispatch(
              creator(
                GET_SOFT_DELETED_TRAINEES,
                response.data.data.filterTraineesDetails
                // response.data.data.allSoftDeletedTrainees
              )
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            dispatch(creator(GET_SOFT_DELETED_TRAINEES_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(GET_SOFT_DELETED_TRAINEES_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
