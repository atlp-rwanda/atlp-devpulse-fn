import { LoggedUserActionTypes, LoggedUserAction, User } from '../actiontypes/loggedUserType';

interface LoggedUserState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const initialState: LoggedUserState = {
  user: null,
  loading: false,
  error: null,
};

const loggedUserReducer = (
  state: LoggedUserState = initialState,
  action: LoggedUserAction
): LoggedUserState => {
  switch (action.type) {
    case LoggedUserActionTypes.PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LoggedUserActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case LoggedUserActionTypes.FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default loggedUserReducer;