import creator from "./creator";
import axios from './axiosconfig';
import { 
  GET_TRAINEE_TO_UPDATE_FAIL, 
  UPDATE_TRAINEE, 
  UPDATE_TRAINEE_FAIL,
  UPDATE_TRAINEE_ATTRIBUTE,
  UPDATE_TRAINEE_ATTRIBUTE_FAIL } from "..";
import { GET_TRAINEE_TO_UPDATE } from "..";

export const getTraineeToUpdate = (Traineid:any) => async (dispatch: any) => {
  try {
    const datas = await axios.post('/',
       {
          query:`
        query GetOneTraineeAllDetails($input: one) {
          getOneTraineeAllDetails(input: $input) {
            gender
            birth_date
            Address
            phone
            field_of_study
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
            past_andela_programs
            _id
            trainee_id {
              lastName
              firstName
              _id
              email
              cycle_id {
                id
                name
                startDate
                endDate
              }
            }
          }
        }
        `,variables: {
        input: {
          "id":Traineid,
        },
      },
      },
    );

    const response = await datas.data.data.getOneTraineeAllDetails;
    return dispatch(creator(GET_TRAINEE_TO_UPDATE, response))
  } catch (error) {
      console.log(error);
      return dispatch(creator(GET_TRAINEE_TO_UPDATE_FAIL, error));
      
    }
  };


export const updateTraine = ({id,firstName,lastName}:any)=> async (dispatch: any) =>{
  try {
    const datas = await axios.post('/',
       {
          query: `
        mutation UpdateTraineeApplicant($id: ID!, $updateInput: traineeApplicantInputUpdate) {
            updateTraineeApplicant(ID: $id, updateInput: $updateInput) {
              lastName
              firstName
              _id
              email
            }
          }
      `,variables: {
          id,
          updateInput: {
            firstName,
            lastName
          }
      },
      },
    );

    const response = await datas.data.data.updateTraineeApplicant;
    dispatch(creator(UPDATE_TRAINEE, response))
  } catch (error) {
    console.log(error)
    return dispatch(creator(UPDATE_TRAINEE_FAIL, error));
  }
}

export const updateTraineeAttributes = ({
  id,
  past_andela_programs,
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
  field_of_study,
  phone,
  Address,
  birth_date,
  gender
}:any)=> async (dispatch: any) =>{
  try {
    const datas = await await axios.post('/',
       {
          query: `
        mutation UpdateTraineeAttribute($id: ID!, $attributeUpdateInput: traineeUpdateAttributeInput) {
          updateTraineeAttribute(ID: $id, attributeUpdateInput: $attributeUpdateInput) {
            gender
            birth_date
            Address
            phone
            field_of_study
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
            past_andela_programs
            _id
            trainee_id
          }
        }
        `,variables: {
          id,
          attributeUpdateInput: {
            gender,
            birth_date,
            Address,
            phone,
            field_of_study,
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
            past_andela_programs
          },
      },
      },
    );

    const response = await datas.data.data.updateTraineeAttribute;
    dispatch(creator(UPDATE_TRAINEE_ATTRIBUTE, response))
  } catch (error) {
    console.log(error)
    return dispatch(creator(UPDATE_TRAINEE_ATTRIBUTE_FAIL, error));
  }
}