import { AppDispatch } from '../redux/store';
import { toast } from "react-toastify";
import { GET_TRAINEE, FETCH_TRAINEES_SUCCESS, FETCH_TRAINEES_FAILURE, CREATE_CYCLE_ERROR, CREATE_TRAINEES } from "../redux/actions/..";

export const createTraineeVariables = (traineeData: any) => ({
  input: {
    lastName: traineeData.lastName,
    firstName: traineeData.firstName,
    email: traineeData.email,
    cycle_id: traineeData.cycle_id,
    ...(traineeData.attributes && { attributes: traineeData.attributes }),
  },
});

export const handleGetAllTraineesSuccess = (dispatch: AppDispatch, response: any) => {
  const trainees = response.data.data.allTraineesDetails;
  dispatch({ type: GET_TRAINEE, payload: trainees });
  dispatch({ type: FETCH_TRAINEES_SUCCESS, payload: trainees });
};

export const handleGetAllTraineesError = (dispatch: AppDispatch, error: any) => {
  console.error(error);
  dispatch({ type: FETCH_TRAINEES_FAILURE, payload: error });
};

export const handleSuccessResponse = (dispatch: AppDispatch, data: any) => {
  toast.success("Trainee successfully created.");
  dispatch({ type: CREATE_TRAINEES, payload: data });
};

export const validateResponse = (response: any) => {
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