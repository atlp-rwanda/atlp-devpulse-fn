import { AppDispatch } from '../store';
import { GraphQLClient } from 'graphql-request';
import { LoggedUserActionTypes, User, LoggedUserAction } from '../actiontypes/loggedUserType';

const CURRENT_USER_QUERY = `
  query {
    currentUser {
      firstName
      lastName
      email
    }
  }
`;

export const loggedUserPending = (): LoggedUserAction => ({
  type: LoggedUserActionTypes.PENDING
});

export const loggedUserSuccess = (user: User): LoggedUserAction => ({
  type: LoggedUserActionTypes.SUCCESS,
  payload: user
});

export const loggedUserFail = (error: Error): LoggedUserAction => ({
  type: LoggedUserActionTypes.FAIL,
  error
});

export const loggedUserAction = () => async (dispatch: AppDispatch) => {
  dispatch(loggedUserPending());
  try {
    const token = localStorage.getItem('access_token');

    if (!token) {
      throw new Error('No authentication token found');
    }
    const client = new GraphQLClient(process.env.BACKEND_URL as string, {
      headers: {
        Authorization: token,
      },
    });

    const response = await client.request<{ currentUser: User }>(CURRENT_USER_QUERY);
    const user = response.currentUser;
    console.log(user);
    dispatch(loggedUserSuccess(user));
  } catch (error) {
    console.error('Error fetching logged user:', error);
    dispatch(loggedUserFail(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
};