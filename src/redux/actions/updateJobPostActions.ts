import { updateJobPostType, Action } from '../actiontypes/updateJobPostActionTypes';
import axios from './axiosconfig';
import { toast } from 'react-toastify';
import { Dispatch } from 'react';
import {
  ActionFetch,
  fetchJobPostType,
} from '../../redux/actiontypes/fetchJobActionTypes';

export const updateJobPostAction = (jobPostData: any) => {
  return async (dispatch: Dispatch<Action | ActionFetch>) => {
    dispatch({
      type: updateJobPostType.UPDATE_JOB_POST_LOADING,
    });

    try {
      const {
        id,
        title,
        program,
        cycle,
        cohort,
        description,
      } = jobPostData;

      const response = await axios({
        url: process.env.BACKEND_URL,
        method: 'post',
        data: {
          query: `
          mutation Mutation($updateJobApplicationId: String, $jobFields: jobUpdate) {
            updateJobApplication(id: $updateJobApplicationId, jobFields: $jobFields) {
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
            updateJobApplicationId: null,
            jobFields: {
              title: null,
              program: null,
              cycle: null,
              cohort: null,
              description: null,
            },
          },
        },
      });

      if (response.data.data !== null) {
        toast.success('Job Post updated');
        dispatch({
          type: updateJobPostType.UPDATE_JOB_POST_SUCCESS,
          message: response.data.data,
        });
      } else {
        console.log(response.data);
        toast.error(response.data.errors[0].message);

        dispatch({
          type: updateJobPostType.UPDATE_JOB_POST_FAIL,
          error: response.data.errors[0],
        });
      }
    } catch (error) {
      toast.error('Job Post not created');

      dispatch({
        type: updateJobPostType.UPDATE_JOB_POST_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
