import counterReducer from "./counterReducer";
import deletetraineReducer from "./deletetraineReducer"
import {softdeletetraineReducer,traineReducer} from "./deletetraineReducer"
import cycleReducer from "./cycleReducer";
import softDeletedTraineeReducer from "./softDeletedTraineesReducer";
import restoretraineReducer from "./RestoreReducer"
// import addtraineReducer from "./traineeReducer";
// import { viewtraineReducer } from "./traineeReducer";
import { combineReducers } from "redux";
import traineeReducer from "./traineeReducer";
import traineesReducer from "./traineeReduces"



const allReducers = combineReducers({
  counter: counterReducer,
  deletetraine:deletetraineReducer,
  softdeletetraine:softdeletetraineReducer,
  traineeAllDetails: traineesReducer,
  // deletetraine: deletetraineReducer,
  // softdeletetraine: softdeletetraineReducer,
  cycles: cycleReducer,
  softDeletedTrainees: softDeletedTraineeReducer,
  restore:restoretraineReducer,
  // viewtrainee:viewtraineReducer,
  // addtrainee:addtraineReducer,
  trainee: traineeReducer ,
  traine:traineReducer,
  
});

export default allReducers;
