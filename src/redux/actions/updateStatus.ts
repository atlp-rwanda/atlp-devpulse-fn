import creator from "./creator";
// import axios from "axios";
import axios from "./axiosconfig";
import { UPDATE_TRAINEE_STATUS } from "..";

export const updateTraineeStatus =
  ({ id, status }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
            mutation UpdateTraineeApplicant($id: ID!, $updateInput: traineeApplicantInputUpdate) {
            updateTraineeApplicant(ID: $id, updateInput: $updateInput) {
              lastName
              firstName
              _id
              email
              delete_at
              status
              id
            }
          }
        `,
        variables: {
          id: id,
          updateInput: {
            status: status,
          },
        },
      });

      const response = await datas.data.data.updateTraineeApplicant;
      dispatch(creator(UPDATE_TRAINEE_STATUS, response));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
