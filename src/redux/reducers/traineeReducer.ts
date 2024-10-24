import {
  GET_TRAINEE,
  CREATE_TRAINEES,
  CREATE_CYCLE_ERROR,
  SET_TRAINEE,
  GET_TRAINEE_ATTENDANCE,
  GET_TRAINEE_PERFORMANCE,
  FETCH_TRAINEES_REQUEST,
  FETCH_TRAINEES_SUCCESS,
  FETCH_TRAINEES_FAILURE,
  UPDATE_TRAINEE_REQUEST,
  UPDATE_TRAINEE_SUCCESS,
  UPDATE_TRAINEE_FAILURE,
  DELETE_TRAINEE_REQUEST,
  DELETE_TRAINEE_SUCCESS,
  DELETE_TRAINEE_FAILURE,
  CREATE_TRAINEE_ATTRIBUTE_REQUEST,
  CREATE_TRAINEE_ATTRIBUTE_SUCCESS,
  CREATE_TRAINEE_ATTRIBUTE_FAILURE,
  SET_CURRENT_TRAINEE_ID
} from "..";

interface TraineeState {
  loading: boolean;
  error: string | null;
  data: TraineeApplicant[];
  totalItems: number;
  page: number;
  itemsPerPage: number;
  currentTraineeId: string | null;
}

interface CycleApplied {
  _id: string;
  cycle: {
    _id: string;
    name: string;
  };
}

interface TraineeApplicant {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  cycleApplied: CycleApplied[];
  attributes?: TraineeAttribute;
  delete_at: boolean;
  status: string;
  applicationPhase: ApplicationPhase;
  cohort?: string;
  user?: { _id: string };
}

enum ApplicationPhase {
  Applied = "Applied",
  Interviewed = "Interviewed",
  Accepted = "Accepted",
  Enrolled = "Enrolled"
}

interface TraineeAttribute {
  _id: string;
  gender?: string;
  birth_date?: string;
  address?: string;
  phone?: string;
  study?: boolean;
  education_level?: string;
  currentEducationLevel?: string;
  nationality?: string;
  province?: string;
  district?: string;
  sector?: string;
  isEmployed?: boolean;
  haveLaptop?: boolean;
  isStudent?: boolean;
  Hackerrank_score?: string;
  english_score?: string;
  interview?: number;
  interview_decision?: string;
  applicationPost?: string;
  otherApplication?: string;
  andelaPrograms?: string;
  otherPrograms?: string;
  understandTraining?: boolean;
  discipline?: string;
  trainee_id: string;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: TraineeState = {
  loading: false,
  error: null,
  data: [],
  totalItems: 0,
  page: 1,
  itemsPerPage: 10,
  currentTraineeId: null,
};

export default (state = initialState, action: Action): TraineeState => {
  switch (action.type) {
    case FETCH_TRAINEES_REQUEST:
    case UPDATE_TRAINEE_REQUEST:
    case DELETE_TRAINEE_REQUEST:
    case CREATE_TRAINEE_ATTRIBUTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_TRAINEE:
    case FETCH_TRAINEES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data || action.payload,
        totalItems: action.payload.totalItems || state.totalItems,
        page: action.payload.page || state.page,
        itemsPerPage: action.payload.itemsPerPage || state.itemsPerPage,
        error: null,
      };

    case CREATE_TRAINEES:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        totalItems: state.totalItems + 1,
        error: null,
      };

    case SET_CURRENT_TRAINEE_ID:
      return {
        ...state,
        currentTraineeId: action.payload,
      };  

    case UPDATE_TRAINEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((trainee) =>
          trainee._id === action.payload._id ? action.payload : trainee
        ),
        error: null,
      };

    case DELETE_TRAINEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((trainee) => trainee._id !== action.payload),
        totalItems: state.totalItems - 1,
        error: null,
      };

    case CREATE_TRAINEE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((trainee) =>
          trainee?._id === action.payload?.trainee_id
            ? { ...trainee, attributes: action.payload }
            : trainee
          ),
          error: null,
        };
      
    
    case CREATE_CYCLE_ERROR:
    case FETCH_TRAINEES_FAILURE:
    case UPDATE_TRAINEE_FAILURE:
    case DELETE_TRAINEE_FAILURE:
    case CREATE_TRAINEE_ATTRIBUTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};