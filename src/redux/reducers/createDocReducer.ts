import {
    Action,
    createDocsType,
  } from "../actiontypes/createDocsActionTypes";
  
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
  
  const createDocsReducer = (
    state: State = initialState,
    action: Action
  ): State => {
    switch (action.type) {
      case createDocsType.CREATE_Docs_LOADING:
        return {
          loading: true,
          success: false,
          error: null,
          message: null,
        };
      case createDocsType.CREATE_Docs_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.message,
        };
      case createDocsType.CREATE_Docs_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default createDocsReducer;
  