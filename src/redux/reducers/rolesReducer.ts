import {
    Action,
    fetchUserRoles,
    fetchRole,
  } from "../actiontypes/deleteactiontype";


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

  const traineState = {
    loading: false,
    success: false,
    error: null,
    message: null,
  };

  export const rolesReducer = (
    state: any = traineState,
    action: fetchUserRoles
  ): State => {
    switch (action.type) {
      case fetchRole.fetchRoles:
        return {
          ...state,
          message: action.data
        };
      default:
        return state;
    }
  };