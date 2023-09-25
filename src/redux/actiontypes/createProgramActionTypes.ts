export enum createProgramType {
  CREATE_PROGRAM_LOADING = "CREATE_PROGRAM_LOADING",
  CREATE_PROGRAM_SUCCESS = "CREATE_PROGRAM_SUCCESS",
  CREATE_PROGRAM_FAIL = "CREATE_PROGRAM_FAIL",
}

interface actionPending {
  type: createProgramType.CREATE_PROGRAM_LOADING;
}
interface actionSuccess {
  type: createProgramType.CREATE_PROGRAM_SUCCESS;
  message: string;
}

interface actionFail {
  type: createProgramType.CREATE_PROGRAM_FAIL;
  error: any;
}

export type Action = actionPending | actionSuccess | actionFail;
