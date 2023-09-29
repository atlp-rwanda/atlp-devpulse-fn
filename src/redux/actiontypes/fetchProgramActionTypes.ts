export enum fetchProgramType {
    FETCH_PROGRAM_LOADING = "FETCH_PROGRAM_LOADING",
    FETCH_PROGRAM_SUCCESS = "FETCH_PROGRAM_SUCCESS",
    FETCH_PROGRAM_FAIL = "FETCH_PROGRAM_FAIL",
  }
  
  interface actionPending {
    type: fetchProgramType.FETCH_PROGRAM_LOADING;
  }
  interface actionSuccess {
    type: fetchProgramType.FETCH_PROGRAM_SUCCESS;
    data: string;
  }
  
  interface actionFail {
    type: fetchProgramType.FETCH_PROGRAM_FAIL;
    error: any;
  }
  
  export type Action = actionPending | actionSuccess | actionFail;
  