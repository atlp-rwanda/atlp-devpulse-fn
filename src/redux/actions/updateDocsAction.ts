import { updateDocsType, Action } from "../actiontypes/updateDocTypes";
import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  ActionFetch,
  fetchDocsType,
} from "../../redux/actiontypes/fetchDocsActionTypes";

export const updateDocAction = (docsData: any) => {
  return async (dispatch: Dispatch<Action | ActionFetch>) => {
    dispatch({
      type: updateDocsType.UPDATE_Docs_LOADING,
    });

    try {
      const {
        _id,
        title,
        description,
        role
      } = docsData;

      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
            query: `
            mutation UpdateDoc($updateDocId: ID!, $docFields: docUpdate!) {
              updateDoc(id: $updateDocId, docFields: $docFields) {
                id
                title
                description
                role
              }
            }
          `,
          variables: {
            updateDocId: _id,
            docFields: {
              title,
              description,
              role
            },
          },
        },
      });

      if (response.data.data !== null) {
        toast.success("Documentation updated");
        dispatch({
          type: updateDocsType.UPDATE_Docs_SUCCESS,
          message: response.data.data,
        });
      } else {
        console.log(response.data);
        toast.error(response.data.errors[0].message);

        dispatch({
          type: updateDocsType.UPDATE_Docs_FAIL,
          error: response.data.errors[0],
        });
      }
    } catch (error) {
      toast.error("Program not created");

      dispatch({
        type: updateDocsType.UPDATE_Docs_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
