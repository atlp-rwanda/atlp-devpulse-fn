import creator from "./creator";
import { GET_SOFT_DELETED_TRAINEES, GET_SOFT_DELETED_TRAINEES_ERROR } from "..";
import axios from "axios";
import { toast } from "react-toastify";

export const getAllSoftDeletedTrainees =
  ({ page, itemsPerPage }: any) =>
  async (dispatch: any) => {
    try {
      await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
        query Query($input: pagination) {
            allSoftDeletedTrainees(input: $input) {
                lastName
                firstName
                _id
                email
            }
        }
      `,
          variables: {
            input: {
              page,
              itemsPerPage,
            },
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            dispatch(
              creator(
                GET_SOFT_DELETED_TRAINEES,
                response.data.data.allSoftDeletedTrainees
              )
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            dispatch(creator(GET_SOFT_DELETED_TRAINEES_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(GET_SOFT_DELETED_TRAINEES_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
