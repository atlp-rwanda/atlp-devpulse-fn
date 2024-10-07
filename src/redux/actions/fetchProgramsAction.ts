import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  fetchProgramType,
  ActionFetch,
} from "../actiontypes/fetchProgramActionTypes";

export const fetchPrograms = (pageDetails: any) => {
  return async (dispatch: Dispatch<ActionFetch>) => {
    dispatch({ type: fetchProgramType.FETCH_PROGRAM_LOADING });
    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
            query getAll($data:Page!){ 
              getAll(data:$data){ 
              _id 
              title 
              description 
              mainObjective 
              requirements 
              duration
              modeOfExecution
              }
          }
            `,
          variables: {
            data: {
              page: pageDetails.page,
              pageSize: pageDetails.pageSize,
            },
          },
        },
      });
      if (response.data.data !== null) {
        dispatch({
          type: fetchProgramType.FETCH_PROGRAM_SUCCESS,
          data: response.data.data.getAll,
        });
      }

      if (response.data.errors) {
        toast.error("Programs could not be fetched");

        let mess;
        response.data.errors.map((b: any) => {
          mess = b.message;
        });
        dispatch({
          type: fetchProgramType.FETCH_PROGRAM_FAIL,
          error: mess,
        });
      }
    } catch (error) {
      toast.error("Programs could not be fetched");

      dispatch({
        type: fetchProgramType.FETCH_PROGRAM_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
