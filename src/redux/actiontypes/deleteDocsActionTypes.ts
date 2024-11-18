export enum deleteDocsType {
    DELETE_Docs_LOADING = "DELETE_Docs_LOADING",
    DELETE_Docs_SUCCESS = "DELETE_Docs_SUCCESS",
    DELETE_Docs_FAIL = "DELETE_Docs_FAIL",
  }
  
  interface actionPending {
    type: deleteDocsType.DELETE_Docs_LOADING;
  }
  interface actionSuccess {
    type: deleteDocsType.DELETE_Docs_SUCCESS;
    message: string;
  }  
  interface actionFail {
    type: deleteDocsType.DELETE_Docs_FAIL;
    error: any;
  }
  
  export type ActionDelete = actionPending | actionSuccess | actionFail;
  