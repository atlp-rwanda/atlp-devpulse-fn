import {
  createProgramType,
  Action,
} from "../actiontypes/createProgramActionTypes";
import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  ActionFetch,
  fetchProgramType,
} from "../../redux/actiontypes/fetchProgramActionTypes";

export const createProgramAction = (programData: any) => {
  return async (dispatch: Dispatch<Action | ActionFetch>) => {
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
        duration,
      } = programData;

      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `mutation createProgram($programInput: ProgramInput!){
            createProgram(programInput: $programInput){
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
            programInput: {
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
        toast.success("Program created");
        dispatch({
          type: createProgramType.CREATE_PROGRAM_SUCCESS,
          message: response.data.data,
        });
        dispatch({
          type: fetchProgramType.PROGRAM_ADDED,
          data: response.data.data.createProgram,
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
