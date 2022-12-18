import creator from "./creator";
import {
  GET_SCORE_VALUES,
  CREATE_SCORE_VALUES,
  CREATE_SCORE_VALUE_ERROR,
  UPDATE_SCORE_VALUE,
  UPDATE_SCORE_VALUE_ERROR,
  DELETE_SCORE_VALUE,
  DELETE_SCORE_VALUE_ERROR,
  UPDATE_MANY_SCORE_VALUES,
} from "..";
import axios from "axios";
import { toast } from "react-toastify";

const urlId = window.location.href.substring(
  window.location.href.lastIndexOf("/") + 1
);
const data = JSON.parse(localStorage.getItem(`Data${urlId}`) || "[]");

data.forEach((value: any) => {
  delete value.name;
});

export const getAllScoreValues = () => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
        query getAllScoreValues {
          getAllScoreValues {
              id
              score_value
              attr_id {
                _id
                trainee_id {
                  firstName
                  lastName
                  email
                  _id
                } 
              }
              score_id {
                id
                score_type
              }
          }
        }
      `,
      },
    });
    const scoreValues = await datas.data.data.getAllScoreValues;
    dispatch(creator(GET_SCORE_VALUES, scoreValues));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};

export const createScoreValue = () => async (dispatch: any) => {
  try {
    await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
        mutation createScoreValue($input: [createScoreValue]) {
            createScoreValue(input: $input) {
                score_value
                id
            }
        }
        `,
        variables: {
          input: data,
        },
      },
    })
      .then((response) => {
        if (
          response.data.data !== null &&
          response.data.data.createScoreValue !== null
        ) {
          toast.success("Value successfully created.");
          dispatch(
            creator(CREATE_SCORE_VALUES, response.data.data.createScoreValue)
          );
        } else {
          const err = response.data.errors[0].message;

          toast.error(err);
          dispatch(creator(CREATE_SCORE_VALUE_ERROR, err));
        }
      })
      .catch((error) => {
        dispatch(creator(CREATE_SCORE_VALUE_ERROR, error));
      });
  } catch (error) {
    console.log(error);

    return dispatch(creator(CREATE_SCORE_VALUE_ERROR, error));
  }
};

export const updateScoreValue =
  ({ updateScoreValueId, id, score_value }: any) =>
  async (dispatch: any) => {
    try {
      await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
          mutation UpdateScoreValue($updateScoreValueId: ID!, $input: updateScoreValue) {
            updateScoreValue(id: $updateScoreValueId, input: $input) {
              id
              score_value
            }
          }
          `,
          variables: {
            updateScoreValueId,
            input: {
              id,
              score_value,
            },
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Score value successfully updated.");
            dispatch(
              creator(UPDATE_SCORE_VALUE, response.data.data.updateScoreValue)
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            dispatch(creator(UPDATE_SCORE_VALUE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(UPDATE_SCORE_VALUE_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const updateManyScoreValues =
  (updateData: any) => async (dispatch: any) => {
    try {
      await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
          mutation UpdateManyScoreValues($input: [updateManyScoreValue]) {
            updateManyScoreValues(input: $input) {
              id
              score_value
            }
          }
          `,
          variables: {
            input: updateData,
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Score values successfully updated.");
            dispatch(
              creator(
                UPDATE_MANY_SCORE_VALUES,
                response.data.data.updateManyScoreValues
              )
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            dispatch(creator(UPDATE_SCORE_VALUE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(UPDATE_SCORE_VALUE_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const deleteScoreValue =
  ({ deleteScoreValueId }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
        mutation DeleteScoreValue($deleteScoreValueId: ID!) {
          deleteScoreValue(id: $deleteScoreValueId) {
            id
            score_value
          }
        }
      `,
          variables: {
            deleteScoreValueId,
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Score Value successfully deleted.");
            dispatch(
              creator(DELETE_SCORE_VALUE, response.data.data.deleteScoreValue)
            );
          }
          if (response.data.data == null) {
            const err = response.data.errors[0].message;
            toast.success(err);
            dispatch(creator(DELETE_SCORE_VALUE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(DELETE_SCORE_VALUE_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
