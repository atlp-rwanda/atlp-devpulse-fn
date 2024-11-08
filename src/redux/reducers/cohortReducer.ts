import {
  CREATE_COHORT_ERROR,
  GET_COHORTS,
  GET_TRAINEE_COHORT,
  CREATE_COHORT_SUCCESS,
} from "..";

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
  traineeCohort: null,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_COHORTS:
      return {
        ...state,
        isLoading: false,
        data: payload,
        errors: null,
      };

    case GET_TRAINEE_COHORT:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        traineeCohort: payload,
        errors: null,
      };
    case CREATE_COHORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errors: null,
      };
    case CREATE_COHORT_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
