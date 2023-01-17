import {
    ActionDelete,
    deleteProgramType,
  } from "../actiontypes/deleteProgramActionTypes";
  
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
  
  const deleteProgramReducer = (
    state: State = initialState,
    action: ActionDelete
  ): State => {
    switch (action.type) {
      case deleteProgramType.DELETE_PROGRAM_LOADING:
        return {
          loading: true,
          success: false,
          error: null,
          message: null,
        };
      case deleteProgramType.DELETE_PROGRAM_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.message,
        };
      case deleteProgramType.DELETE_PROGRAM_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default deleteProgramReducer;
  