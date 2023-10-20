import { GET_ONE_JOB_POST_ALL_DETAILS } from '..';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_ONE_JOB_POST_ALL_DETAILS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};
