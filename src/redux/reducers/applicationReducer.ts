import { toast } from 'react-toastify';
import {
  Action,
  fetchMyApplications,
  deleteOwnApplication,
  fetchSingleOwnApplication,
} from '../actiontypes/applicationTypes';

interface State {
  success: boolean;
  loading: boolean;
  error: any;
  message: any;
  data: any;
}

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  data: null,
};

const applicationState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  data: null,
};

export const applicationsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case fetchMyApplications.FETCH_MYAPPLICATIONS_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
        data: null,
      };
    case fetchMyApplications.FETCH_MYAPPLICATIONS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: action.message,
        data: action.data,
      };
    case fetchMyApplications.FETCH_MYAPPLICATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };

    case deleteOwnApplication.DELETE_APPLICATION_SUCCESS:
      if (!action.data.id) {
        toast.error('Application has already been withdrawn');
      }
      return {
        // remove the application from the state
        ...state,
        loading: false,
        data: {
          applications: state.data.applications.filter(
            (application: any) => application._id !== action.data.id,
          ),
        },
      };
    default:
      return state;
  }
};
export const singleApplicationReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
        data: null,
      };
    case fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: action.message,
        data: action.data,
      };
    case fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };

    default:
      return state;
  }
};
