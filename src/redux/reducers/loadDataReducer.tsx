import { LOAD_DATA_INTO_DB_FAIL, LOAD_DATA_INTO_DB_REQUEST, LOAD_DATA_INTO_DB_SUCCESS } from "..";

const initialState: {
  Loading: boolean;
  message: string;
  error: string;
} = {
  Loading: false,
  message: "",
  error: "",
};

 const loadDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_DATA_INTO_DB_REQUEST:
      return {
        error: "",
        message: "",
        loading: true,
      };
    case LOAD_DATA_INTO_DB_SUCCESS:
      return {
        error:"",
        message: action.payload,
        loading: false,
      };
    case LOAD_DATA_INTO_DB_FAIL:
      return {
        message:"",
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loadDataReducer;
