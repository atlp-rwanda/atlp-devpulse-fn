import {
    Action,
    fetchtrainesss,
    fetchtrainapplicantscount,
    fetchtrainapplicantcount,
    fetchMembers,
    fetchUser,
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

  export const membersReducer = (
    state: any = traineState,
    action: fetchMembers
  ): State => {
    switch (action.type) {
      case fetchUser.fetchMembers:
        return {
          ...state,
          message: action.data.data,
        };
      default:
        return state;
    }
  };