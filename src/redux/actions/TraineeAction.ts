import creator from "./creator";
import { GET_TRAINEE, CREATE_TRAINEES} from "..";
import axios from "axios";
export const getAllTraineess = ({ page,itemsPerPage,  All }:any) => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: "http://localhost:4000/",
      method: "post",
      data: {
        query: `
        query AllTraineesDetails($input: pagination) {
          allTraineesDetails(input: $input) {
            gender
            cohort
            trainee_id {
              lastName
              firstName
              email
            }
          }
        }
      `,  variables: {
        input: {
          page,
          itemsPerPage,
          All,
        },
      },

      },
    });
    // console.log("result",datas);
    const trainee = await datas.data.data.allTraineesDetails;
    console.log( trainee)
    dispatch(creator(GET_TRAINEE, trainee));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};

export const createTrainee =
  ({ firstName, lastName, email }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: "http://localhost:4000/",
        method: "post",
        data: {
          query: `
          mutation CreateNewTraineeApplicant($input: newTraineeApplicantInput) {
            createNewTraineeApplicant(input: $input) {
              lastName
              firstName
              email
            }
          }`,
          variables: {
            input: {
              firstName,
              lastName,
              email,
            },
          },
        },
      });
      const response = await datas.data.data.createNewTraineeApplicant;
       console.log(response)
      dispatch(creator(CREATE_TRAINEES, response));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };


  // query AllTraineesDetails($input: pagination) { allTraineesDetails(input: $input) { trainee_id { lastname firstname _id email } gender cohort } } 