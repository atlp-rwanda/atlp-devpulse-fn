import {
  createJobPostType,
  Action,
} from '../actiontypes/createJobPostActionTypes';
import {
  fetchJobPostType,
  ActionFetch,
} from '../actiontypes/fetchJobActionTypes';
import axios from './axiosconfig';
import { toast } from 'react-toastify';
import { Dispatch } from 'react';


export const createJobPostAction = (JobPostData: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: createJobPostType.CREATE_JOB_POST_LOADING,
    });
    try {
      
      const { title, program, cycle, cohort, description, label } = JobPostData;

      const response = await axios.post('/', {
        query: `mutation CreateJobApplication($jobFields: jobInput) {
                    createJobApplication(jobFields: $jobFields) {
                        title
                        program {
                        title
                        description
                        requirements
                        }
                        cycle {
                        id
                        name
                        startDate
                        endDate
                        }
                        cohort {
                        id
                        title
                        program
                        cycle
                        start
                        end
                        }
                        description
                    }
                    }`,
        variables: {
          jobFields: {
            title,
            program,
            cycle,
            cohort,
            description,
            label:"public",
          },
        },
      });

      console.log(response.data);
      if (response.data.data !== null) {
        toast.success('Job Post created');
        dispatch({
          type: createJobPostType.CREATE_JOB_POST_SUCCESS,
          message: response.data.data,
        });
        dispatch({
          type: fetchJobPostType.JOB_POST_ADDED,
          data: response.data.data.createJobApplication,
        });
      } else {
        console.log(response.data);
        toast.error(response.data.errors[0].message);

        dispatch({
          type: createJobPostType.CREATE_JOB_POST_FAIL,
          error: response.data.errors[0],
        });
      }
    } catch (error) {
      toast.error('Job Post not created');

      dispatch({
        type: createJobPostType.CREATE_JOB_POST_FAIL,
        error,
      });
      console.log(error);
    }
  };
};
