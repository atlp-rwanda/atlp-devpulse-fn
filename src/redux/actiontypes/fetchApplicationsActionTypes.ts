export enum fetchApplicationsType {
    FETCH_APPLICATIONS_LOADING = "FETCH_APPLICATIONS_LOADING",
    FETCH_APPLICATIONS_SUCCESS = "FETCH_APPLICATIONS_SUCCESS",
    FETCH_APPLICATIONS_FAIL = "FETCH_APPLICATIONS_FAIL",
    APPLICATION_REMOVED = "APPLICATION_REMOVED",
    APPLICATION_ADDED = "APPLICATION_ADDED",
  }
  
  export interface actionApplicationsPending {
    type: fetchApplicationsType.FETCH_APPLICATIONS_LOADING;
  }
  export interface actionApplicationsSuccess {
    type: fetchApplicationsType.FETCH_APPLICATIONS_SUCCESS;
    data: ApplicationData[]; 
  }
  
  export interface actionApplicationsFail {
    type: fetchApplicationsType.FETCH_APPLICATIONS_FAIL;
    error: any;
  }
  
  export interface actionApplicationsRefresh {
    type: fetchApplicationsType.APPLICATION_REMOVED;
    data: string; 
  }
  
 export interface actionApplicationsRenew {
    type: fetchApplicationsType.APPLICATION_ADDED;
    data: string; 
  }
  
  export type ActionFetchApplications =
    | actionApplicationsPending
    | actionApplicationsSuccess
    | actionApplicationsFail
    | actionApplicationsRefresh
    | actionApplicationsRenew;
  
  export interface ApplicationData {
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
  
  export interface FormData {
    _id: string;
    title: string;
    description: string;
    link: string;
    jobpost: Jobpost;
  }
  
  export interface Jobpost {
    _id: string;
    title: string;
    cycle: ApplicationCycleField;
    program: ProgramField;
    cohort: CohortField;
    link: string;
    description: string;
    label: string;
  }
  
  export interface CohortField {
    id: string;
    title: string;
    start: string;
    end: string;
  }
  
 export interface ProgramField {
    _id: string;
    title: string;
    description: string;
    mainObjective: string;
    requirements: string[];
    modeOfExecution: string;
    duration: string;
  }
  
  export interface ApplicationCycleField {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  }
  