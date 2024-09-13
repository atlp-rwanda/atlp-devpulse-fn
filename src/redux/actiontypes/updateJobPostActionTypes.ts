export enum updateJobPostType {
  UPDATE_JOB_POST_LOADING = 'UPDATE_JOB_POST_LOADING',
  UPDATE_JOB_POST_SUCCESS = 'UPDATE_JOB_POST_SUCCESS',
  UPDATE_JOB_POST_FAIL = 'UPDATE_JOB_POST_FAIL',
}

interface actionPending {
  type: updateJobPostType.UPDATE_JOB_POST_LOADING;
}
interface actionSuccess {
  type: updateJobPostType.UPDATE_JOB_POST_SUCCESS;
  message: string;
}

interface actionFail {
  type: updateJobPostType.UPDATE_JOB_POST_FAIL;
  error: any;
}

export type Action = actionPending | actionSuccess | actionFail;
