import {
    ActionFetch,
    fetchDocsType,
  } from "../actiontypes/fetchDocsActionTypes";
  
  interface State {
    success: boolean;
    loading: boolean;
    error: any;
    data: any;
    count: number;
  }
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
    data: [],
    count: 0,
  };
  
  const fetchDocsReducer = (
    state: State = initialState,
    action: ActionFetch
  ): State => {
    switch (action.type) {
      case fetchDocsType.FETCH_Docs_LOADING:
        return {
          loading: true,
          success: false,
          error: null,
          data: null,
          count: 0,
        };
      case fetchDocsType.FETCH_Docs_SUCCESS:
        console.log("Fetched docs in reducer:", action.data);
        return {
          ...state,
          loading: false,
          data: action.data,
          count: action.data.length,
        };
      case fetchDocsType.FETCH_Docs_FAIL:
        return {
          ...state,
          data: initialState.data,
          loading: false,
          error: action.error,
        };
      case fetchDocsType.Docs_REMOVED:
        return {
          ...state,
          loading: false,
          //@ts-ignore
          data: state.data.filter((item) => item.id !== action.data.id),
        };
  
      case fetchDocsType.Docs_ADDED:
        const previousItems = state.data;
        //@ts-ignore
        let existingItem = state.data.find(
          //@ts-ignore
          (item) => item.id === action.data.id
        );
  
        //@ts-ignore
        let newItem = !existingItem && action.data;
        //@ts-ignore

  
        return {
          ...state,
          loading: false,
          data: newItem ? [...previousItems, newItem] : previousItems,
        };
      default:
        return state;
    }
  };
  
  export default fetchDocsReducer;
  