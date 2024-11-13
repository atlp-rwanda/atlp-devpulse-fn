import { toast } from 'react-toastify';
import {
  Action,
  fetchMyApplications,
  deleteOwnApplication,
  fetchSingleOwnApplication,
  advanceToNextStage,
  getApplicantStage,
  addStageMark,
  filterByStage
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
  data: { applications: [] },
};

const initial = {
  loading: false,
  success: false,
  error: false,
  message: null,
  data: null,
}
export const applicationsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case fetchMyApplications.FETCH_MYAPPLICATIONS_LOADING:
      return {
        ...state,
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

export const FetchApplicantStageReducer = (state:State = initial, action:Action) => {
  switch (action.type) {
    case getApplicantStage.GET_APPLICANT_STAGE_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
        data: null,
      };
    case getApplicantStage.GET_APPLICANT_STAGE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.message,
        data: action.data,
      };
    case getApplicantStage.GET_APPLICANT_STAGE_FAIL:
      return {
        loading: false,
        error: action.error,
        data: null,
      };

    default:
      return state;
  }
}

export const advanceToNextStageReducer = (state:State = initial, action:Action) => {
  switch (action.type) {
    case advanceToNextStage.ADVANCE_TO_NEXT_STAGE_LOADING:
      return {
        loading: true,
        success: false,
        error: false,
        message: null,
        data: null,
      };
    case advanceToNextStage.ADVANCE_TO_NEXT_STAGE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        message: action.message,
        data: action.data,
      };
    case advanceToNextStage.ADVANCE_TO_NEXT_STAGE_FAIL:
      return {
        loading: false,
        error: true,
        success:false,
        message: action.message,
        data: null,
      };

    default:
      return state;
  }
}

export const AddApplicantScoreReducer = (state:State = initial, action:Action) => {
  switch (action.type) {
    case addStageMark.ADD_STAGE_MARK_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
        data: null,
      };
    case addStageMark.ADD_STAGE_MARK_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.message,
        data: action.data,
      };
    case addStageMark.ADD_STAGE_MARK_FAIL:
      return {
        loading: false,
        error: action.message,
        data: null,
      };

    default:
      return state;
  }
}

export const filterApplicantByStageReducer = (state:State = initial, action:Action) => {
  switch (action.type) {
    case filterByStage.FILTER_STAGE_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
        data: null,
      };
    case filterByStage.FILTER_STAGE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.message,
        data: action.data,
      };
    case filterByStage.FILTER_STAGE_FAIL:
      return {
        loading: false,
        error: action.message,
        data: null,
      };

    default:
      return state;
  }
}