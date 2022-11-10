import { GET_TRAINEE_TO_UPDATE, GET_TRAINEE_TO_UPDATE_FAIL } from "..";

const initialState = {
    loading: false,
    error: null,
    data: [],
  };

  export default (state = initialState, { type, payload }: any) => {
    switch (type) {
        case GET_TRAINEE_TO_UPDATE:
            return {
                ...state,
                loading: false,
                data: payload,
            };
    
        case GET_TRAINEE_TO_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };

      default:
        return state;
    }
}

