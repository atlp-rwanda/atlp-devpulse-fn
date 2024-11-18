import {
    createDocsType,
    Action,
  } from "../actiontypes/createDocsActionTypes";
  import axios from "./axiosconfig";
  import { toast } from "react-toastify";
  import { Dispatch } from "react";
  import {
    ActionFetch,
    fetchDocsType,
  } from "../actiontypes/fetchDocsActionTypes";
  
  export const createDocsAction = (docsData: any) => {
    return async (dispatch: Dispatch<Action | ActionFetch>) => {
      dispatch({
        type: createDocsType.CREATE_Docs_LOADING,
      });
  
      try {
        const {
          title,
          description,
        } = docsData;
  
        const response = await axios({
          url: process.env.BACKEND_URL,
          method: "post",
          data: {
            query: `
            mutation CreateDoc($docFields: createDocVariables!) {
              createDoc(docFields: $docFields) {
                id
                title
                description
              }
            }
          `,
            variables: {
                docFields: {
                title,
                description,
              },
            },
          },
        });
  
        if (response.data.data !== null) {
          toast.success("Documentation created");
          dispatch({
            type: createDocsType.CREATE_Docs_SUCCESS,
            message: response.data.data,
          });
          dispatch({
            type: fetchDocsType.Docs_ADDED,
            data: response.data.data.createDoc, 
          });
        } else {
          console.log(response.data);
          toast.error(response.data.errors[0].message);
  
          dispatch({
            type: createDocsType.CREATE_Docs_FAIL,
            error: response.data.errors[0],
          });
        }
      } catch (error) {
        toast.error("Documentation not created");
  
        dispatch({
          type: createDocsType.CREATE_Docs_FAIL,
          error,
        });
        console.log(error);
      }
    };
  };
  