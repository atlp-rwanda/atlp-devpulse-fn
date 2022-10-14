import { GET_CYCLES, CREATE_CYCLES, UPDATE_CYCLE, DELETE_CYCLE } from "..";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_CYCLES:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case CREATE_CYCLES:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };

    case UPDATE_CYCLE:
      return {
        loading: false,
        data: payload,
      };

    case DELETE_CYCLE:
      const deletedData = state.data.filter(({ id }) => id !== payload);
      return {
        loading: false,
        data: deletedData,
      };
    default:
      return state;
  }
};
