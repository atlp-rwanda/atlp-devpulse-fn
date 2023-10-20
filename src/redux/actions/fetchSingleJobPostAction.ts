import axios from './axiosconfig';
import { toast } from 'react-toastify';
import { Dispatch } from 'react';
import {
  fetchSingleJobPostType,
  Action,
} from '../actiontypes/fetchSingleJobPostTypes';

export const fetchSingleJobPost = (JobPostData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: 'post',
        data: {
          query: `
          query GetJobApplication($getJobApplicationId: ID!) {
            getJobApplication(id: $getJobApplicationId) {
                id
                title
                program {
                title
                }
                cycle {
                name
                }
                cohort {
                title
                }
                description
            }
            }
            `,
          variables: {
            getJobApplicationId: JobPostData,
          },
        },
      });
      console.log(response);
      if (response.data.data !== null) {
        dispatch({
          type: fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_SUCCESS,
          data: response.data.data.getJobApplication,
        });
      }

      if (response.data.errors) {
        toast.error('Job Post could not be fetched');

        let mess;
        response.data.errors.map((b: any) => {
          mess = b.message;
        });
        dispatch({
          type: fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_FAIL,
          error: mess,
        });
      }
    } catch (error) {
      toast.error('Job Post could not be fetched');

      dispatch({
        type: fetchSingleJobPostType.FETCH_SINGLE_JOB_POST_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
