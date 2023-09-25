import {
  createProgramType,
  Action,
} from "../actiontypes/createProgramActionTypes";
import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";

export const createProgramAction = (programData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: createProgramType.CREATE_PROGRAM_LOADING,
    });

    try {
      const {
        title,
        description,
        mainObjective,
        requirements,
        modeOfExecution,
      } = programData;

      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `mutation createProgram($programInput: ProgramInput!){
            createProgram(programInput: $programInput){
                _id
                description
                mainObjective
                requirements
                modeOfExecution
            }
          }`,
          variables: {
            programInput: {
              title,
              description,
              mainObjective,
              requirements,
              modeOfExecution,
            },
          },
        },
      });

      if (response.data.data !== null) {
        console.log(response.data);
        toast.success("Program created");
        dispatch({
          type: createProgramType.CREATE_PROGRAM_SUCCESS,
          message: response.data.data,
        });
      } else {
        console.log(response.data);
        toast.error(response.data.errors[0].message);

        dispatch({
          type: createProgramType.CREATE_PROGRAM_FAIL,
          error: response.data.errors[0],
        });
      }
    } catch (error) {
      toast.error("Program not created");

      dispatch({
        type: createProgramType.CREATE_PROGRAM_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
