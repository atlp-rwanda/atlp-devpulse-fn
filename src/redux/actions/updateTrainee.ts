import creator from "./creator";
import axios from "./axiosconfig";

import {
  GET_TRAINEE_TO_UPDATE_FAIL,
  UPDATE_TRAINEE,
  UPDATE_TRAINEE_FAIL,
  UPDATE_TRAINEE_ATTRIBUTE,
  UPDATE_TRAINEE_ATTRIBUTE_FAIL,
} from "..";
import { GET_TRAINEE_TO_UPDATE } from "..";

export const getTraineeToUpdate = (Traineid: any) => async (dispatch: any) => {
  try {
    const datas = await axios.post("/", {
      query: `
      query GetOneTraineeAllDetails($input: One) {
        getOneTraineeAllDetails(input: $input) {
          gender
          birth_date
          address
          phone
          study
          education_level
          province
          district
          sector
          isEmployed
          haveLaptop
          isStudent
          Hackerrank_score
          english_score
          interview_decision
          andelaPrograms
          _id
          trainee {
            lastName
            firstName
            _id
            email
            cycle_id {
              _id
              name

            }
          }
        }
      }
      `,
      variables: {
        input: {
          id: Traineid,
        },
      },
    });

    const response = await datas.data.data.getOneTraineeAllDetails;
    console.log("Response data:", response)
    return dispatch(creator(GET_TRAINEE_TO_UPDATE, response));
  } catch (error) {
    console.log(error);
    return dispatch(creator(GET_TRAINEE_TO_UPDATE_FAIL, error));
  }
};

export const updateTraine =
  ({ id, firstName, lastName, cycle_id }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
      mutation UpdateTraineeApplicant($id: ID!, $updateInput: traineeApplicantInputUpdate) {
          updateTraineeApplicant(ID: $id, updateInput: $updateInput) {
            lastName
            firstName
            _id
            email
          }
        }
    `,
        variables: {
          id,
          updateInput: {
            firstName,
            lastName,
            cycle_id,
          },
        },
      });

      const response = await datas.data.data.updateTraineeApplicant;
      dispatch(creator(UPDATE_TRAINEE, response));
    } catch (error) {
      console.log(error);
      return dispatch(creator(UPDATE_TRAINEE_FAIL, error));
    }
  };

export const updateTraineeAttributes =
  ({
    id,
    andelaPrograms,
    interview_decision,
    english_score,
    Hackerrank_score,
    isStudent,
    haveLaptop,
    isEmployed,
    sector,
    district,
    province,
    education_level,
    study,
    phone,
    address,
    birth_date,
    gender,
  }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
        mutation UpdateTraineeAttribute($id: ID!, $attributeUpdateInput: traineeUpdateAttributeInput) {
          updateTraineeAttribute(ID: $id, attributeUpdateInput: $attributeUpdateInput) {
            gender
            birth_date
            address
            phone
            study
            education_level
            province
            district
            sector
            isEmployed
            haveLaptop
            isStudent
            Hackerrank_score
            english_score
            interview_decision
            andelaPrograms
            _id
            trainee
          }
        }
        `,
        variables: {
          id,
          attributeUpdateInput: {
            gender,
            birth_date,
            address,
            phone,
            study,
            education_level,
            province,
            district,
            sector,
            isEmployed,
            haveLaptop,
            isStudent,
            Hackerrank_score,
            english_score,
            interview_decision,
            andelaPrograms,
          },
        },
      });

      const response = await datas.data.data.updateTraineeAttribute;
      dispatch(creator(UPDATE_TRAINEE_ATTRIBUTE, response));
    } catch (error) {
      console.log(error);
      return dispatch(creator(UPDATE_TRAINEE_ATTRIBUTE_FAIL, error));
    }
  };
