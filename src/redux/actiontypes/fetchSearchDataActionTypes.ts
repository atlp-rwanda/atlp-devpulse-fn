export enum fetchSearchDataType {
    FETCH_SEARCH_DATA_LOADING = "FETCH_SEARCH_DATA_LOADING",
    FETCH_SEARCH_DATA_SUCCESS = "FETCH_SEARCH_DATA_SUCCESS",
    FETCH_SEARCH_DATA_FAILURE = "FETCH_SEARCH_DATA_FAILURE",
  };
  
  interface FetchSearchDataLoadingAction {
    type: typeof fetchSearchDataType.FETCH_SEARCH_DATA_LOADING;
  }
  
  interface FetchSearchDataSuccessAction {
    type: typeof fetchSearchDataType.FETCH_SEARCH_DATA_SUCCESS;
    data: string;
  }
  
  interface FetchSearchDataFailureAction {
    type: typeof fetchSearchDataType.FETCH_SEARCH_DATA_FAILURE;
    error: any;
  }
  
  export type ActionFetch =
    | FetchSearchDataLoadingAction
    | FetchSearchDataSuccessAction
    | FetchSearchDataFailureAction;