import { UPDATE_TRAINEE, UPDATE_TRAINEE_FAIL } from "..";
import { GET_TRAINEE_TO_UPDATE } from "..";

const initialState = {
    loading: false,
    error: null,
    data: [],
  };
  
  export default (state = initialState, { type, payload }: any) => {
    switch (type) {

      case UPDATE_TRAINEE:
        return {
          ...state,
          loading: false,
          data: payload,
        };
      case UPDATE_TRAINEE_FAIL:
        return{
          ...state,
          loading: false,
          error: payload,
        }
      default:
        return state;
    }
  };