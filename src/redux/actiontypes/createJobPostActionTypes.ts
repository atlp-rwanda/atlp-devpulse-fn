export enum createJobPostType {
  CREATE_JOB_POST_LOADING = 'CREATE_JOB_POST_LOADING',
  CREATE_JOB_POST_SUCCESS = 'CREATE_JOB_POST_SUCCESS',
  CREATE_JOB_POST_FAIL = 'CREATE_JOB_POST_FAIL',
}

interface actionPending {
  type: createJobPostType.CREATE_JOB_POST_LOADING;
}
interface actionSuccess {
  type: createJobPostType.CREATE_JOB_POST_SUCCESS;
  message: string;
}

interface actionFail {
  type: createJobPostType.CREATE_JOB_POST_FAIL;
  error: any;
}

export type Action = actionPending | actionSuccess | actionFail;
