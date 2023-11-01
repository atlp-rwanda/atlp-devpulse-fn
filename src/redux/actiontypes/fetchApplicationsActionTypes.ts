export enum fetchApplicationsType {
    FETCH_APPLICATIONS_LOADING = "FETCH_APPLICATIONS_LOADING",
    FETCH_APPLICATIONS_SUCCESS = "FETCH_APPLICATIONS_SUCCESS",
    FETCH_APPLICATIONS_FAIL = "FETCH_APPLICATIONS_FAIL",
    APPLICATION_REMOVED = "APPLICATION_REMOVED",
    APPLICATION_ADDED = "APPLICATION_ADDED",
  }
  
  interface actionApplicationsPending {
    type: fetchApplicationsType.FETCH_APPLICATIONS_LOADING;
  }
  interface actionApplicationsSuccess {
    type: fetchApplicationsType.FETCH_APPLICATIONS_SUCCESS;
    data: ApplicationData[]; 
  }
  
  interface actionApplicationsFail {
    type: fetchApplicationsType.FETCH_APPLICATIONS_FAIL;
    error: any;
  }
  
  interface actionApplicationsRefresh {
    type: fetchApplicationsType.APPLICATION_REMOVED;
    data: string; 
  }
  
  interface actionApplicationsRenew {
    type: fetchApplicationsType.APPLICATION_ADDED;
    data: string; 
  }
  
  export type ActionFetchApplications =
    | actionApplicationsPending
    | actionApplicationsSuccess
    | actionApplicationsFail
    | actionApplicationsRefresh
    | actionApplicationsRenew;
  
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
  
  interface FormData {
    _id: string;
    title: string;
    description: string;
    link: string;
    jobpost: Jobpost;
  }
  
  interface Jobpost {
    _id: string;
    title: string;
    cycle: ApplicationCycleField;
    program: ProgramField;
    cohort: CohortField;
    link: string;
    description: string;
    label: string;
  }
  
  interface CohortField {
    id: string;
    title: string;
    start: string;
    end: string;
  }
  
  interface ProgramField {
    _id: string;
    title: string;
    description: string;
    mainObjective: string;
    requirements: string[];
    modeOfExecution: string;
    duration: string;
  }
  
  interface ApplicationCycleField {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  }
  