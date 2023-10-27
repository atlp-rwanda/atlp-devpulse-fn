import {
  Action,
  fetchSingleJobPostType,
} from '../actiontypes/fetchSingleJobPostTypes';

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

const fetchSingleJobPostReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        data: null,
      };
    case fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default fetchSingleJobPostReducer;
