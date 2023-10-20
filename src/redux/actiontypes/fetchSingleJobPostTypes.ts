export enum fetchSingleJobPostType {
  FETCH_SINGLE_JOB_POST_LOADING = 'FETCH_SINGLE_JOB_POST_LOADING',
  FETCH_SINGLE_JOB_POST_SUCCESS = 'FETCH_SINGLE_JOB_POST_SUCCESS',
  FETCH_SINGLE_JOB_POST_FAIL = 'FETCH_SINGLE_JOB_POST_FAIL',
}

interface actionPending {
  type: fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_LOADING;
}
interface actionSuccess {
  type: fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_SUCCESS;
  data: string;
}

interface actionFail {
  type: fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_FAIL;
  error: any;
}

export type Action = actionPending | actionSuccess | actionFail;
