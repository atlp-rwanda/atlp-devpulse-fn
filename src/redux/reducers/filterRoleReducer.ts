import { GET_ALL_FILTERED_ROLES_ACCESS } from "..";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_ALL_FILTERED_ROLES_ACCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};
