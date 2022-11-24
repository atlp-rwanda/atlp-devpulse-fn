
import { GET_TRAINEE, CREATE_TRAINEES} from "..";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GET_TRAINEE:
      return {
        ...state,
        loading: false,
        data: payload,
      }; 
      case CREATE_TRAINEES:
        return {
          ...state,
          loading: false,
          data: [...state.data, payload],
        };
  
    default:
      return state;
  }
};
