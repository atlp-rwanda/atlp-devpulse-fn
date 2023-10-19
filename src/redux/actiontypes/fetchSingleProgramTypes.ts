export enum fetchSingleProgramType {
    FETCH_SINGLE_PROGRAM_LOADING = "FETCH_SINGLE_PROGRAM_LOADING",
    FETCH_SINGLE_PROGRAM_SUCCESS = "FETCH_SINGLE_PROGRAM_SUCCESS",
    FETCH_SINGLE_PROGRAM_FAIL = "FETCH_SINGLE_PROGRAM_FAIL",
  }
  
  interface actionPending {
    type: fetchSingleProgramType.FETCH_SINGLE_PROGRAM_LOADING;
  }
  interface actionSuccess {
    type: fetchSingleProgramType.FETCH_SINGLE_PROGRAM_SUCCESS;
    data: string;
  }
  
  interface actionFail {
    type: fetchSingleProgramType.FETCH_SINGLE_PROGRAM_FAIL;
    error: any;
  }
  
  export type Action = actionPending | actionSuccess | actionFail;
  