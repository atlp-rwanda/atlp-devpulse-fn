import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  fetchSingleDocsType,
  Action,
} from "../actiontypes/fetchSingleDocActionTypes";

export const fetchSingleDocs = (id: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
            query: `
            query GetDoc($getDocId: ID!) {
              getDoc(id: $getDocId) {
                id
                title
                description
                role
              }
            }
          `,
          variables: {
            getDocId:id,
          },
        },
      });

      console.log(response);
      if (response.data.data !== null) {
        dispatch({
          type: fetchSingleDocsType.FETCH_SINGLE_Docs_SUCCESS,
          data: response.data.data.getDoc,
        });
      }

      if (response.data.errors) {
        toast.error("Documentation could not be fetched");

        let mess;
        response.data.errors.map((b: any) => {
          mess = b.message;
        });
        dispatch({
          type: fetchSingleDocsType.FETCH_SINGLE_Docs_FAIL,
          error: mess,
        });
      }
    } catch (error) {
      toast.error("Documentation could not be fetched");

      dispatch({
        type: fetchSingleDocsType.FETCH_SINGLE_Docs_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
