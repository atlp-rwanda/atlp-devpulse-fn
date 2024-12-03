export enum createDocsType {
    CREATE_Docs_LOADING = "CREATE_Docs_LOADING",
    CREATE_Docs_SUCCESS = "CREATE_Docs_SUCCESS",
    CREATE_Docs_FAIL = "CREATE_Docs_FAIL",
  }
  
  interface actionPending {
    type: createDocsType.CREATE_Docs_LOADING;
  }
  interface actionSuccess {
    type: createDocsType.CREATE_Docs_SUCCESS;
    message: string;
  }
  
  interface actionFail {
    type: createDocsType.CREATE_Docs_FAIL;
    error: any;
  }
  
  export type Action = actionPending | actionSuccess | actionFail;
  