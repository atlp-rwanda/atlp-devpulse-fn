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
      const id = payload.id;
      const newState: any = state.data;
      const id1 = newState.findIndex((val: any) => {
        return val.id === id;
      });

      newState[id1] = payload;

      return {
        ...state,
        isLoading: false,
        data: [...state.data],
      };

    case UPDATE_CYCLE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    case DELETE_CYCLE:
      const deletedData = state.data.filter(({ id }) => id !== payload);
      return {
        ...state,
        isLoading: false,
        data: [...state.data, deletedData],
      };

    case DELETE_CYCLE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
