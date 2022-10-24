import counterReducer from "./counterReducer";
import deletetraineReducer from "./deletetraineReducer"
import {softdeletetraineReducer} from "./deletetraineReducer"
// import addtraineReducer from "./traineeReducer";
// import { viewtraineReducer } from "./traineeReducer";
import { combineReducers } from "redux";
<<<<<<< HEAD
import traineeReducer from "./traineeReducer";
const allReducers = combineReducers({
  counter: counterReducer,
  deletetraine:deletetraineReducer,
  softdeletetraine:softdeletetraineReducer,
  // viewtrainee:viewtraineReducer,
  // addtrainee:addtraineReducer,
  trainee: traineeReducer ,
=======
import cycleReducer from "./cycleReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  cycles: cycleReducer,
>>>>>>> develop
});

export default allReducers;
