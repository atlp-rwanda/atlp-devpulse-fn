import creator from "./creator";
import {EMPTYING_TRASH } from "..";
import axios from './axiosconfig';
import { toast } from "react-toastify";

export const clearTrash =
  () =>
  async (dispatch: any) => {
    try {
    await axios.post('/',
       {
          query:

      `mutation EmptyRecyclebin {
        emptyRecyclebin {
          ... on NotFoundError {
            message
          }
        }
      }
      `
  
        },
      )
      
      
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Trash cleared successfully.");
            dispatch(
              creator(
                EMPTYING_TRASH,
                response.data.data.emptyRecyclebin
              )
            );
          } else {
            toast.error("Error while clearing trash");
          }
        })
        .catch((error) => {
          console.log("Dispatch catch error", error);
        });


    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };