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
// import axios from "axios";
import { toast } from "react-toastify";
import axios from "./axiosconfig";

export const getAllScoreTypes =
  (variables = {}) =>
  async (dispatch: any) => {
    const query = `
  query GetAllScoreTypes($title: String, $programId: String) {
    getAllScoreTypes(title: $title, programId: $programId) {
      id
      description
      modeOfEngagement
      duration
      startDate
      endDate
      title
      program {
      _id  
      }
    }
  }
  `;

    try {
      const response = await axios.post("/", {
        query,
        variables,
      });

      const assessmentsData = await response.data.data.getAllScoreTypes;
      dispatch(creator(GET_SCORE_TYPES, assessmentsData));
    } catch (error) {
      console.error(error);
    }
  };
export const getOneScoreType =
  (getOneScoreTypeId: any) => async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
	query GetOneScoreType($getOneScoreTypeId: ID!) {
	  getOneScoreType(id: $getOneScoreTypeId) {
		id
    title
    description
    modeOfEngagement
    duration
    startDate
    endDate
    program {
      title
    }
    grading {
      title
    }
	  }
	}
  `,
        variables: {
          getOneScoreTypeId,
        },
      });
      const scoreType = await datas.data.data.getOneScoreType;
      let timestampStart = parseInt(scoreType.startDate);
      let timestampEnd = parseInt(scoreType.endDate);
      let dateStart = new Date(timestampStart);
      let dateEnd = new Date(timestampEnd);

      let startDate = dateStart.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZoneName: "short",
      });
      let endDate = dateEnd.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZoneName: "short",
      });

      let assessment = {
        ...scoreType,
        startDate,
        endDate,
      };
      dispatch(creator(GET_ONE_SCORE_TYPE, assessment));
    } catch (error) {
      console.log(error);
    }
  };

export const createScoreType =
  ({
    description,
    duration,
    endDate,
    modeOfEngagement,
    program,
    startDate,
    title,
  }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios
        .post("/", {
          query: `
          mutation CreateScoreType($input: createScoreType) {
            createScoreType(input: $input) {
              id
              title
              description
              modeOfEngagement
              duration
              startDate
              endDate
              program {
                _id
              }
            }
          }
      `,
          variables: {
            input: {
              description,
              duration: parseInt(duration),
              durationUnit: "month",
              grading: "Pass",
              endDate,
              modeOfEngagement,
              program,
              startDate,
              title,
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

            console.log(response.data);
            toast.error(err);
            dispatch(creator(CREATE_SCORE_ERROR, err));
          }
        })
        .catch((error) => {
          console.log(error);
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
