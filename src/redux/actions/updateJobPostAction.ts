import {
  updateJobPostType,
  Action,
} from '../actiontypes/updateJobPostActionTypes';
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
      const { id, title, program, cycle, cohort, description,published } = jobPostData;

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
                published
            }
            }
          `,
          variables: {
            updateJobApplicationId: id,
            jobFields: {
              title,
              program,
              cycle,
              cohort,
              description,
              published
            },
          },
        },
      });

      if (response.data.data !== null) {
        dispatch({
          type: updateJobPostType.UPDATE_JOB_POST_SUCCESS,
          message: response.data.data,
        });
      } else {
        console.log(response.data);


        dispatch({
          type: updateJobPostType.UPDATE_JOB_POST_FAIL,
          error: response.data.errors[0],
        });
      }
    } catch (error) {

      dispatch({
        type: updateJobPostType.UPDATE_JOB_POST_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
