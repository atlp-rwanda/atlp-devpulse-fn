import creator from "./creator";
import { AppDispatch } from '../store'; 
import {
  GET_TRAINEE,
  CREATE_TRAINEES,
  SET_TRAINEE,
  FETCH_TRAINEES_REQUEST,
  SET_CURRENT_TRAINEE_ID,
  
} from "..";
import axios from "axios";
import * as traineeUtils from '../../utils/traineActionUtils';

interface TraineeData {
  lastName: string;
  firstName: string;
  email: string;
  cycle_id: string;
  attributes?: Record<string, any>;
}

interface PaginationInput {
  page: number;
  itemsPerPage: number;
  All: boolean;
}

const getAllTraineessQuery= `
  query AllTraineesDetails($input: pagination) {
    allTraineesDetails(input: $input) {
      _id
      gender
      birth_date
      Address
      phone
      field_of_study
      education_level
      currentEducationLevel
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
      applicationPost
      otherApplication
      andelaPrograms
      otherPrograms
      understandTraining
      discipline
      trainee_id {
        firstName
        lastName
        email
        _id
      }
    }
  }
`;

export const getAllTrainees = ({ page, itemsPerPage, All }: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_TRAINEES_REQUEST });
  try {
    const response = await makeGraphQLRequest(getAllTraineessQuery, { 
      input: {
        page,
        itemsPerPage,
        All,
      }
    });
    traineeUtils.handleGetAllTraineesSuccess(dispatch, response);
  } catch (error) {
    traineeUtils.handleGetAllTraineesError(dispatch, error);
  }
};

export const getTraineeApplicant = (traineeId: string) => async(dispatch: any) => {
  try{
    const response = await axios.post(`${process.env.BACKEND_URL}`, {
      query: `
        query GetOneTrainee($ID: ID!) {
          getOneTrainee(ID: $ID) {
            _id
            applicationPhase
            cohort
          }
        }
      `,
      variables: { ID: traineeId }
    });
    if (response.data.errors) {
      console.error('GraphQL Errors:', response.data.errors);
      return;
    }
    const trainee = response.data.data.getOneTrainee;
    dispatch(creator(GET_TRAINEE, trainee));

  }catch (error: any) {
    console.error('Error fetching trainee:', error);
    console.error('Error response:', error.response?.data);
  }
}

export const getTraineeByUserId = (userId: string) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}`, {
      query: `
        query GetTraineeByUserId($userId: ID!) {
          getTraineeByUserId(userId: $userId)
        }
      `,
      variables: { userId },
    });

    const traineeData = response.data.data.getTraineeByUserId;
    dispatch(creator(SET_TRAINEE, traineeData));
  } catch (error) {
    console.error("Error fetching trainee:", error);
  }
};

export const setCurrentTraineeId = (traineeId: string) => ({
  type: SET_CURRENT_TRAINEE_ID,
  payload: traineeId,
});

const createTraineeQuery = `
  mutation CreateNewTraineeApplicant($input: newTraineeApplicantInput!) {
    createNewTraineeApplicant(input: $input) {
      _id
      lastName
      firstName
      email
      cycleApplied {
        _id
        cycle {
          _id
        }
      }
    }
  }
`;

const makeGraphQLRequest = async (query: string, variables: any) => {
  return await axios({
    url: process.env.BACKEND_URL,
    method: "post",
    data: { query, variables },
  });
};


export const createTrainee = (traineeData: TraineeData) => async (dispatch: AppDispatch) => {
  dispatch({ type: CREATE_TRAINEES });
  
  try {
    const variables = traineeUtils.createTraineeVariables(traineeData);
    const response = await makeGraphQLRequest(createTraineeQuery, variables);
    const trainee = traineeUtils.validateResponse(response.data);
    
    traineeUtils.handleSuccessResponse(dispatch, trainee);
    return trainee._id;
  } catch (error: any) {
    traineeUtils.handleErrorResponse(dispatch, error);
    throw error;
  }
};