export enum fetchJobPostType {
  FETCH_JOB_POST_LOADING = 'FETCH_JOB_POST_LOADING',
  FETCH_JOB_POST_SUCCESS = 'FETCH_JOB_POST_SUCCESS',
  FETCH_JOB_POST_FAIL = 'FETCH_JOB_POST_FAIL',
  JOB_POST_REMOVED = 'JOB_POST_REMOVED',
  JOB_POST_ADDED = 'JOB_POST_ADDED',
}

interface actionPending {
  type: fetchJobPostType.FETCH_JOB_POST_LOADING;
}
interface actionSuccess {
  type: fetchJobPostType.FETCH_JOB_POST_SUCCESS;
  data: string;
}

interface actionFail {
  type: fetchJobPostType.FETCH_JOB_POST_FAIL;
  error: any;
}
interface actionRefresh {
  type: fetchJobPostType.JOB_POST_REMOVED;
  data: string;
}

interface actionRenew {
  type: fetchJobPostType.JOB_POST_ADDED;
  data: string;
}

export type ActionFetch =
  | actionPending
  | actionSuccess
  | actionFail
  | actionRefresh
  | actionRenew;
