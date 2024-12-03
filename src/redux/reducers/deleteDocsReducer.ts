import {
    ActionDelete,
    deleteDocsType,
  } from "../actiontypes/deleteDocsActionTypes";
  
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
  
  const deleteDocsReducer = (
    state: State = initialState,
    action: ActionDelete
  ): State => {
    switch (action.type) {
      case deleteDocsType.DELETE_Docs_LOADING:
        return {
          loading: true,
          success: false,
          error: null,
          message: null,
        };
      case deleteDocsType.DELETE_Docs_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.message,
        };
      case deleteDocsType.DELETE_Docs_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default deleteDocsReducer;
  