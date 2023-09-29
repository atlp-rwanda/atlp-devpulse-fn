import counterReducer from "./counterReducer";
import deletetraineReducer from "./deletetraineReducer";
import {
  softdeletetraineReducer,
  traineReducer,
  traineCountReducer,
} from "./deletetraineReducer";
import cycleReducer from "./cycleReducer";
import softDeletedTraineeReducer from "./softDeletedTraineesReducer";
import restoretraineReducer from "./RestoreReducer";
import updateTraineeReducer from "./updateTraineeReducer";
import getOneTraineeReducer from "./getOneTraineeReducer";
import updateTraineeAttributesReducer from "./updateTraineeAttributesReducer";
import filterTraineeReducer from "./filterTraineeReducer";
//@ts-ignore
import { combineReducers } from "redux";
import traineeReducer from "./traineeReducer";
import traineesReducer from "./traineeReduces";
import clearTrashReducer from "./clearTrashReducer";
import loadDataReducer from "./loadDataReducer";
import scoreTypesReducers from "./scoreTypesReducers";
import scoreValuesReducer from "./scoreValuesReducer";
import updateStatusReducer from "./updateStatusReducer";
import { membersReducer } from "./usersReducer";
import { rolesReducer } from "./rolesReducer";
import createProgramReducer from "./createProgramReducer";
import fetchProgramsReducer from "./fetchProgramsReducer";
import fetchSingleProgramReducer from "./fetchSingleProgramReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  deletetraine: deletetraineReducer,
  softdeletetraine: softdeletetraineReducer,
  traineeAllDetails: traineesReducer,
  cycles: cycleReducer,
  softDeletedTrainees: softDeletedTraineeReducer,
  restore: restoretraineReducer,
  clearTrash: clearTrashReducer,
  trainee: traineeReducer,
  count: traineCountReducer,
  traine: traineReducer,
  filterTrainee: filterTraineeReducer,
  loadData: loadDataReducer,
  getOneTraineeReducer,
  updateTrainee: updateTraineeReducer,
  updateTraineeAttributes: updateTraineeAttributesReducer,
  scoreTypes: scoreTypesReducers,
  scoreValues: scoreValuesReducer,
  updateTraineeStatus: updateStatusReducer,
  members: membersReducer,
  roles: rolesReducer,
  createProgram: createProgramReducer,
  fetchPrograms: fetchProgramsReducer,
  fetchSingleProgram: fetchSingleProgramReducer,
});

export default allReducers;
