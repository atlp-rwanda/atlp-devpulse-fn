import {
  GET_CYCLES,
  CREATE_CYCLES,
  UPDATE_CYCLE,
  DELETE_CYCLE,
  CREATE_CYCLE_ERROR,
  UPDATE_CYCLE_ERROR,
  DELETE_CYCLE_ERROR,
} from "..";

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  console.log(state, "paload ,,,,,,,,");
  switch (type) {
    case GET_CYCLES:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case CREATE_CYCLES:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, payload],
      };

    case CREATE_CYCLE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    case UPDATE_CYCLE:
      return {
        isLoading: false,
        data: payload,
      };

    case UPDATE_CYCLE_ERROR:
      return {
        isLoading: false,
        errors: payload,
      };

    case DELETE_CYCLE:
      const deletedData = state.data.filter(({ id }) => id !== payload);
      return {
        isLoading: false,
        data: deletedData,
      };

    case DELETE_CYCLE_ERROR:
      return {
        isLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
