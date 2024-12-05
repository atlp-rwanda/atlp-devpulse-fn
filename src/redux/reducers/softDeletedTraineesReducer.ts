import { GET_SOFT_DELETED_TRAINEES } from "..";

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_SOFT_DELETED_TRAINEES:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    default:
      return state;
  }
};
