import counterReducer from "./counterReducer";
import { combineReducers } from "redux";
import cycleReducer from "./cycleReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  cycles: cycleReducer,
});

export default allReducers;
