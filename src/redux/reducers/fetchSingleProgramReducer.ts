import {
    Action,
    fetchSingleProgramType,
  } from "../actiontypes/fetchSingleProgramTypes";
  
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
  
  const fetchSingleProgramReducer = (
    state: State = initialState,
    action: Action
  ): State => {
    switch (action.type) {
      case fetchSingleProgramType.FETCH_SINGLE_PROGRAM_LOADING:
        return {
          loading: true,
          success: false,
          error: null,
          data: null,
        };
      case fetchSingleProgramType.FETCH_SINGLE_PROGRAM_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.data,
        };
      case fetchSingleProgramType.FETCH_SINGLE_PROGRAM_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default fetchSingleProgramReducer;
  