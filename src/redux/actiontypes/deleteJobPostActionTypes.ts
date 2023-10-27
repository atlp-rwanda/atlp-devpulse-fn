export enum deleteJobPostType {
  DELETE_JOB_POST_LOADING = 'DELETE_JOB_POST_LOADING',
  DELETE_JOB_POST_SUCCESS = 'DELETE_JOB_POST_SUCCESS',
  DELETE_JOB_POST_FAIL = 'DELETE_JOB_POST_FAIL',
}

interface actionPending {
  type: deleteJobPostType.DELETE_JOB_POST_LOADING;
}
interface actionSuccess {
  type: deleteJobPostType.DELETE_JOB_POST_SUCCESS;
  message: string;
}
interface actionFail {
  type: deleteJobPostType.DELETE_JOB_POST_FAIL;
  error: any;
}

export type ActionDelete = actionPending | actionSuccess | actionFail;
