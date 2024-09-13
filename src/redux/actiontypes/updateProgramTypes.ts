export enum updateProgramType {
    UPDATE_PROGRAM_LOADING = "UPDATE_PROGRAM_LOADING",
    UPDATE_PROGRAM_SUCCESS = "UPDATE_PROGRAM_SUCCESS",
    UPDATE_PROGRAM_FAIL = "UPDATE_PROGRAM_FAIL",
  }
  
  interface actionPending {
    type: updateProgramType.UPDATE_PROGRAM_LOADING;
  }
  interface actionSuccess {
    type: updateProgramType.UPDATE_PROGRAM_SUCCESS;
    message: string;
  }
  
  interface actionFail {
    type: updateProgramType.UPDATE_PROGRAM_FAIL;
    error: any;
  }
  
  export type Action = actionPending | actionSuccess | actionFail;
  