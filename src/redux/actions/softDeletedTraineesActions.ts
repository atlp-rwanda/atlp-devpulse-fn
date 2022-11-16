import creator from "./creator";
import { GET_SOFT_DELETED_TRAINEES, GET_SOFT_DELETED_TRAINEES_ERROR } from "..";
// import axios from "axios";
import axios from "./axiosconfig";

import { toast } from "react-toastify";

export const getAllSoftDeletedTrainees =
  ({ page, itemsPerPage, All, filterAttribute, wordEntered }: any) =>
  async (dispatch: any) => {
    try {
      await axios
        .post("/", {
          query: `
            query GetAllSoftDeletedTrainees($input: filterOptions) {
              getAllSoftDeletedTrainees(input: $input) {
                id
                email
                firstName
                lastName
                delete_at
                cycle_id {
                  id
                  name
                  startDate
                  endDate
                }
              }
            }
            `,
          variables: {
            input: {
              itemsPerPage,
              page,
              All,
              filterAttribute,
              wordEntered,
            },
          },
        })
        .then((response) => {
          if (response.data.data !== null) {
            dispatch(
              creator(
                GET_SOFT_DELETED_TRAINEES,
                response.data.data.getAllSoftDeletedTrainees
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
