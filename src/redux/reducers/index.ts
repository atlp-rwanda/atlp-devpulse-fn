import counterReducer from "./counterReducer";
import deletetraineReducer from "./deletetraineReducer"
import {softdeletetraineReducer,traineReducer} from "./deletetraineReducer"
// import addtraineReducer from "./traineeReducer";
// import { viewtraineReducer } from "./traineeReducer";
import { combineReducers } from "redux";
import traineeReducer from "./traineeReducer";
const allReducers = combineReducers({
  counter: counterReducer,
  deletetraine:deletetraineReducer,
  softdeletetraine:softdeletetraineReducer,
  // viewtrainee:viewtraineReducer,
  // addtrainee:addtraineReducer,
  trainee: traineeReducer ,
  traine:traineReducer,
});

export default allReducers;
