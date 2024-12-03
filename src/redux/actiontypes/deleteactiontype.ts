export enum DeleteActionType {
  DELETE_TRAINE_LOADING = "DELETE_TRAINE_LOADING",
  DELETE_TRAINE_SUCCESS = "DELETE_TRAINE_SUCCESS",
  DELETE_TRAINE_FAIL = "DELETE_TRAINE_FAIL",
}
export enum softDeleteActionType {
  softDELETE_TRAINE_LOADING = "softDELETE_TRAINE_LOADING",
  softDELETE_TRAINE_SUCCESS = "softDELETE_TRAINE_SUCCESS",
  softDELETE_TRAINE_FAIL = "softDELETE_TRAINE_FAIL",
}
export enum fetchtrainesss {
  fetchtraines_success = "fetchtraines_success",
  fetchtraines_fail = "fetchtraines_fail",
  createtrainee_success = "createtrainee_success",
  createtrainee_fail = "createtrainee_fail",
}
export enum fetchtrainapplicantcount {
  fetchtrainapplicantcount_success = "fetchtrainapplicantcount_success",
  fetchtrainapplicantcount_fail = "fetchtrainapplicantcount_fail",
}

export enum fetchprogramcount {
  fetchprogramcount_success = "fetchprogramcount_Success",
  fetchprogramcount_fail = "fetchprogramcount_fail",
}

export enum fetchjobpostcount {
  fetchjobpostcount_success = "fetchjobpostcount_Success",
  fetchjobpostcount_fail = "fetchjobpostcount_fail",
}

export enum fetchrolesandaccesscount {
  fetchrolesandaccesscount_success = "fetchrolesandaccesscount_Success",
  fetchrolesandaccesscount_fail = "fetchrolesandaccesscount_fail",
}

export enum fetchUser {
  fetchMembers = "fetchMembers_success"
}

export enum fetchRole {
  fetchRoles = "fetchRoles_success"
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

interface fetchtraines {
  type: fetchtrainesss.fetchtraines_success;
  data: any;
}
interface fetchtrainesfail {
  type: fetchtrainesss.fetchtraines_fail;
  error: any;
}

interface fetchtraincount {
  type: fetchtrainapplicantcount.fetchtrainapplicantcount_success;
  data: any;
}
interface fetchtraincountfail {
  type: fetchtrainapplicantcount.fetchtrainapplicantcount_fail;
  error: any;
}

interface fetchprogramcountsuccess {
  type: fetchprogramcount.fetchprogramcount_success;
  data: any;
}

interface fetchprogramcountfail {
  type: fetchprogramcount.fetchprogramcount_fail;
  error: any;
}

interface fetchjobcountsuccess {
  type: fetchjobpostcount.fetchjobpostcount_success;
  data: any;
}

interface fetchjobcountfail {
  type: fetchjobpostcount.fetchjobpostcount_fail;
  error: any;
}

interface fetchrolescountsuccess {
  type: fetchrolesandaccesscount.fetchrolesandaccesscount_success;
  data: any;
}

interface fetchrolescountfail {
  type: fetchrolesandaccesscount.fetchrolesandaccesscount_fail;
  error: any;
}

interface fetchUsers {
  type: fetchUser.fetchMembers;
  data: any;
}

interface fetchUserRole {
  type: fetchRole.fetchRoles;
  data: any;
}

export type Action = actionPending | actionSuccess | actionFail;
export type softAction = softactionPending | softactionSuccess | softactionFail;
export type fetchact =
  | fetchtraines
  | fetchtrainesfail
  | createtrainee
  | createtraineefail;
export type fetchtrainapplicantscount = fetchtraincount | fetchtraincountfail;
export type fetchprogramscount = fetchprogramcountsuccess | fetchprogramcountfail;
export type fetchjobscount = fetchjobcountsuccess | fetchjobcountfail;
export type fetchrolescount = fetchrolescountsuccess | fetchrolescountfail;

export type fetchMembers = fetchUsers;
export type fetchUserRoles = fetchUserRole;
