import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  fetchSingleProgramType,
  Action,
} from "../actiontypes/fetchSingleProgramTypes";

export const fetchSingleProgram = (id: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
            query getSingleProgram($id:ID!){ 
             geSingleProgram(id:$id){ 
              _id 
              title 
              description 
              mainObjective 
              requirements 
              modeOfExecution
              }
          }
            `,
          variables: {
            id,
          },
        },
      });
      console.log(response);
      if (response.data.data !== null) {
        dispatch({
          type: fetchSingleProgramType.FETCH_SINGLE_PROGRAM_SUCCESS,
          data: response.data.data.geSingleProgram,
        });
      }

      if (response.data.errors) {
        toast.error("Program could not be fetched");

        let mess;
        response.data.errors.map((b: any) => {
          mess = b.message;
        });
        dispatch({
          type: fetchSingleProgramType.FETCH_SINGLE_PROGRAM_FAIL,
          error: mess,
        });
      }
    } catch (error) {
      toast.error("Program could not be fetched");

      dispatch({
        type: fetchSingleProgramType.FETCH_SINGLE_PROGRAM_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
