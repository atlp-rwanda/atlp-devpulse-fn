import {
  fetchSearchDataType,
  ActionFetch,
} from "../actiontypes/fetchSearchDataActionTypes";

interface SearchState {
  loading: boolean;
  data: any;
  error: any;
  count: number;
}

const initialState: SearchState = {
  loading: false,
  data: null,
  error: null,
  count: 0,
};

const fetchSearchDataReducer = (
  state: SearchState = initialState,
  action: ActionFetch
): SearchState => {
  switch (action.type) {
    case fetchSearchDataType.FETCH_SEARCH_DATA_LOADING:
      return {
        loading: true,
        error: null,
        data: null,
        count: 0,
      };
    case fetchSearchDataType.FETCH_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        count: action.data.length,
      };
    case fetchSearchDataType.FETCH_SEARCH_DATA_FAILURE:
      return {
        ...state,
        data: initialState.data,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default fetchSearchDataReducer;
