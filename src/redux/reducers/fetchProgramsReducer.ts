import {
  Action,
  fetchProgramType,
} from "../actiontypes/fetchProgramActionTypes";

interface State {
  success: boolean;
  loading: boolean;
  error: any;
  data: any;
}

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const fetchProgramsReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case fetchProgramType.FETCH_PROGRAM_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        data: null,
      };
    case fetchProgramType.FETCH_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case fetchProgramType.FETCH_PROGRAM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default fetchProgramsReducer;
