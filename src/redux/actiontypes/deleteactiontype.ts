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
export enum fetchtrainesss{
    fetchtraines_success='fetchtraines_success',
    fetchtraines_fail='fetchtraines_fail',
    createtrainee_success = "createtrainee_success",
    createtrainee_fail = "createtrainee_fail",
}
export enum fetchtrainapplicantcount{
    fetchtrainapplicantcount_success='fetchtrainapplicantcount_success',
    fetchtrainapplicantcount_fail='fetchtrainapplicantcount_fail'
}

interface createtrainee {
    type: fetchtrainesss.createtrainee_success;
    data: any;
  }
  interface createtraineefail {
    type: fetchtrainesss.createtrainee_fail;
    error: any;
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

interface fetchtraines{
    type: fetchtrainesss.fetchtraines_success;
    data: any;
}
interface fetchtrainesfail{
    type: fetchtrainesss.fetchtraines_fail;
    error: any;
}

interface fetchtraincount{
    type: fetchtrainapplicantcount.fetchtrainapplicantcount_success;
    data: any;
}
interface fetchtraincountfail{
    type: fetchtrainapplicantcount.fetchtrainapplicantcount_fail;
    error: any;
}


export type Action = actionPending | actionSuccess | actionFail;
export type softAction = softactionPending | softactionSuccess | softactionFail;
export type fetchact = fetchtraines|fetchtrainesfail|createtrainee|createtraineefail;
export type fetchtrainapplicantscount = fetchtraincount|fetchtraincountfail;
