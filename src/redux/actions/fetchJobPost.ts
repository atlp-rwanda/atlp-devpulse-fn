import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  fetchJobPostType,
  ActionFetch,
} from "../actiontypes/fetchJobActionTypes";

export const fetchJobPost = () => async (dispatch: Dispatch<ActionFetch>) => {
  try {
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
          query GetAllJobApplication($input: pagination) {
            getAllJobApplication(input: $input) {
              id
              program { title }
              cycle { name }
              cohort { title }
              link
              title
              description
              label
              published
              spreadsheetlink
            }
          }
        `,
        variables: {
          input: { page: 1, All: true },
        },
      },
    });

    const { data, errors } = response.data;

    if (data && data.getAllJobApplication) {
      dispatch({
        type: fetchJobPostType.FETCH_JOB_POST_SUCCESS,
        data: data.getAllJobApplication,
      });
    } else if (errors) {
      const errorMessage = errors.map((error: any) => error.message).join(", ");
      toast.error("Job Post could not be fetched");
      dispatch({
        type: fetchJobPostType.FETCH_JOB_POST_FAIL,
        error: errorMessage,
      });
    }

    return response;
  } catch (error) {
    toast.error("Job Post could not be fetched");
    dispatch({
      type: fetchJobPostType.FETCH_JOB_POST_FAIL,
      error: error instanceof Error ? error.message : "Unexpected error",
    });
    console.error(error);
  }
};
