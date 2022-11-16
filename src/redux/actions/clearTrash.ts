import creator from "./creator";
import { EMPTYING_TRASH } from "..";
import axios from "axios";
import { toast } from "react-toastify";

export const clearTrash = () => async (dispatch: any) => {
  try {
    await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `mutation EmptyRecyclebin {
        emptyRecyclebin {
          ... on NotFoundError {
            message
          }
        }
      }
      `,
        // ,
        //     variables: {
        //       input: {
        //         page,
        //         itemsPerPage,
        //       },
        //     },
      },
    })
      .then((response) => {
        if (response.data.data !== null) {
          toast.success("Trash cleared successfully.");
          dispatch(creator(EMPTYING_TRASH, response.data.data.emptyRecyclebin));
        } else {
          toast.error("Error while clearing trash");
          // dispatch(creator(GET_SOFT_DELETED_TRAINEES_ERROR, err));
        }
      })
      .catch((error) => {
        // dispatch(creator(GET_SOFT_DELETED_TRAINEES_ERROR, error));
        console.log("Dispatch catch error", error);
      });

    // const softDeletedTrainees = await datas.data.data.allSoftDeletedTrainees;
    // dispatch(creator(GET_SOFT_DELETED_TRAINEES_ERROR, softDeletedTrainees));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};
