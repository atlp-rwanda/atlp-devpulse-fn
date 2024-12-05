import {
  CREATE_COHORT_ERROR,
  GET_COHORTS,
  GET_TRAINEE_COHORT,
  CREATE_COHORT_SUCCESS,
  GET_ALL_TRAINEES,
  ADD_TRAINEE_IN_COHORT,
} from "..";

interface TraineeCohort {
  trainees: string[];
}

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
  traineeCohort: null as TraineeCohort | null,
  trainees: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_COHORTS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case GET_TRAINEE_COHORT:
      return {
        ...state,
        isLoading: false,
        traineeCohort: payload
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
        isLoaded: true,
        errors: payload,
      };
    case GET_ALL_TRAINEES:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        trainees: payload,
      };
    case ADD_TRAINEE_IN_COHORT:
      return {
          ...state,
          isLoading: false,
          traineeCohort: {
            ...state.traineeCohort,
            trainees: [...(state.traineeCohort?.trainees || []), payload.traineeId],
          },
      };

    default:
      return state;
  }
};
