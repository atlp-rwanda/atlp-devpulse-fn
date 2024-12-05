export enum updateDocsType {
    UPDATE_Docs_LOADING = "UPDATE_Docs_LOADING",
    UPDATE_Docs_SUCCESS = "UPDATE_Docs_SUCCESS",
    UPDATE_Docs_FAIL = "UPDATE_Docs_FAIL",
  }
  
  interface actionPending {
    type: updateDocsType.UPDATE_Docs_LOADING;
  }
  interface actionSuccess {
    type: updateDocsType.UPDATE_Docs_SUCCESS;
    message: string;
  }
  
  interface actionFail {
    type: updateDocsType.UPDATE_Docs_FAIL;
    error: any;
  }
  
  export type Action = actionPending | actionSuccess | actionFail;
  