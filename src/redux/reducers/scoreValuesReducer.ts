import {
  GET_SCORE_VALUES,
  CREATE_SCORE_VALUES,
  CREATE_SCORE_VALUE_ERROR,
  UPDATE_SCORE_VALUE,
  UPDATE_SCORE_VALUE_ERROR,
  DELETE_SCORE_VALUE,
  DELETE_SCORE_VALUE_ERROR,
  UPDATE_MANY_SCORE_VALUES,
} from "..";

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_SCORE_VALUES:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case CREATE_SCORE_VALUES:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, payload],
      };

    case CREATE_SCORE_VALUE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    case UPDATE_SCORE_VALUE:
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

    case UPDATE_MANY_SCORE_VALUES:
      return {
        ...state,
        isLoading: false,
        data: state.data.map((data: any, idx) => {
          const nn = payload.filter((values: any) => {
            return values.id == data.id;
          });
          const newData = {
            ...data,
            ...nn[0],
          };
          return newData;
        }),
      };

    case UPDATE_SCORE_VALUE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    case DELETE_SCORE_VALUE:
      const deletedData = state.data.filter(({ id }) => id !== payload);
      return {
        ...state,
        isLoading: false,
        data: [...state.data, deletedData],
      };

    case DELETE_SCORE_VALUE_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
