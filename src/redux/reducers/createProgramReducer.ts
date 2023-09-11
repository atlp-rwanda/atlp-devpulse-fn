import {
  Action,
  createProgramType,
} from "../actiontypes/createProgramActionTypes";

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

const createProgramReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case createProgramType.CREATE_PROGRAM_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
      };
    case createProgramType.CREATE_PROGRAM_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case createProgramType.CREATE_PROGRAM_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default createProgramReducer;
