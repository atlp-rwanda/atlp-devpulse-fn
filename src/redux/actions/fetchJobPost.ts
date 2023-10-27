import axios from './axiosconfig';
import { toast } from 'react-toastify';
import { Dispatch } from 'react';
import {
  fetchJobPostType,
  ActionFetch,
} from '../actiontypes/fetchJobActionTypes';

export const fetchJobPost = () => async (dispatch: any) => {
  try {
    const response = await axios.post('/', {
      query: `
            query ExampleQuery($input: pagination) {
              getAllJobApplication(input: $input) {
                  id
                  title
                  program {
                    title
                    description
                    requirements
                  }
                  cohort {
                    cycle
                    end
                    program
                    title
                  }
                  cycle {
                    name
                  }
                  description
                  label
                  link
                }
        }
            `,
      variables: {
        input: {
          page: 1,
          All: true,
        },
      },
    });
    console.log(response);
    if (response.data.data !== null) {
      dispatch({
        type: fetchJobPostType.FETCH_JOB_POST_SUCCESS,
        data: response.data.data.getAllJobApplication,
      });
    }

    if (response.data.errors) {
      toast.error('Job Post could not be fetched');

      let mess;
      response.data.errors.map((b: any) => {
        mess = b.message;
      });
      dispatch({
        type: fetchJobPostType.FETCH_JOB_POST_FAIL,
        error: mess,
      });
    }
    return response;
  } catch (error) {
    toast.error('Job Post could not be fetched');

    dispatch({
      type: fetchJobPostType.FETCH_JOB_POST_FAIL,
      error,
    });
    console.log(error);
  }
};
