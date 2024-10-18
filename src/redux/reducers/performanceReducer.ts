import { GET_TRAINEE_PERFORMANCE } from "..";

interface PerformanceState {
    performances: any[];
    averageScore: number | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: PerformanceState = {
    performances: [],
    averageScore: null,
    loading: false,
    error: null
  };
  
  export const performanceReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case GET_TRAINEE_PERFORMANCE:
        return {
          ...state,
          performances: action.payload.performances,
          averageScore: action.payload.averageScore,
          loading: false,
          error: null
        };
      default:
        return state;
    }
  };