import {
  fetchMyApplications,
  deleteOwnApplication,
} from '../actiontypes/applicationTypes';
import axios from './axiosconfig';
import { toast } from 'react-toastify';
import creator from './creator';
import { MY_APPLICATIONS } from 'redux';

export const getMyApplications =
  (filter: any, pagination: any) => async (dispatch: any) => {
    dispatch({
      type: fetchMyApplications.FETCH_MYAPPLICATIONS_LOADING,
      data: null,
      message: 'loading',
    });
    try {
      const response = await axios.post('/', {
        query: `query ViewAllOwnApplications($filter: ApplicationFilter, $pagination: PaginationInput) {
  viewAllOwnApplications(filter: $filter, pagination: $pagination) {
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
        dispatch({
          type: fetchMyApplications.FETCH_MYAPPLICATIONS_SUCCESS,
          data: response.data.data.viewAllOwnApplications,
          message: 'success',
        });
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
      toast.error(err.message);
    }
  };

export const deleteApplication =
  (application_id: any) => async (dispatch: any) => {
    dispatch({
      type: deleteOwnApplication.DELETE_APPLICATION_LOADING,
    });
    try {
      const response = await axios.post('/', {
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
          'Application has been withdrawn!'
        ) {
          toast.success(
            response.data?.data?.deleteCandidateApplication.message,
          );
        }
        dispatch({
          type: deleteOwnApplication.DELETE_APPLICATION_SUCCESS,
          message: 'success',
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
