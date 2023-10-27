import { updateProgramType, Action } from "../actiontypes/updateProgramTypes";
import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  ActionFetch,
  fetchProgramType,
} from "../../redux/actiontypes/fetchProgramActionTypes";

export const updateProgramAction = (programData: any) => {
  return async (dispatch: Dispatch<Action | ActionFetch>) => {
    dispatch({
      type: updateProgramType.UPDATE_PROGRAM_LOADING,
    });

    try {
      const {
        _id,
        title,
        description,
        mainObjective,
        requirements,
        modeOfExecution,
        duration,
      } = programData;

      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `mutation UpdateProgram($updateProgramInput: updateProgramInput) {
                updateProgram(updateProgramInput: $updateProgramInput) {
                  _id
                  title
                  description
                  mainObjective
                  requirements
                  modeOfExecution
                  duration
                }
              }`,
          variables: {
            updateProgramInput: {
              _id,
              title,
              description,
              mainObjective,
              requirements,
              modeOfExecution,
              duration,
            },
          },
        },
      });

      if (response.data.data !== null) {
        toast.success("Program updated");
        dispatch({
          type: updateProgramType.UPDATE_PROGRAM_SUCCESS,
          message: response.data.data,
        });
      } else {
        console.log(response.data);
        toast.error(response.data.errors[0].message);

        dispatch({
          type: updateProgramType.UPDATE_PROGRAM_FAIL,
          error: response.data.errors[0],
        });
      }
    } catch (error) {
      toast.error("Program not created");

      dispatch({
        type: updateProgramType.UPDATE_PROGRAM_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
