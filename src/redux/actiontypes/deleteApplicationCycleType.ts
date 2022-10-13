
export enum DeleteActionType {
    DELETE_APPLICATION_CYLCLE_LOADING = 'DELETE_APPLICATION_CYLCLE_LOADING',
    DELETE_APPLICATION_CYLCLE_SUCCESS = 'DELETE_APPLICATION_CYLCE_SUCCESS',
    DELETE_APPLICATION_CYLCLE_FAIL = 'DELETE_APPLICATION_CYLE_FAIL'
}
interface actionPending {
    type: DeleteActionType.DELETE_APPLICATION_CYLCLE_LOADING;
}
interface actionSuccess {
    type: DeleteActionType.DELETE_APPLICATION_CYLCLE_SUCCESS;
    message: string;
}
interface actionFail {
    type: DeleteActionType.DELETE_APPLICATION_CYLCLE_FAIL;
    error: any;
}
export type Action = actionSuccess | actionFail | actionPending;
