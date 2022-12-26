import creator from "./creator";
import { LOGIN_USER } from "..";
import axios from "./axiosconfig";
import { toast } from "react-toastify";

export const loginAction = () => async (dispatch: any) => {
  try {
    await axios
      .post("/", {
        query: `query GetUsers_Logged {
                    getUsers_Logged {
                        id
                        createdAt
                        name
                        email
                    }
                }
             `,
      })
      .then((response) => {
        if (response.data.data.getUsers_Logged !== null) {
          console.log("response", response);

          toast.success("successfull Login");
          //   dispatch(creator(LOGIN_USER, response.data.data.emptyRecyclebin));
          // } else {
          //   toast.error("Error while clearing trash");
          //   // dispatch(creator(GET_SOFT_DELETED_TRAINEES_ERROR, err));
        }
        console.log("response Error", response);
        toast.error(response.data.errors[0].message);
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
