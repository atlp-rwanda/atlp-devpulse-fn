import { LOGIN_USER } from "..";

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        data: payload,
      };

    default:
      return state;
  }
};
