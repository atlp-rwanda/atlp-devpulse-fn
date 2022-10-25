

export enum DeleteActionType {
    DELETE_TRAINE_LOADING = 'DELETE_TRAINE_LOADING',
    DELETE_TRAINE_SUCCESS = 'DELETE_TRAINE_SUCCESS',
    DELETE_TRAINE_FAIL = 'DELETE_TRAINE_FAIL'
}
export enum softDeleteActionType {
    softDELETE_TRAINE_LOADING = 'softDELETE_TRAINE_LOADING',
    softDELETE_TRAINE_SUCCESS = 'softDELETE_TRAINE_SUCCESS',
    softDELETE_TRAINE_FAIL = 'softDELETE_TRAINE_FAIL'
}


interface actionPending {
    type: DeleteActionType.DELETE_TRAINE_LOADING;
}
interface actionSuccess {
    type: DeleteActionType.DELETE_TRAINE_SUCCESS;
    message: string;
}

interface actionFail {
    type: DeleteActionType.DELETE_TRAINE_FAIL;
    error: any;
}

interface softactionPending {
    type: softDeleteActionType.softDELETE_TRAINE_LOADING;
}
interface softactionSuccess {
    type: softDeleteActionType.softDELETE_TRAINE_SUCCESS;
    message: string;
}

interface softactionFail {
    type: softDeleteActionType.softDELETE_TRAINE_FAIL;
    error: any;
}


export type Action = actionPending | actionSuccess | actionFail;
export type softAction = softactionPending | softactionSuccess | softactionFail;
