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
      toast.error(response.data.error[0].error);
    }
    return response.data.data;
  } catch (err: any) {
    toast.error(err.message);
  }
};
