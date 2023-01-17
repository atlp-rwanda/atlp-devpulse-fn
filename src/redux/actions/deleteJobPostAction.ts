import {
  deleteJobPostType,
  ActionDelete,
} from '../actiontypes/deleteJobPostActionTypes';
import {
  fetchJobPostType,
  ActionFetch,
} from '../../redux/actiontypes/fetchJobActionTypes';
import axios from './axiosconfig';
import { toast } from 'react-toastify';
import { Dispatch } from 'react';

export const deleteJobPostAction = (JobPostData: any) => {
  return async (dispatch: Dispatch<ActionDelete | ActionFetch>) => {
    dispatch({
      type: deleteJobPostType.DELETE_JOB_POST_LOADING,
    });
    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: 'post',
        data: {
          query: `
          mutation Mutation($deleteJobApplicationId: ID!) {
            deleteJobApplication(id: $deleteJobApplicationId)
            }
          `,
          variables: {
            deleteJobApplicationId: JobPostData.id,
          },
        },
      });
      if (response.data.data !== null) {
        toast.success('Job Post deleted');
        dispatch({
          type: deleteJobPostType.DELETE_JOB_POST_SUCCESS,
          message: response.data.data,
        });

        dispatch({
          type: fetchJobPostType.JOB_POST_REMOVED,
          data: JobPostData.id,
        });
      } else {
        toast.error(response.data.errors[0].message);

        dispatch({
          type: deleteJobPostType.DELETE_JOB_POST_FAIL,
          error: response.data.errors[0],
        });
      }
    } catch (error) {
      toast.error('Job Post not deleted');

      dispatch({
        type: deleteJobPostType.DELETE_JOB_POST_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
