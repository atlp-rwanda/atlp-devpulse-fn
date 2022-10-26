import counterReducer from "./counterReducer";
import { combineReducers } from "redux";
import traineeReduces from "./traineeReduces";

const allReducers = combineReducers({
  counter: counterReducer,
  trainee: traineeReduces,
});

export default allReducers;
