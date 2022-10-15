import creator from "./creator";
import { GET_TRAINEE, CREATE_TRAINEES} from "..";
import axios from "axios";

export const getAllTraineess = () => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: "http://localhost:4000/",
      method: "post",
      data: {
        query: `
        query GetAllTrainees {
          getAllTrainees {
            id
            email
            lastname
            firstname
          }
        }
          
      `,
      },
    });
    // console.log("result",datas);
    const trainee = await datas.data.data.getAllTrainees;
    // console.log( trainee)
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
          mutation Mutation($input: newTraineeApplicantInput) {
            createNewTraineeApplicant(input: $input) {
              email
              firstName
              lastName
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
