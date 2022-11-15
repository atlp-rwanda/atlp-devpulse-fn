import counterReducer from "./counterReducer";
import deletetraineReducer from "./deletetraineReducer";
import { softdeletetraineReducer, traineReducer } from "./deletetraineReducer";
import cycleReducer from "./cycleReducer";
import softDeletedTraineeReducer from "./softDeletedTraineesReducer";
import restoretraineReducer from "./RestoreReducer";
import updateTraineeReducer from "./updateTraineeReducer";
import getOneTraineeReducer from "./getOneTraineeReducer";
import updateTraineeAttributesReducer from "./updateTraineeAttributesReducer";
// import addtraineReducer from "./traineeReducer";
// import { viewtraineReducer } from "./traineeReducer";
import filterTraineeReducer from "./filterTraineeReducer";
//@ts-ignore
import { combineReducers } from "redux";
import traineeReducer from "./traineeReducer";
import traineesReducer from "./traineeReduces";

import clearTrashReducer from "./clearTrashReducer";
import scoreTypesReducers from "./scoreTypesReducers";
import scoreValuesReducer from "./scoreValuesReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  deletetraine: deletetraineReducer,
  softdeletetraine: softdeletetraineReducer,
  traineeAllDetails: traineesReducer,
  // deletetraine: deletetraineReducer,
  // softdeletetraine: softdeletetraineReducer,
  cycles: cycleReducer,
  softDeletedTrainees: softDeletedTraineeReducer,
  restore: restoretraineReducer,
  clearTrash: clearTrashReducer,
  // viewtrainee:viewtraineReducer,
  // addtrainee:addtraineReducer,
  trainee: traineeReducer,
  traine: traineReducer,
  filterTrainee: filterTraineeReducer,
  getOneTraineeReducer,
  updateTrainee: updateTraineeReducer,
  updateTraineeAttributes: updateTraineeAttributesReducer,
  scoreTypes: scoreTypesReducers,
  scoreValues: scoreValuesReducer,
});

export default allReducers;
