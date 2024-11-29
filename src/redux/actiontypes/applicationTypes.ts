export enum fetchMyApplications {
  FETCH_MYAPPLICATIONS_LOADING = 'FETCH_MY_APPLICATIONS_LOADING',
  FETCH_MYAPPLICATIONS_SUCCESS = 'FETCH_MY_APPLICATIONS_SUCCESS',
  FETCH_MYAPPLICATIONS_FAIL = 'FETCH_MY_APPLICATIONS_FAIL',
  APPLICATION_DELETED_SUCCESS = 'APPLICATION_DELETED_SUCCESS',
}
export enum deleteOwnApplication {
  DELETE_APPLICATION_LOADING = 'DELETE_APPLICATION_LOADING',
  DELETE_APPLICATION_SUCCESS = 'DELETE_APPLICATION_SUCCESS',
  DELETE_APPLICATION_FAIL = 'DELETE_APPLICATION_FAIL',
}
export enum fetchSingleOwnApplication {
  FETCH_SINGLE_APPLICATION_LOADING = 'FETCH_SINGLE_APPLICATION_LOADING',
  FETCH_SINGLE_APPLICATION_SUCCESS = 'FETCH_SINGLE_APPLICATION_SUCCESS',
  FETCH_SINGLE_APPLICATION_FAIL = 'FETCH_SINGLE_APPLICATION_FAIL',
}

export enum advanceToNextStage {
  ADVANCE_TO_NEXT_STAGE_LOADING = 'ADVANCE_TO_NEXT_STAGE_LOADING',
  ADVANCE_TO_NEXT_STAGE_SUCCESS = 'ADVANCE_TO_NEXT_STAGE_SUCCESS',
  ADVANCE_TO_NEXT_STAGE_FAIL = 'ADVANCE_TO_NEXT_STAGE_FAIL',
}

export enum getApplicantStage {
  GET_APPLICANT_STAGE_LOADING = 'GET_APPLICANT_STAGE_LOADING',
  GET_APPLICANT_STAGE_SUCCESS = 'GET_APPLICANT_STAGE_SUCCESS',
  GET_APPLICANT_STAGE_FAIL = 'GET_APPLICANT_STAGE_FAIL',
}

export enum addStageMark {
  ADD_STAGE_MARK_LOADING = "ADD_STAGE_MARK_LOADING",
  ADD_STAGE_MARK_SUCCESS = "ADD_STAGE_MARK_SUCCESS",
  ADD_STAGE_MARK_FAIL = "ADD_STAGE_MARK_FAIL",

}

export enum filterByStage {
  FILTER_STAGE_LOADING = "FILTER_STAGE_LOADING",
  FILTER_STAGE_SUCCESS = "FILTER_STAGE_SUCCESS",
  FILTER_STAGE_FAIL = "FILTER_STAGE_FAIL",
}

export enum sendInvitation {
  SEND_INVITATION_STAGE_LOADING = "SEND_INVITATION_STAGE_LOADING",
  SEND_INVITATION_STAGE_SUCCESS = "SEND_INVITATION_STAGE_SUCCESS",
  SEND_INVITATION_STAGE_FAIL = "SEND_INVITATION_STAGE_FAIL",
}
interface actionPending {
  type: fetchMyApplications.FETCH_MYAPPLICATIONS_LOADING;
}

interface actionSuccess {
  type: fetchMyApplications.FETCH_MYAPPLICATIONS_SUCCESS;
  message: string;
  data: any;
}

interface actionFail {
  type: fetchMyApplications.FETCH_MYAPPLICATIONS_FAIL;
  error: any;
}
interface actionRefresh {
  type: fetchMyApplications.APPLICATION_DELETED_SUCCESS;
  error: any;
  data: any;
}
interface deleteOwnApplicationActionPending {
  type: deleteOwnApplication.DELETE_APPLICATION_LOADING;
}
interface deleteOwnApplicationActionSuccess {
  type: deleteOwnApplication.DELETE_APPLICATION_SUCCESS;
  message: string;
  data: any;
}

interface deleteOwnApplicationActionFail {
  type: deleteOwnApplication.DELETE_APPLICATION_FAIL;
  error: any;
}

interface fetchSingleOwnApplicationActionPending {
  type: fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_LOADING;
}
interface fetchSingleOwnApplicationActionSuccess {
  type: fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_SUCCESS;
  message: string;
  data: any;
}

interface fetchSingleOwnApplicationActionFail {
  type: fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_FAIL;
  error: any;
}

interface advanceToNextStageActionPending {
  type: advanceToNextStage.ADVANCE_TO_NEXT_STAGE_LOADING;
}
interface advanceToNextStageActionSuccess {
  type: advanceToNextStage.ADVANCE_TO_NEXT_STAGE_SUCCESS;
  message: string;
  data: any;
}

interface advanceToNextStageActionFail {
  type: advanceToNextStage.ADVANCE_TO_NEXT_STAGE_FAIL;
  message: any;
}

interface getApplicantStageActionPending{
  type: getApplicantStage.GET_APPLICANT_STAGE_LOADING;
}
interface getApplicantStageActionSuccess{
  type: getApplicantStage.GET_APPLICANT_STAGE_SUCCESS;
  message: string;
  data: any;
}

interface getApplicantStageActionFail{
  type: getApplicantStage.GET_APPLICANT_STAGE_FAIL;
  error: any;
}

interface addStageMarkActionPending{
  type: addStageMark.ADD_STAGE_MARK_LOADING;
}
interface addStageMarkActionSuccess{
  type: addStageMark.ADD_STAGE_MARK_SUCCESS;
  message: string;
  data: any;
}

interface filterByStageActionFail{
  type: filterByStage.FILTER_STAGE_FAIL;
  message: any;
}

interface filterByStageActionPending{
  type: filterByStage.FILTER_STAGE_LOADING;
}
interface filterByStageActionSuccess{
  type: filterByStage.FILTER_STAGE_SUCCESS;
  message: string;
  data: any;
}

interface sendInvitationActionFail{
  type: sendInvitation.SEND_INVITATION_STAGE_FAIL;
  message: any;
}

interface sendInvitationActionPending{
  type: sendInvitation.SEND_INVITATION_STAGE_LOADING;
}
interface sendInvitationActionSuccess{
  type: sendInvitation.SEND_INVITATION_STAGE_SUCCESS;
  message: string;
  data: any;
}
interface addStageMarkActionFail{
  type: addStageMark.ADD_STAGE_MARK_FAIL;
  message: any;
}
export type Action =
  | actionPending
  | actionSuccess
  | actionFail
  | actionRefresh
  | deleteOwnApplicationActionPending
  | deleteOwnApplicationActionFail
  | deleteOwnApplicationActionSuccess
  | fetchSingleOwnApplicationActionPending
  | fetchSingleOwnApplicationActionFail
  | fetchSingleOwnApplicationActionSuccess
  | advanceToNextStageActionPending
  | advanceToNextStageActionFail
  | advanceToNextStageActionSuccess
  | getApplicantStageActionPending
  | getApplicantStageActionFail
  | getApplicantStageActionSuccess
  | addStageMarkActionPending
  | addStageMarkActionFail
  | addStageMarkActionSuccess
  | filterByStageActionPending
  | filterByStageActionFail
  | filterByStageActionSuccess
  | sendInvitationActionPending
  | sendInvitationActionFail
  | sendInvitationActionSuccess
