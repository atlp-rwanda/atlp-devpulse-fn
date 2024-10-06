import { GET_TRAINEE_ATTENDANCE } from "..";

interface AttendanceState {
    attendances: any[];
    attendanceRatio: number | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: AttendanceState = {
    attendances: [],
    attendanceRatio: null,
    loading: false,
    error: null
  };
  
  export const attendanceReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case GET_TRAINEE_ATTENDANCE:
        return {
          ...state,
          attendances: action.payload.attendances,
          attendanceRatio: action.payload.attendanceRatio,
          loading: false,
          error: null
        };
      default:
        return state;
    }
  };