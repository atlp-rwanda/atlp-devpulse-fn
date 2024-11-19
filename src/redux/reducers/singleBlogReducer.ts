import { FETCH_SINGLE_BLOG_FAIL, FETCH_SINGLE_BLOG_SUCCESS } from "../index";

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: {},
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FETCH_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case FETCH_SINGLE_BLOG_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: true,
      };

    default:
      return state;
  }
};
