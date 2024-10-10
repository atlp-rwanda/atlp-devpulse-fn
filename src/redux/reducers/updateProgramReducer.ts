import { Action, updateProgramType } from "../actiontypes/updateProgramTypes";

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

const updateProgramReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case updateProgramType.UPDATE_PROGRAM_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
      };
    case updateProgramType.UPDATE_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case updateProgramType.UPDATE_PROGRAM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default updateProgramReducer;
