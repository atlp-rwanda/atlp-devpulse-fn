import {
  GET_ALL_FILTERED_TRAINEES,
  SEND_EMAIL,
  SEND_EMAIL_ERROR,
  CREATE_TRAINEE_APPLICANT_SUCCESS,
  CREATE_TRAINEE_APPLICANT_ERROR
} from "..";
import { fetchtrainapplicantcount } from "../actiontypes/deleteactiontype";

const initialState = {
  loading: false,
  error: null,
  filteredTrainees: [],
  emailStatus: null,
  newTraineeApplicant: null,
  traineeApplicantCount: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_FILTERED_TRAINEES:
      return {
        ...state,
        loading: false,
        filteredTrainees: payload
      };
    case SEND_EMAIL:
      return {
        ...state,
        emailStatus: payload
      };
    case SEND_EMAIL_ERROR:
      return {
        ...state,
        error: payload
      };
    case CREATE_TRAINEE_APPLICANT_SUCCESS:
      return {
        ...state,
        newTraineeApplicant: payload
      };
    case CREATE_TRAINEE_APPLICANT_ERROR:
      return {
        ...state,
        error: payload
      };
    case fetchtrainapplicantcount.fetchtrainapplicantcount_success:
      return {
        ...state,
        traineeApplicantCount: payload
      };
    default:
      return state;
  }
};