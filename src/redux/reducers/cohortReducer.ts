import { GET_COHORTS } from '..';

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_COHORTS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    default:
      return state;
  }
};
