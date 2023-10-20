import {
  GET_PROGRAMS,
} from '..';

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_PROGRAMS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    default:
      return state;
  }
};
