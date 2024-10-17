import { GET_COHORTS, GET_TRAINEE_COHORT } from '..';

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
      };

    case GET_TRAINEE_COHORT:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        traineeCohort: payload,
        };

    default:
      return state;
  }
};
