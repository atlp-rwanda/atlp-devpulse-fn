import {
  SINGLE_USER,
  SINGLE_USER_FAIL,
  USER_TO_UPDATE,
  USER_TO_UPDATE_FAIL,
} from "..";

interface UserState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

const userUpdateReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case SINGLE_USER:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case SINGLE_USER_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case USER_TO_UPDATE:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case USER_TO_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userUpdateReducer;
