import counterReducer from "./counterReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
});

export default allReducers;
