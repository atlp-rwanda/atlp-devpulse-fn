import { AppDispatch } from '../store'; 
import {
  GET_TRAINEE,
  CREATE_TRAINEES,
  CREATE_CYCLE_ERROR,
  FETCH_TRAINEES_REQUEST,
  FETCH_TRAINEES_SUCCESS,
  FETCH_TRAINEES_FAILURE,
  SET_CURRENT_TRAINEE_ID
} from "..";
import { toast } from "react-toastify";
import axios from "axios";

interface PaginationInput {
  page: number;
  itemsPerPage: number;
  All: boolean;
}

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
      cycle_id {
        id
        name
      }
      status
    }
  }
`;

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
                   
const createTraineeVariables = (traineeData: any) => ({
  input: {
    lastName: traineeData.lastName,
    firstName: traineeData.firstName,
    email: traineeData.email,
    cycle_id: traineeData.cycle_id,
    ...(traineeData.attributes && { attributes: traineeData.attributes }),
  },
});

const handleGetAllTraineesSuccess = (dispatch: AppDispatch, response: any) => {
  const trainees = response.data.data.allTraineesDetails;
  dispatch({ type: GET_TRAINEE, payload: trainees });
  dispatch({ type: FETCH_TRAINEES_SUCCESS, payload: trainees });
};

const handleGetAllTraineesError = (dispatch: AppDispatch, error: any) => {
  console.error(error);
  dispatch({ type: FETCH_TRAINEES_FAILURE, payload: error });
};

const makeGraphQLRequest = async (query: string, variables: any) => {
  return await axios({
    url: process.env.BACKEND_URL,
    method: "post",
    data: { query, variables },
  });
};

const handleSuccessResponse = (dispatch: AppDispatch, data: any) => {
  toast.success("Trainee successfully created.");
  dispatch({ type: CREATE_TRAINEES, payload: data });
};

const handleErrorResponse = (dispatch: AppDispatch, error: any) => {
  const errorMessage = error.response?.data?.errors?.[0]?.message || "An error occurred while creating the trainee.";
  console.error('GraphQL Error:', errorMessage);
  toast.error(errorMessage);
  dispatch({ type: CREATE_CYCLE_ERROR, payload: errorMessage });
};

export const getAllTrainees = ({ page, itemsPerPage, All }: PaginationInput) => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_TRAINEES_REQUEST });
  try {
    const response = await makeGraphQLRequest(getAllTraineessQuery, { input: { page, itemsPerPage, All } });
    handleGetAllTraineesSuccess(dispatch, response);
  } catch (error) {
    handleGetAllTraineesError(dispatch, error);
  }
};

export const createTrainee = (traineeData: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: CREATE_TRAINEES });
  try {
    const response = await makeGraphQLRequest(createTraineeQuery, createTraineeVariables(traineeData));
    const { data } = response.data;
    if (data?.createNewTraineeApplicant) {
      handleSuccessResponse(dispatch, data.createNewTraineeApplicant);
      return data.createNewTraineeApplicant._id; 
    } else {
      throw new Error("Failed to create trainee");
    }
  } catch (error: any) {
    handleErrorResponse(dispatch, error);
    throw error; 
  }
};