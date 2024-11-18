import {
    deleteDocsType,
    ActionDelete,
  } from "../actiontypes/deleteDocsActionTypes";
  import {
    fetchDocsType,
    ActionFetch,
  } from "../../redux/actiontypes/fetchDocsActionTypes";
  import axios from "./axiosconfig";
  import { toast } from "react-toastify";
  import { Dispatch } from "react";
  
  export const deleteDocsAction = (docsId: any) => {
    return async (dispatch: Dispatch<ActionDelete | ActionFetch>) => {
      dispatch({
        type: deleteDocsType.DELETE_Docs_LOADING,
      });
  
      try {
        const response = await axios({
          url: process.env.BACKEND_URL,
          method: "post",
          data: {
            query: `
            mutation DeleteDoc($deleteDocId: ID!) {
              deleteDoc(id: $deleteDocId) {
                id
                title
                description
              }
            }
          `,
          variables: { deleteDocId: docsId },
          },
        });
  
        if (response.data.data !== null) {
          toast.success("Documentation deleted");
          dispatch({
            type: deleteDocsType.DELETE_Docs_SUCCESS,
            message: response.data.data.deleteDoc,
          });
  
          dispatch({
            type: fetchDocsType.Docs_REMOVED,
            data: response.data.data.deleteDoc,
          });
        } else {
          console.log(response.data);
          toast.error(response.data.errors[0].message);
  
          dispatch({
            type: deleteDocsType.DELETE_Docs_FAIL,
            error: response.data.errors[0],
          });
        }
      } catch (error) {
        toast.error("Documentation not deleted");
  
        dispatch({
          type: deleteDocsType.DELETE_Docs_FAIL,
          error,
        });
        console.log(error);
      }
    };
  };
  