import counterReducer from './counterReducer';
import deletetraineReducer from './deletetraineReducer';
import {
  softdeletetraineReducer,
  traineReducer,
  traineCountReducer,
} from './deletetraineReducer';
import cycleReducer from './cycleReducer';
import softDeletedTraineeReducer from './softDeletedTraineesReducer';
import restoretraineReducer from './RestoreReducer';
import updateTraineeReducer from './updateTraineeReducer';
import getOneTraineeReducer from './getOneTraineeReducer';
import updateTraineeAttributesReducer from './updateTraineeAttributesReducer';
import filterTraineeReducer from './filterTraineeReducer';
import filterJobPostReducer from './filterJobPostReducer';
//@ts-ignore
import { combineReducers } from 'redux';
import traineeReducer from './traineeReducer';
import traineesReducer from './traineeReduces';
import clearTrashReducer from './clearTrashReducer';
import loadDataReducer from './loadDataReducer';
import scoreTypesReducers from './scoreTypesReducers';
import scoreValuesReducer from './scoreValuesReducer';
import updateStatusReducer from './updateStatusReducer';
import { membersReducer } from './usersReducer';
import { rolesReducer } from './rolesReducer';
import createProgramReducer from './createProgramReducer';
import fetchProgramsReducer from './fetchProgramsReducer';
import fetchSingleProgramReducer from './fetchSingleProgramReducer';
import deleteProgramReducer from './deleteProgramReducer';
import updateProgramReducer from './updateProgramReducer';
import fetchJobPostReducer from './fetchJobPostReducer';
import createJobPostReducer from './createJobPostReducer';
import fetchSingleJobPostReducer from './fetchSingleJobPostReducer';
import deleteJobPostReducer from './deleteJobPostReducer';
import programReducer from './programReducer';
import cohortReducer from './cohortReducer';
import updateJobPostReducer from './updateJobPostReducer';
import {
  applicationsReducer,
  singleApplicationReducer,
} from './applicationReducer';
import { assessmentsReducer } from './assessmentReducer';
import { attendanceReducer } from './attendanceReducer';
import { performanceReducer } from './performanceReducer';
import filterProgramsReducer from './filterProgramsReducer';
import filterRoleReducer from './filterRoleReducer';
import fetchSearchDataReducer from './fetchSearchDataReducer';

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
  filterJobPost: filterJobPostReducer,
  filterRole:filterRoleReducer,
  filterProgram:filterProgramsReducer,
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
  deleteProgram: deleteProgramReducer,
  updateProgram: updateProgramReducer,
  fetchJobPost: fetchJobPostReducer,
  fetchSingleJobPost: fetchSingleJobPostReducer,
  createJobPost: createJobPostReducer,
  deleteJobPost: deleteJobPostReducer,
  updateJobPost: updateJobPostReducer,
  programs: programReducer,
  cohorts: cohortReducer,
  myApplications: applicationsReducer,
  currentApplication: singleApplicationReducer,
  assessments: assessmentsReducer,
  searchData: fetchSearchDataReducer,
  traineeApplicant: traineeReducer,
  traineeAttendance: attendanceReducer,
  traineePerformance: performanceReducer
});

export type RootState = ReturnType<typeof allReducers>;

export default allReducers;
