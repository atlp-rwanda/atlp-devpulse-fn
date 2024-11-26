import axios from "./axiosconfig";
import {
  addStageMark,
  advanceToNextStage,
  filterByStage,
  getApplicantStage,
  sendInvitation,
} from "../actiontypes/applicationTypes";
import toast from "react-hot-toast";
import { message } from "antd";

export const AdvanceToNextStage =
  (applicantId: string, nextStage: string, comments: string) =>
  async (dispatch: any) => {
    dispatch({
      type: advanceToNextStage.ADVANCE_TO_NEXT_STAGE_LOADING,
      message: "Loading",
    });
    try {
      const response = await axios.post("/", {
        query: `mutation MoveToNextStage($applicantId: ID!, $nextStage: String!, $comments: String) {
  moveToNextStage(applicantId: $applicantId, nextStage: $nextStage, comments: $comments) {
    message
    success
  }
}`,
        variables: {
          applicantId: applicantId,
          nextStage: nextStage,
          comments: comments,
        },
      });
      if (response.data.errors && response.data.errors.length > 0) {
        dispatch({
          type: advanceToNextStage.ADVANCE_TO_NEXT_STAGE_FAIL,
          message:
            response.data.errors[0].message === "something went wrong"
              ? response.data.errors[0].error
              : response.data.errors[0].message,
        });
        toast.error(
          response.data.errors[0].message === "something went wrong"
            ? response.data.errors[0].error
            : response.data.errors[0].message
        );
        return;
      }
      if (
        response.data.data !== undefined ||
        response.data.data !== null ||
        response.data.data.success === true
      ) {
        dispatch({
          type: advanceToNextStage.ADVANCE_TO_NEXT_STAGE_SUCCESS,
          message: response.data.data.moveToNextStage.message,
        });
        toast.success(response.data.data.moveToNextStage?.message);
        return;
      }
    } catch (error: any) {
      dispatch({
        type: advanceToNextStage.ADVANCE_TO_NEXT_STAGE_FAIL,
        message:
          error.message === "something went wrong"
            ? error.error
            : error.message,
      });
      console.log(error);
    }
  };

export const GetApplicantStage =
  (applicantId: string) => async (dispatch: any) => {
    dispatch({
      type: getApplicantStage.GET_APPLICANT_STAGE_LOADING,
      message: "Loading",
    });
    try {
      const response = await axios.post("/", {
        query: `query GetApplicantStage($applicantId: ID!) {
                getStageHistoryByApplicant(applicantId: $applicantId) {
                    applicantId
                    currentStage
                     history {
                         enteredAt
                         exitedAt
                         stage
                         }
                   }
            }`,
        variables: {
          applicantId: applicantId,
        },
      });
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.map((error) =>
          dispatch({
            type: getApplicantStage.GET_APPLICANT_STAGE_FAIL,
            error: error.error,
          })
        );
        return;
      }
      if (response.data.data !== undefined || response.data.data !== null) {
        dispatch({
          type: getApplicantStage.GET_APPLICANT_STAGE_SUCCESS,
          data: response.data.data.getApplicantStage,
        });
      }
    } catch (error) {
      dispatch({
        type: getApplicantStage.GET_APPLICANT_STAGE_FAIL,
        error,
      });
      console.error(error);
    }
  };

export const addMarks =
  (applicantId: string, stage: string, marks: number) =>
  async (dispatch: any) => {
    dispatch({
      type: addStageMark.ADD_STAGE_MARK_LOADING,
      message: "loading",
    });

    try {
      const response = await axios.post("/", {
        query: `mutation AddScore($applicantId: ID!, $applicantStage: String!, $score: Float!) {
                     addScore(applicantId: $applicantId, applicantStage: $applicantStage, score: $score) 
                     {
                        message
                        success
                      }
                }
                `,
        variables: {
          applicantId: applicantId,
          applicantStage: stage,
          score: marks,
        },
      });
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.map((error) => toast.error(error.message));
        return;
      }
      if (response.data.data !== undefined || response.data.data !== null) {
        dispatch({
          type: addStageMark.ADD_STAGE_MARK_SUCCESS,
          data: response.data.data.addScore,
        });
      }
    } catch (error) {
      toast.error("Error adding marks");
      dispatch({
        type: addStageMark.ADD_STAGE_MARK_FAIL,
        error,
      });
      console.error(error);
    }
  };

export const filterStage = (stage: string) => async (dispatch: any) => {
  dispatch({
    type: filterByStage.FILTER_STAGE_LOADING,
    message: "loading",
  });

  try {
    const response = await axios.post("/", {
      query: `query GetApplicantsByStage($stage: String!) {
  getApplicantsByStage(stage: $stage) {
  applicant {
    _id
    applicationPhase
    email
    firstName
    lastName
    status
  }
  status
  comments
  score
  platform
  invitationLink
  updatedAt
  createdAt
  }
}`,
      variables: {
        stage: stage,
      },
    });
    if (response.data.data !== undefined || response.data.data !== null) {
      dispatch({
        type: filterByStage.FILTER_STAGE_SUCCESS,
        data: response.data.data.getApplicantsByStage,
      });
    }
  } catch (error) {
    dispatch({
      type: filterByStage.FILTER_STAGE_FAIL,
      error,
    });
    console.error(error);
  }
};

export const sendInvitations =
  (applicantId: string, email: string, platform:string, invitationLink: string) =>
  async (dispatch: any) => {
    dispatch({
      type: sendInvitation.SEND_INVITATION_STAGE_LOADING,
      message: "loading",
    });

    try {
      const response = await axios.post("/", {
        query: `mutation SendInvitation($applicantId: ID!, $email: String!, $platform:String!, $invitationLink: String!) {
                      sendInvitation(applicantId: $applicantId, email: $email, platform:$platform, invitationLink: $invitationLink) {
                         message
                         success
                       }
                      }`,
        variables:{
          applicantId: applicantId,
          email: email,
          platform: platform,
          invitationLink: invitationLink,
        }
      });
      if (response.data.data !== undefined || response.data.data !== null) {
        dispatch({
          type: sendInvitation.SEND_INVITATION_STAGE_SUCCESS,
          data: response.data.data.sendInvitation,
        });
        toast.success(response.data.data.sendInvitation.message);
      }
    } catch (error) {
      dispatch({
        type: sendInvitation.SEND_INVITATION_STAGE_FAIL,
        error,
      });
      console.error(error);
    }
  };
