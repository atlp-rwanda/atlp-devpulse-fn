import {
    Action,
    fetchSingleDocsType,
  } from "../actiontypes/fetchSingleDocActionTypes";
  
  interface State {
    success: boolean;
    loading: boolean;
    error: any;
    data: any;
    serverResponded: boolean;
  }
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    serverResponded: false,
  };
  
  const fetchSingleDocsReducer = (
    state: State = initialState,
    action: Action
  ): State => {
    switch (action.type) {
      case fetchSingleDocsType.FETCH_SINGLE_Docs_LOADING:
        return {
          loading: true,
          success: false,
          error: null,
          data: null,
          serverResponded: false,
        };
      case fetchSingleDocsType.FETCH_SINGLE_Docs_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
          serverResponded: true,
        };
      case fetchSingleDocsType.FETCH_SINGLE_Docs_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
          serverResponded: true,
        };
      default:
        return state;
    }
  };
  
  export default fetchSingleDocsReducer;
  