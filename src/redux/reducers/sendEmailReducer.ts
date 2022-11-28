import { SEND_EMAIL, SEND_EMAIL_ERROR } from "..";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SEND_EMAIL:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case SEND_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
};
