import {
    fetchCandidateAssessments,
    fetchAssessment
    
  } from "../actiontypes/assessmentType";

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

  export const assessmentsReducer = (
    state: any = initialState,
    action: fetchCandidateAssessments
  ): State => {
    switch (action.type) {
      case fetchAssessment.fetchAssessments:
        return {
          ...state,
          data: action.data
        };
      default:
        return state;
    }
  };