

export enum RestoreActionType {
    RESTORE_TRAINE_LOADING = 'RESTORE_TRAINE_LOADING',
    RESTORE_TRAINE_SUCCESS = 'RESTORE_TRAINE_SUCCESS',
    RESTORE_TRAINE_FAIL = 'RESTORE_TRAINE_FAIL'
}

interface actionPending {
    type: RestoreActionType.RESTORE_TRAINE_LOADING;
}
interface actionSuccess {
    type: RestoreActionType.RESTORE_TRAINE_SUCCESS;
    message: string;
}

interface actionFail {
    type: RestoreActionType.RESTORE_TRAINE_FAIL;
    error: any;
}



export type Action = actionPending | actionSuccess | actionFail;

