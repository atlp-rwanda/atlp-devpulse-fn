import creator from "./creator";
import {
  GET_ONE_TRAINEE_SCORE,
  UPDATE_TRAINEE_SCORE,
  CREATE_TRAINEE_SCORE,
} from "..";
import axios from "axios";
import { toast } from "react-toastify";

export const getTraineeAttributes =
  ({ id }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
        query GetAllTraineeDetails($input: one) {
        getAllTraineeDetails(input: $input) {    
          Hackerrank_score
          english_score
          interview_decision
          home_challenge
          _id
          attr_id {
            Hackerrank_score
            trainee_id {
              _id
            }
          }

        }
      }
      `,
          variables: {
            input: {
              id,
            },
          },
        },
      });

      const traineeAttr = await datas.data.data.getAllTraineeDetails;
      dispatch(creator(GET_ONE_TRAINEE_SCORE, traineeAttr));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const createTraineeScores =
  ({ score_id, attr_id, score_value }: any) =>
  async (dispatch: any) => {
    try {
      await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
          mutation createScoreValue($input: createScoreValue) {
            createScoreValue(input: $input) {
                id
            }
            }
          `,
          variables: {
            input: {
              attr_id,
              score_id: "636ad6171df1f8c4142d3834",
              score_value,
            },
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Rating successfully created.");
            dispatch(
              creator(CREATE_TRAINEE_SCORE, response.data.data.createScoreValue)
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            console.log(err);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
export const updateTraineeAttributes =
  ({
    Hackerrank_score,
    english_score,
    interview_decision,
    home_challenge,
    id,
  }: any) =>
  async (dispatch: any) => {
    try {
      await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
          mutation UpdateTraineeScores($id: ID!, $scoreUpdateInput: traineeUpdateScoresInput) {
            updateTraineeScores(ID: $id, scoreUpdateInput: $scoreUpdateInput) {
              Hackerrank_score
              english_score
              interview_decision
              _id
              attr_id
            }
          }
          `,
          variables: {
            id,
            scoreUpdateInput: {
              Hackerrank_score,
              english_score,
              interview_decision,
              home_challenge,
            },
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Rating successfully updated.");
            dispatch(
              creator(
                CREATE_TRAINEE_SCORE,
                response.data.data.updateTraineeScores
              )
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            console.log(err);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
