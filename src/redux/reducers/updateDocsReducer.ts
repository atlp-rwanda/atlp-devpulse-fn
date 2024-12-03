import { Action, updateDocsType } from "../actiontypes/updateDocTypes";

interface State {
  success: boolean;
  loading: boolean;
  error: any;
  message: any;
}

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

const updateDocsReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case updateDocsType.UPDATE_Docs_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
      };
    case updateDocsType.UPDATE_Docs_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case updateDocsType.UPDATE_Docs_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default updateDocsReducer;
