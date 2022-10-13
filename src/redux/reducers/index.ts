import counterReducer from "./counterReducer";
import { combineReducers } from "redux";
import deleteApplicationCycleReducer  from "./deleteApplicationCycleReducers";

const allReducers = combineReducers({
  counter: counterReducer,
  deleteApplicationCycle:deleteApplicationCycleReducer
});

export default allReducers;
