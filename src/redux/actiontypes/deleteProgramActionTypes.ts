export enum deleteProgramType {
    DELETE_PROGRAM_LOADING = "DELETE_PROGRAM_LOADING",
    DELETE_PROGRAM_SUCCESS = "DELETE_PROGRAM_SUCCESS",
    DELETE_PROGRAM_FAIL = "DELETE_PROGRAM_FAIL",
  }
  
  interface actionPending {
    type: deleteProgramType.DELETE_PROGRAM_LOADING;
  }
  interface actionSuccess {
    type: deleteProgramType.DELETE_PROGRAM_SUCCESS;
    message: string;
  }  
  interface actionFail {
    type: deleteProgramType.DELETE_PROGRAM_FAIL;
    error: any;
  }
  
  export type ActionDelete = actionPending | actionSuccess | actionFail;
  