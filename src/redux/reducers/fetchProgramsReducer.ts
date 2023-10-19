import {
  ActionFetch,
  fetchProgramType,
} from "../actiontypes/fetchProgramActionTypes";

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
  data: null,
  count: 0,
};

const fetchProgramsReducer = (
  state: State = initialState,
  action: ActionFetch
): State => {
  switch (action.type) {
    case fetchProgramType.FETCH_PROGRAM_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        data: null,
        count: 0,
      };
    case fetchProgramType.FETCH_PROGRAM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        count: action.data.length,
      };
    case fetchProgramType.FETCH_PROGRAM_FAIL:
      return {
        ...state,
        data: initialState.data,
        loading: false,
        error: action.error,
      };
    case fetchProgramType.PROGRAM_REMOVED:
      return {
        ...state,
        loading: false,
        //@ts-ignore
        data: state.data.filter((item) => item._id !== action.data._id),
      };
    case fetchProgramType.PROGRAM_ADDED:
      const previousItems = state.data;
      //@ts-ignore
      let existingItem = state.data.find(
        //@ts-ignore
        (item) => item._id === action.data._id
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

export default fetchProgramsReducer;
