import { FETCH_TRAINEE } from "..";

const initialState = {
  isLoading: true,
  errors: null,
  data: [],
};
export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FETCH_TRAINEE:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    default:
      return state;
  }
};
