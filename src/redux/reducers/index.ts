import counterReducer from "./counterReducer";
import deletetraineReducer from "./deletetraineReducer";
import { softdeletetraineReducer } from "./deletetraineReducer";
import cycleReducer from "./cycleReducer";
import softDeletedTraineeReducer from "./softDeletedTraineesReducer";
// import addtraineReducer from "./traineeReducer";
// import { viewtraineReducer } from "./traineeReducer";
import { combineReducers } from "redux";
import traineeReducer from "./traineeReducer";
const allReducers = combineReducers({
  counter: counterReducer,
  deletetraine: deletetraineReducer,
  softdeletetraine: softdeletetraineReducer,
  cycles: cycleReducer,
  softDeletedTrainees: softDeletedTraineeReducer,
  // viewtrainee:viewtraineReducer,
  // addtrainee:addtraineReducer,
  trainee: traineeReducer,
});

export default allReducers;
