export enum fetchDocsType {
    FETCH_Docs_LOADING = "FETCH_Docs_LOADING",
    FETCH_Docs_SUCCESS = "FETCH_Docs_SUCCESS",
    FETCH_Docs_FAIL = "FETCH_Docs_FAIL",
    Docs_REMOVED = "Docs_REMOVED",
    Docs_ADDED = "Docs_ADDED",
    Docs_EDITED = "Docs_EDITED",
  }
  
  interface actionPending {
    type: fetchDocsType.FETCH_Docs_LOADING;
  }
  interface actionSuccess {
    type: fetchDocsType.FETCH_Docs_SUCCESS;
    data: string;
  }
  
  interface actionFail {
    type: fetchDocsType.FETCH_Docs_FAIL;
    error: any;
  }
  
  interface actionRefresh {
    type: fetchDocsType.Docs_REMOVED;
    data: string;
  }
  
  interface actionRenew {
    type: fetchDocsType.Docs_ADDED;
    data: string;
  }
  
  interface actionUpdate {
    type: fetchDocsType.Docs_EDITED;
    data: string;
  }
  
  export type ActionFetch =
    | actionPending
    | actionSuccess
    | actionFail
    | actionRefresh
    | actionRenew
    | actionUpdate;
  