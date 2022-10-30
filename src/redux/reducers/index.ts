import counterReducer from "./counterReducer";
import deletetraineReducer from "./deletetraineReducer"
import {softdeletetraineReducer,traineReducer} from "./deletetraineReducer"
import cycleReducer from "./cycleReducer";
import softDeletedTraineeReducer from "./softDeletedTraineesReducer";
import restoretraineReducer from "./RestoreReducer"
// import addtraineReducer from "./traineeReducer";
// import { viewtraineReducer } from "./traineeReducer";
import filterTraineeReducer from "./filterTraineeReducer";
import { combineReducers } from "redux";
import traineeReducer from "./traineeReducer";
import loadDataReducer from "./loadDataReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  deletetraine: deletetraineReducer,
  softdeletetraine: softdeletetraineReducer,
  cycles: cycleReducer,
  softDeletedTrainees: softDeletedTraineeReducer,
  restore: restoretraineReducer,
  // viewtrainee:viewtraineReducer,
  // addtrainee:addtraineReducer,
  trainee: traineeReducer,
  traine: traineReducer,
  filterTrainee: filterTraineeReducer,
  loadData: loadDataReducer,
});

export default allReducers;
