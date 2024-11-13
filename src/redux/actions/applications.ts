import { ViewSingleApplication } from "./adminListApplications";
import {
  fetchMyApplications,
  deleteOwnApplication,
  fetchSingleOwnApplication,
} from "../actiontypes/applicationTypes";
import axios from "./axiosconfig";
import { toast } from "react-toastify";
import creator from "./creator";
import { MY_APPLICATIONS } from "redux";

export const getMyApplications =
  (filter: any, pagination: any) => async (dispatch: any) => {
    dispatch({
      type: fetchMyApplications.FETCH_MYAPPLICATIONS_LOADING,
      data: null,
      message: "loading",
    });
    try {
      const response = await axios.post("/", {
        query: `query ViewAllOwnApplications($filter: ApplicationFilter, $pagination: PaginationInput) {
  viewAllOwnApplications(filter: $filter, pagination: $pagination) {
    message
    totalCount
    applications {
      _id
      firstName
      lastName
      email
      telephone
      gender
      resume
      comments
      address
      status
      dateOfSubmission
      availability_for_interview
      formUrl
      associatedForm {
        _id
        title
        description
        link
        jobpost
      }
    }
  }
}`,
        variables: {
          filter: {
            status: `${filter}`,
          },
          pagination: {
            pageSize: pagination.pageSize,
            page: pagination.page,
          },
        },
      });
      if (response.data.data.viewAllOwnApplications != null) {
        let toastShown = false;
        dispatch({
          type: fetchMyApplications.FETCH_MYAPPLICATIONS_SUCCESS,
          data: response.data.data.viewAllOwnApplications,
          message: response.data.data.viewAllOwnApplications.message,
        });
        toast.success(response.data.data.viewAllOwnApplications.message);
        return response.data.data;
      } else {
        dispatch({
          type: fetchMyApplications.FETCH_MYAPPLICATIONS_FAIL,
          error: response.data.errors[0].message,
        });
        toast.error(response.data.errors[0].message);
        return response.data.data;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

export const deleteApplication =
  (application_id: any) => async (dispatch: any) => {
    dispatch({
      type: deleteOwnApplication.DELETE_APPLICATION_LOADING,
    });
    try {
      const response = await axios.post("/", {
        query: `mutation DeleteCandidateApplication($deleteCandidateApplicationId: ID!) {
  deleteCandidateApplication(id: $deleteCandidateApplicationId) {
    message
    id
  }
}`,
        variables: {
          deleteCandidateApplicationId: application_id,
        },
      });

      if (response.data?.data != null) {
        if (
          response.data?.data?.deleteCandidateApplication.message ===
          "Application has been withdrawn!"
        ) {
          toast.success(
            response.data?.data?.deleteCandidateApplication.message
          );
        }
        dispatch({
          type: deleteOwnApplication.DELETE_APPLICATION_SUCCESS,
          message: "success",
          data: response.data?.data?.deleteCandidateApplication,
        });
        // dispatch({
        //   type: fetchMyApplications.APPLICATION_DELETED_SUCCESS,
        //   message: 'success',
        //   data: response.data?.data?.deleteCandidateApplication,
        // });
        return response.data.data;
      } else {
        toast.error(response.data?.data);
      }
      return response;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

export const getSingleApplication =
  (application_id: any) => async (dispatch: any) => {
    dispatch({
      type: fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_LOADING,
      data: null,
      message: "loading",
    });
    try {
      const response = await axios.post("/", {
        query: `query ViewOwnApplication($viewOwnApplicationId: ID!) {
  viewOwnApplication(id: $viewOwnApplicationId) {
      _id
      firstName
      lastName
      email
      telephone
      gender
      resume
      comments
      address
      status
      dateOfSubmission
      availability_for_interview
      formUrl
      associatedForm {
        _id
        title
        description
        link
        jobpost
      }
    }
  }
`,
        variables: {
          viewOwnApplicationId: application_id,
        },
      });
      if (response.data.data?.viewOwnApplication != null) {
        dispatch({
          type: fetchSingleOwnApplication.FETCH_SINGLE_APPLICATION_SUCCESS,
          data: response.data.data.viewOwnApplication,
          message: "Success",
        });
      } else {
        toast.error("Something went wrong");
      }
      return response.data.data;
    } catch (err: any) {
      toast.error(err.message);
    }
  };

// NEW FUNCTIONALITY FOR GET APPLICATION BY USER

export const getMyOwnAppliedJob = () => async (dispatch: any) => {
  dispatch({
    type: fetchMyApplications.FETCH_MYAPPLICATIONS_LOADING,
    data: [],
    message: "loading",
  });
  try {
    const response = await axios.post("/", {
      query: `query GetMyOuwAppliedJob {
                getMyOwnAppliedJob {
                 appliedJob {
                    key
                    value
                  }
                  id
                  status
                }
             }`
    });
    if (response.data.data?.getMyOwnAppliedJob != null) {
      dispatch({
        type: fetchMyApplications.FETCH_MYAPPLICATIONS_SUCCESS,
        data: response.data.data.getMyOwnAppliedJob,
        message: "Success",
      });
    } else {
      toast.error(response.data.errors[0].message);
    }
    return response.data.data;
  } catch (err: any) {
    toast.error(err.message);
  }
};

export const getApplicantCyclesApplications = async () => {
  const response = await axios.post("/", {
    query: `
      query GetTraineeCyclesApplications {
        getTraineeCyclesApplications {
          email
          firstName
          lastName
          user
          applicationPhase
          status
          _id
          cycle_id {
            name
            startDate
            endDate
            createdAt
          }
          createdAt
        }
      }
    `
  });
  return response.data;
};

export const getCyclesApplicationAttributes = async (trainee_id: string) => {
  const response = await axios.post("/", {
    query: `
      query GetApplicationsAttributes($trainee_id: String!) {
        getApplicationsAttributes(trainee_id: $trainee_id) {
          gender
          birth_date
          Address
          phone
          field_of_study
          education_level
          province
          district
          sector
          isEmployed
          haveLaptop
          isStudent
          Hackerrank_score
          interview
          interview_decision
          past_andela_programs
          understandTraining
          trainee_id
        }
      }
    `,
    variables: {
      trainee_id: trainee_id,
    },
  });
  return response.data;
};
export const getCyclesStages = async (trainee_id: String) => {
  const response = await axios.post("/", {
    query: `
      query GetApplicationStages($trainee_id: String!) {
        getApplicationStages(trainee_id: $trainee_id) {
          shortlist {
            applicantId
            status
            comments
            createdAt
          }
          technical {
            applicantId
            status
            score
            comments
            createdAt
          }
          interview {
            applicantId
            status
            interviewScore
            comments
            createdAt
          }
          admitted {
            applicantId
            status
            comments
            createdAt
          }
          dismissed {
            applicantId
            stageDismissedFrom
            comments
            status
            createdAt
          }
          allStages {
            applicantId
            currentStage
            history {
              stage
              comments
              enteredAt
              exitedAt
            }
          }
        }
      }
    `,
    variables: {
      trainee_id
    }
  });

  return response.data;
};