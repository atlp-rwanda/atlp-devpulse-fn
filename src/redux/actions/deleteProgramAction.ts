import {
  deleteProgramType,
  ActionDelete,
} from "../actiontypes/deleteProgramActionTypes";
import {
  fetchProgramType,
  ActionFetch,
} from "../../redux/actiontypes/fetchProgramActionTypes";
import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";

export const deleteProgramAction = (programData: any) => {
  return async (dispatch: Dispatch<ActionDelete | ActionFetch>) => {
    dispatch({
      type: deleteProgramType.DELETE_PROGRAM_LOADING,
    });

    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `mutation DeleteProgram($id: String!) {
                deleteProgram(_id: $id) {
                  title
                  description
                  mainObjective
                  requirements
                  modeOfExecution
                  duration
                  _id
                }
              }`,
          variables: {
            id: programData.id,
          },
        },
      });

      if (response.data.data !== null) {
        toast.success("Program deleted");
        dispatch({
          type: deleteProgramType.DELETE_PROGRAM_SUCCESS,
          message: response.data.data.deleteProgram,
        });

        dispatch({
          type: fetchProgramType.PROGRAM_REMOVED,
          data: response.data.data.deleteProgram,
        });
      } else {
        console.log(response.data);
        toast.error(response.data.errors[0].message);

        dispatch({
          type: deleteProgramType.DELETE_PROGRAM_FAIL,
          error: response.data.errors[0],
        });
      }
    } catch (error) {
      toast.error("Program not deleted");

      dispatch({
        type: deleteProgramType.DELETE_PROGRAM_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
