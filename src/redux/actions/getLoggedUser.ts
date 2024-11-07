import { AppDispatch } from '../store';
import { GraphQLClient } from 'graphql-request';
import { LoggedUserActionTypes, User, LoggedUserAction } from '../actiontypes/loggedUserTypes';

const CURRENT_USER_QUERY = `
  query {
    currentUser {
      firstName
      lastName
      email
    }
  }
`;

const loggedUserPending = (): LoggedUserAction => ({
  type: LoggedUserActionTypes.PENDING
});

const loggedUserSuccess = (user: User): LoggedUserAction => ({
  type: LoggedUserActionTypes.SUCCESS,
  payload: user
});

const loggedUserFail = (error: Error): LoggedUserAction => ({
  type: LoggedUserActionTypes.FAIL,
  error
});

const createGraphQLClient = (token: string): GraphQLClient => {
  return new GraphQLClient(process.env.BACKEND_URL as string, {
    headers: {
      Authorization: token,
    },
  });
};

const fetchCurrentUser = async (client: GraphQLClient): Promise<User> => {
  const response = await client.request<{ currentUser: User }>(CURRENT_USER_QUERY);
  return response.currentUser;
};

const getAuthToken = (): string => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

export const loggedUserAction = () => async (dispatch: AppDispatch) => {
  dispatch(loggedUserPending());
  
  try {
    const token = getAuthToken();
    const client = createGraphQLClient(token);
    const user = await fetchCurrentUser(client);
    
    dispatch(loggedUserSuccess(user));
  } catch (error) {
    console.error('Error fetching logged user:', error);
    dispatch(loggedUserFail(error instanceof Error ? error : new Error('An unknown error occurred')));
  }
};