import creator from "./creator";
import {
  GET_TRAINEE,
  CREATE_TRAINEES,
  CREATE_CYCLE_ERROR,
  FETCH_TRAINEES_REQUEST,
  FETCH_TRAINEES_SUCCESS,
  FETCH_TRAINEES_FAILURE,
  UPDATE_TRAINEE_REQUEST,
  UPDATE_TRAINEE_SUCCESS,
  UPDATE_TRAINEE_FAILURE,
  DELETE_TRAINEE_REQUEST,
  DELETE_TRAINEE_SUCCESS,
  DELETE_TRAINEE_FAILURE
} from "..";
import { toast } from "react-toastify";
import axios from "axios";

export const getAllTraineess = ({ page, itemsPerPage, All }: any) => async (dispatch: any) => {
  dispatch({ type: FETCH_TRAINEES_REQUEST });
  try {
    const datas = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
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
    dispatch({ type: FETCH_TRAINEES_SUCCESS, payload: trainee });
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_TRAINEES_FAILURE, payload: error});
  }
};

export const createTrainee = (traineeData: any) => async (dispatch: any) => {
  dispatch({ type: CREATE_TRAINEES });
  try {
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
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
        }`,
        variables: {
          input: {
            lastName: traineeData.lastName,
            firstName: traineeData.firstName,
            email: traineeData.email,
            cycle_id: traineeData.cycle_id,
            ...(traineeData.attributes && { attributes: traineeData.attributes }),
          },
        },
      },
    });

    if (response.data.data && response.data.data.createNewTraineeApplicant) {
      toast.success("Trainee successfully created.");
      dispatch(creator(CREATE_TRAINEES, response.data.data.createNewTraineeApplicant));
    } else if (response.data.errors) {
      const err = response.data.errors[0].message;
      console.error('GraphQL Error:', err);
      toast.error(err);
      dispatch(creator(CREATE_CYCLE_ERROR, err));
    }
  } catch (error:any) {
    console.error('Axios Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.errors?.[0]?.message || "An error occurred while creating the trainee.";
    toast.error(errorMessage);
    dispatch(creator(CREATE_CYCLE_ERROR, errorMessage));
  }
};

export const updateTrainee = (id: string, updateData: any) => async (dispatch: any) => {
  dispatch({ type: UPDATE_TRAINEE_REQUEST });
  try {
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
        mutation UpdateTraineeApplicant($ID: ID!, $updateInput: traineeApplicantInputUpdate) {
          updateTraineeApplicant(ID: $ID, updateInput: $updateInput) {
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
        }`,
        variables: {
          ID: id,
          updateInput: updateData,
        },
      },
    });

    if (response.data.data !== null) {
      toast.success("Successfully updated.");
      dispatch({ type: UPDATE_TRAINEE_SUCCESS, payload: response.data.data.updateTraineeApplicant });
    } else {
      const err = response.data.errors[0].message;
      toast.error(err);
      dispatch({ type: UPDATE_TRAINEE_FAILURE, payload: err });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_TRAINEE_FAILURE, payload: error });
  }
};

export const deleteTrainee = (email: string) => async (dispatch: any) => {
  dispatch({ type: DELETE_TRAINEE_REQUEST });
  try {
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
        mutation DeleteTraineeApplicant($email: String!) {
          deleteTraineeApplicant(email: $email)
        }`,
        variables: {
          email,
        },
      },
    });

    if (response.data.data.deleteTraineeApplicant) {
      toast.success("Successfully deleted.");
      dispatch({ type: DELETE_TRAINEE_SUCCESS, payload: email });
    } else {
      const err = "Failed to delete trainee";
      toast.error(err);
      dispatch({ type: DELETE_TRAINEE_FAILURE, payload: err });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_TRAINEE_FAILURE, payload: error });
  }
};