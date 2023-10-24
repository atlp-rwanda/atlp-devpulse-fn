export enum fetchMyApplications {
  FETCH_MYAPPLICATIONS_LOADING = 'FETCH_MY_APPLICATIONS_LOADING',
  FETCH_MYAPPLICATIONS_SUCCESS = 'FETCH_MY_APPLICATIONS_SUCCESS',
  FETCH_MYAPPLICATIONS_FAIL = 'FETCH_MY_APPLICATIONS_FAIL',
  APPLICATION_DELETED_SUCCESS = 'APPLICATION_DELETED_SUCCESS',
}
export enum deleteOwnApplication {
  DELETE_APPLICATION_LOADING = 'DELETE_APPLICATION_LOADING',
  DELETE_APPLICATION_SUCCESS = 'DELETE_APPLICATION_SUCCESS',
  DELETE_APPLICATION_FAIL = 'DELETE_APPLICATION_FAIL',
}
export enum fetchSingleOwnApplication {
  FETCH_SINGLE_APPLICATION_LOADING = 'FETCH_SINGLE_APPLICATION_LOADING',
  FETCH_SINGLE_APPLICATION_SUCCESS = 'FETCH_SINGLE_APPLICATION_SUCCESS',
  FETCH_SINGLE_APPLICATION_FAIL = 'FETCH_SINGLE_APPLICATION_FAIL',
}
interface actionPending {
  type: fetchMyApplications.FETCH_MYAPPLICATIONS_LOADING;
}

interface actionSuccess {
  type: fetchMyApplications.FETCH_MYAPPLICATIONS_SUCCESS;
  message: string;
  data: any;
}

interface actionFail {
  type: fetchMyApplications.FETCH_MYAPPLICATIONS_FAIL;
  error: any;
}
interface actionRefresh {
  type: fetchMyApplications.APPLICATION_DELETED_SUCCESS;
  error: any;
  data: any;
}
interface deleteOwnApplicationActionPending {
  type: deleteOwnApplication.DELETE_APPLICATION_LOADING;
}
interface deleteOwnApplicationActionSuccess {
  type: deleteOwnApplication.DELETE_APPLICATION_SUCCESS;
  message: string;
  data: any;
}

interface deleteOwnApplicationActionFail {
  type: deleteOwnApplication.DELETE_APPLICATION_FAIL;
  error: any;
}

interface fetchSingleOwnApplicationActionPending {
  type: fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_LOADING;
}
interface fetchSingleOwnApplicationActionSuccess {
  type: fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_SUCCESS;
  message: string;
  data: any;
}

interface fetchSingleOwnApplicationActionFail {
  type: fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_FAIL;
  error: any;
}
export type Action =
  | actionPending
  | actionSuccess
  | actionFail
  | actionRefresh
  | deleteOwnApplicationActionPending
  | deleteOwnApplicationActionFail
  | deleteOwnApplicationActionSuccess
  | fetchSingleOwnApplicationActionPending
  | fetchSingleOwnApplicationActionFail
  | fetchSingleOwnApplicationActionSuccess;
