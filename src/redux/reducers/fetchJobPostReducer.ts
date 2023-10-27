import {
  ActionFetch,
  fetchJobPostType,
} from '../actiontypes/fetchJobActionTypes';

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

const fetchJobPostReducer = (
  state: State = initialState,
  action: ActionFetch,
): State => {
  switch (action.type) {
    case fetchJobPostType.FETCH_JOB_POST_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        data: null,
      };
    case fetchJobPostType.FETCH_JOB_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case fetchJobPostType.FETCH_JOB_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case fetchJobPostType.JOB_POST_REMOVED:
      //@ts-ignore
      return {
        ...state,
        loading: false,
        //@ts-ignore
        data: state.data.filter((item) => item.id !== action.data),
      };
    case fetchJobPostType.JOB_POST_ADDED:
      const previousItems = state.data;
      //@ts-ignore
      let existingItem = state.data.find(
        //@ts-ignore
        (item) => item.id === action.data,
      );

      //@ts-ignore
      let newItem = !existingItem && action.data;
      //@ts-ignore
      return {
        ...state,
        loading: false,
        data: newItem ? [...previousItems, newItem] : previousItems,
      };
    default:
      return state;
  }
};

export default fetchJobPostReducer;
