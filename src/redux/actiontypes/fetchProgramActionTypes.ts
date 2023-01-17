export enum fetchProgramType {
  FETCH_PROGRAM_LOADING = "FETCH_PROGRAM_LOADING",
  FETCH_PROGRAM_SUCCESS = "FETCH_PROGRAM_SUCCESS",
  FETCH_PROGRAM_FAIL = "FETCH_PROGRAM_FAIL",
  PROGRAM_REMOVED = "PROGRAM_REMOVED",
  PROGRAM_ADDED = "PROGRAM_ADDED",
  PROGRAM_EDITED = "PROGRAM_EDITED",
}

interface actionPending {
  type: fetchProgramType.FETCH_PROGRAM_LOADING;
}
interface actionSuccess {
  type: fetchProgramType.FETCH_PROGRAM_SUCCESS;
  data: string;
}

interface actionFail {
  type: fetchProgramType.FETCH_PROGRAM_FAIL;
  error: any;
}

interface actionRefresh {
  type: fetchProgramType.PROGRAM_REMOVED;
  data: string;
}

interface actionRenew {
  type: fetchProgramType.PROGRAM_ADDED;
  data: string;
}

interface actionUpdate {
  type: fetchProgramType.PROGRAM_EDITED;
  data: string;
}

export type ActionFetch =
  | actionPending
  | actionSuccess
  | actionFail
  | actionRefresh
  | actionRenew
  | actionUpdate;
