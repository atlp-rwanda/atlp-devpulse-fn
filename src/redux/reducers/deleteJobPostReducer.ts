import {
  ActionDelete,
  deleteJobPostType,
} from '../actiontypes/deleteJobPostActionTypes';

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

const deleteJObPostReducer = (
  state: State = initialState,
  action: ActionDelete,
): State => {
  switch (action.type) {
    case deleteJobPostType.DELETE_JOB_POST_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
      };
    case deleteJobPostType.DELETE_JOB_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case deleteJobPostType.DELETE_JOB_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default deleteJObPostReducer;
