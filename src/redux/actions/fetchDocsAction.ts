import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  fetchDocsType,
  ActionFetch,
} from "../actiontypes/fetchDocsActionTypes";
import { GET_DOCS_BY_ROLE } from "redux";
import creator from "./creator";

export const fetchDocs = () => {
  return async (dispatch: Dispatch<ActionFetch>) => {
    dispatch({ type: fetchDocsType.FETCH_Docs_LOADING });
    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
            query GetAllDocs {
              getAllDocs {
                    id
                    title
                    description
                    role
                  }
          }
          `,
        },
      });
      console.log("Fetched data:", response);
      if (response.data !== null) {
        dispatch({
          type: fetchDocsType.FETCH_Docs_SUCCESS,
          data: response.data.data.getAllDocs,
        });
      }

      if (response.data.errors) {
        console.log(response.data.errors);
        toast.error(response.data.errors[0].message);
        return { data: null, error: response.data.errors[0].message };

        let mess;
        response.data.errors.map((b: any) => {
          mess = b.message;
        });
        dispatch({
          type: fetchDocsType.FETCH_Docs_FAIL,
          error: mess,
        });
      }
    } catch (error) {
      toast.error("Oops! unexpected error occured");

      dispatch({
        type: fetchDocsType.FETCH_Docs_FAIL,
        error,
      });
      console.log(error);
    }
  };
};

export const getDocsByRole = (role:any) => async (dispatch: any) => {
  try {
    const response = await axios.post("/", {
      query: `
          query Query($role: String!) {
            getDocByRole(role: $role) {
              id
              title
              description
              role
            }
          }
      `,
      variables: {
        role: role,
      },
    });

    const documents = await response.data.data.getDocByRole;
    if (documents.length === 0) {
      toast.error("No documents found!");
    }
    console.log("response", documents);
    dispatch(creator(GET_DOCS_BY_ROLE, documents));
    return documents;
  } catch (error) {
    console.error("Error fetching document", error);
  }
};
