import creator from "./creator";
import axios from "./axiosconfig";
import { UPDATE_TRAINEE_STATUS } from "..";
import { toast } from "react-toastify";

export const updateTraineeStatus =
  ({ id, status, cycle_id }: any) =>
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
            cycle_id: cycle_id,
          },
        },
      });
     console.log(datas)
      const response = await datas.data.data.updateTraineeApplicant;
      if (response !== null) {
        toast.success("Status updated successfully.");
        dispatch(creator(UPDATE_TRAINEE_STATUS, response));
      } else {
        toast.error("Error while Updating status");
      }
    } catch (error) {
      console.log(error)
      if (error) {
        return console.log(error);
      }
    }
  };
