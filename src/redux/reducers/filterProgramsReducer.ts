import { GET_ALL_FILTERED_PROGRAMS } from "..";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_ALL_FILTERED_PROGRAMS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};
