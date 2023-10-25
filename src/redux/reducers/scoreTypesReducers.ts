import {
  GET_SCORE_TYPES,
  GET_ONE_SCORE_TYPE,
  CREATE_SCORE_TYPE,
  CREATE_SCORE_ERROR,
  DELETE_SCORE_TYPE,
  DELETE_SCORE_ERROR,
  UPDATE_SCORE_TYPE,
  UPDATE_SCORE_ERROR,
} from "..";

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
  obj: null,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_SCORE_TYPES:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case CREATE_SCORE_TYPE:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, payload],
      };

    case CREATE_SCORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    case GET_ONE_SCORE_TYPE:
      return {
        ...state,
        isLoading: false,
        obj: payload,
      };

    case UPDATE_SCORE_TYPE:
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

    case UPDATE_SCORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    case DELETE_SCORE_TYPE:
      const deletedData = state.data.filter(({ id }) => id !== payload);
      return {
        ...state,
        isLoading: false,
        data: [...state.data, deletedData],
      };

    case DELETE_SCORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
