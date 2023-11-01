import { fetchApplicationsType } from "../actiontypes/fetchApplicationsActionTypes";

interface ApplicationData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    availability_for_interview: string;
    gender: string;
    resume: string;
    comments: string;
    address: string;
    status: string;
    dateOfSubmission: string;
    formUrl: string;
    associatedFormData: FormData;
  }
  
  interface State {
    success: boolean;
    loading: boolean;
    error: any; 
    applications: ApplicationData[] | null; 
    count: number;
  }
  
  const initialState: State = {
    loading: false,
    success: false,
    error: null,
    applications: null,
    count: 0,
  };
  
  interface ActionFetchApplications {
    type: fetchApplicationsType;
    data: string | ApplicationData | ApplicationData[]; 
    error: any; 
  }
  
  const fetchApplicationsReducer = (
    state: State = initialState,
    action: ActionFetchApplications
  ): State => {
    switch (action.type) {
      case fetchApplicationsType.FETCH_APPLICATIONS_LOADING:
        return {
          ...state,
          loading: true,
          success: false,
          error: null,
          applications: null,
          count: 0,
        };
      case fetchApplicationsType.FETCH_APPLICATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          applications: action.data as ApplicationData[],
          count: (action.data as ApplicationData[]).length,
        };
  
      case fetchApplicationsType.FETCH_APPLICATIONS_FAIL:
        return {
          ...state,
          applications: null,
          loading: false,
          error: action.error as any, 
        };
  
      case fetchApplicationsType.APPLICATION_REMOVED:
        return {
          ...state,
          loading: false,
          applications: state.applications
            ? state.applications.filter((item) => item._id !== action.data)
            : null,
        };
      case fetchApplicationsType.APPLICATION_ADDED:
        const previousItems = state.applications || [];
        const existingItem = state.applications
          ? state.applications.find((item) => item._id === action.data)
          : null;
  
        const newItem = !existingItem ? action.data : null;
  
        return {
          ...state,
          loading: false,
          applications: newItem
            ? ([...previousItems, newItem] as ApplicationData[])
            : previousItems,
        };
      default:
        return state;
    }
  };
  
  export default fetchApplicationsReducer;
  
