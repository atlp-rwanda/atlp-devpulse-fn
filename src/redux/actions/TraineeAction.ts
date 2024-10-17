import creator from "./creator";
import { AppDispatch } from '../store'; 
import {
  GET_TRAINEE,
  CREATE_TRAINEES,
  CREATE_CYCLE_ERROR,
  SET_TRAINEE,
  FETCH_TRAINEES_REQUEST,
  FETCH_TRAINEES_SUCCESS,
  FETCH_TRAINEES_FAILURE,
  SET_CURRENT_TRAINEE_ID
} from "..";
import { toast } from "react-toastify";
import axios from "axios";

interface TraineeData {
  lastName: string;
  firstName: string;
  email: string;
  cycle_id: string;
  attributes?: Record<string, any>;
}

interface CreateTraineeResponse {
  data: {
    createNewTraineeApplicant: {
      _id: string;
      lastName: string;
      firstName: string;
      email: string;
      cycleApplied: {
        _id: string;
        cycle: {
          _id: string;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export const getAllTraineess =
  ({ page, itemsPerPage, All }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
        query AllTraineesDetails($input: pagination) {
          allTraineesDetails(input: $input) {
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
              firstName
              lastName
            }
          }
        }
      `,
          variables: {
            input: {
              page,
              itemsPerPage,
              All,
            },
          },
        },
      });
      const trainee = await datas.data.data.allTraineesDetails;
      dispatch(creator(GET_TRAINEE, trainee));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
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
      cycleApplied {
        _id
        cycle {
          _id
        }
      }
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

const validateResponse = (response: CreateTraineeResponse) => {
  if (response.errors?.length) {
    throw new Error(response.errors[0].message);
  }
  if (!response.data?.createNewTraineeApplicant) {
    throw new Error("Failed to create trainee");
  }
  return response.data.createNewTraineeApplicant;
};

export const handleErrorResponse = (dispatch: AppDispatch, error: any) => {
  let errorMessage = "An error occurred while creating the trainee.";
  if (error.response?.data?.errors?.[0]?.message) {
    errorMessage = error.response.data.errors[0].message;
  } else if (error.message) {
    errorMessage = error.message;
  }
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

export const createTrainee = (traineeData: TraineeData) => async (dispatch: AppDispatch) => {
  dispatch({ type: CREATE_TRAINEES });
  
  try {
    const variables = createTraineeVariables(traineeData);
    const response = await makeGraphQLRequest(createTraineeQuery, variables);
    const trainee = validateResponse(response.data);
    
    handleSuccessResponse(dispatch, trainee);
    return trainee._id;
  } catch (error: any) {
    handleErrorResponse(dispatch, error);
    throw error;
  }
};