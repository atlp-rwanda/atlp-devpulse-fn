import creator from "./creator";
import {
  GET_SCORE_TYPES,
  GET_ONE_SCORE_TYPE,
  CREATE_SCORE_TYPE,
  CREATE_SCORE_ERROR,
  UPDATE_SCORE_TYPE,
  UPDATE_SCORE_ERROR,
  DELETE_SCORE_TYPE,
  DELETE_SCORE_ERROR,
} from "..";
import axios from "axios";
import { toast } from "react-toastify";

export const getAllScoreTypes = () => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
        query getAllScoreTypes {
          getAllScoreTypes {
            id
            score_type
          }
        }
      `,
      },
    });

    const scoreTypes = await datas.data.data.getAllScoreTypes;
    dispatch(creator(GET_SCORE_TYPES, scoreTypes));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};

export const getOneScoreType =
  ({ getOneScoreTypeId }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
        query GetOneScoreType($getOneScoreTypeId: ID!) {
          getOneScoreType(id: $getOneScoreTypeId) {
            id
            score_type
          }
        }
      `,
          variables: {
            getOneScoreTypeId,
          },
        },
      });

      console.log(datas, "datas");

      const scoreType = await datas.data.data.getOneScoreType;
      dispatch(creator(GET_ONE_SCORE_TYPE, scoreType));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const createScoreType =
  ({ score_type }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
        mutation CreateScoreType($input: createScoreType) {
          createScoreType(input: $input) {
            id
            score_type
          }
        }
      `,
          variables: {
            input: {
              score_type,
            },
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Score type successfully created.");
            dispatch(
              creator(CREATE_SCORE_TYPE, response.data.data.createScoreType)
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            dispatch(creator(CREATE_SCORE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(CREATE_SCORE_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const updateScoreType =
  ({ updateScoreTypeId, score_type, id }: any) =>
  async (dispatch: any) => {
    try {
      await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
              mutation UpdateScoreType($updateScoreTypeId: ID!, $input: updateScoreType) {
                updateScoreType(id: $updateScoreTypeId, input: $input) {
                  id
                  score_type
                }
              }
          `,
          variables: {
            updateScoreTypeId,
            input: {
              id,
              score_type,
            },
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Score type successfully updated.");
            dispatch(
              creator(UPDATE_SCORE_TYPE, response.data.data.updateScoreType)
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            dispatch(creator(UPDATE_SCORE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(UPDATE_SCORE_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const deleteScoreType =
  ({ deleteScoreTypeId }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
        mutation deleteScoreType($deleteScoreTypeId: ID!) {
          deleteScoreType(id: $deleteScoreTypeId) {
            id
            score_type
          }
        }
      `,
          variables: {
            deleteScoreTypeId,
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Score type successfully deleted.");
            dispatch(
              creator(DELETE_SCORE_TYPE, response.data.data.deleteScoreType)
            );
          }
          if (response.data.data == null) {
            const err = response.data.errors[0].message;
            toast.success(err);
            dispatch(creator(DELETE_SCORE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(DELETE_SCORE_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
