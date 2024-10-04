import {
  GET_TRAINEE,
  CREATE_TRAINEES,
  CREATE_CYCLE_ERROR,
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
  CREATE_TRAINEE_ATTRIBUTE_FAILURE
} from "..";

interface TraineeState {
  loading: boolean;
  error: string | null;
  data: any[];
  totalItems: number;
  page: number;
  itemsPerPage: number;
}

interface TraineeAttribute {
  gender: String
    birth_date: String
    Address: String
    phone: String
    field_of_study: String
    education_level: String
    currentEducationLevel: String
    province: String
    district: String
    sector: String
    isEmployed: Boolean
    haveLaptop: Boolean
    isStudent: Boolean
    Hackerrank_score: String
    english_score: String
    interview_decision: String
    past_andela_programs: String
    applicationPost: String
    otherApplication: String
    andelaPrograms: String
    otherPrograms: String
    understandTraining: Boolean
    discipline: String
    _id: String
    trainee_id: String
  
}

interface Action {
  type: string;
  payload?: any;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  totalItems: 0,
  page: 1,
  itemsPerPage: 10,
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

    case UPDATE_TRAINEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((trainee: any) =>
          trainee._id === action.payload._id ? action.payload : trainee
        ),
        error: null,
      };

    case DELETE_TRAINEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((trainee: any) => trainee._id !== action.payload),
        totalItems: state.totalItems - 1,
        error: null,
      };

    case CREATE_TRAINEE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((trainee: any) =>
          trainee._id === (action.payload as TraineeAttribute).trainee_id
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