import {
  deleteOwnApplication,
  Action,
} from 'redux/actiontypes/applicationTypes';

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

export const deleteApplicationReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case deleteOwnApplication.DELETE_APPLICATION_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
      };
    case deleteOwnApplication.DELETE_APPLICATION_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case deleteOwnApplication.DELETE_APPLICATION_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
