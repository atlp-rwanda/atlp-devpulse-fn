import {
  Action,
  createJobPostType,
} from '../actiontypes/createJobPostActionTypes';

interface State {
  success: boolean;
  loading: boolean;
  error: any;
  message: any;
}

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

const createJobPostReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case createJobPostType.CREATE_JOB_POST_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
      };
    case createJobPostType.CREATE_JOB_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case createJobPostType.CREATE_JOB_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default createJobPostReducer;
