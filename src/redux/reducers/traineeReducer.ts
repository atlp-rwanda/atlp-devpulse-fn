
import { GET_TRAINEE, CREATE_TRAINEES, SET_TRAINEE, GET_TRAINEE_ATTENDANCE, GET_TRAINEE_PERFORMANCE} from "..";

const initialState = {
  loading: false,
  error: null,
  data: [],
  currentTrainee: null,
  traineeAttendance: null,
  traineePerformance: null
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
        console.log('state',state);
        console.log('payload',payload);
        return {
          ...state,
          loading: false,
          data: [...state.data, payload],
        };

      case SET_TRAINEE:
        return {
          ...state,
          loading: false,
          currentTrainee: payload
        };

      case GET_TRAINEE_ATTENDANCE:
          return {
            ...state,
            data: payload
          };
        case GET_TRAINEE_PERFORMANCE:
          return {
            ...state,
            data: payload
          };
  
    default:
      return state;
  }
};
