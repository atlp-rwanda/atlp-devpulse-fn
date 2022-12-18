import { UPDATE_TRAINEE_STATUS, UPDATE_TRAINEE_STATUS_FAIL } from "..";

const initialState = {
  loading: false,
  success: null,
  error: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_TRAINEE_STATUS:
      return {
        ...state,
        loading: false,
        sucess: true,
        data: payload,
      };
    case UPDATE_TRAINEE_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        sucess: false,
        error: payload,
      };
    default:
      return state;
  }
};
