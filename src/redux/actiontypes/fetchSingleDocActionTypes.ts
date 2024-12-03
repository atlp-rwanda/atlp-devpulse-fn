export enum fetchSingleDocsType {
    FETCH_SINGLE_Docs_LOADING = "FETCH_SINGLE_Docs_LOADING",
    FETCH_SINGLE_Docs_SUCCESS = "FETCH_SINGLE_Docs_SUCCESS",
    FETCH_SINGLE_Docs_FAIL = "FETCH_SINGLE_Docs_FAIL",
  }
  
  interface actionPending {
    type: fetchSingleDocsType.FETCH_SINGLE_Docs_LOADING;
  }
  interface actionSuccess {
    type: fetchSingleDocsType.FETCH_SINGLE_Docs_SUCCESS;
    data: string;
  }
  
  interface actionFail {
    type: fetchSingleDocsType.FETCH_SINGLE_Docs_FAIL;
    error: any;
  }
  
  export type Action = actionPending | actionSuccess | actionFail;
  