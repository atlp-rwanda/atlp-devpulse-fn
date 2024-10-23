
export enum LoggedUserActionTypes {
  PENDING = 'GET_LOGGED_USER_PENDING',
  SUCCESS = 'GET_LOGGED_USER_SUCCESS',
  FAIL = 'GET_LOGGED_USER_FAIL'
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface ActionPending {
  type: LoggedUserActionTypes.PENDING;
}

interface ActionSuccess {
  type: LoggedUserActionTypes.SUCCESS;
  payload: User;
}

interface ActionFail {
  type: LoggedUserActionTypes.FAIL;
  error: Error;
}

export type LoggedUserAction = ActionPending | ActionSuccess | ActionFail;