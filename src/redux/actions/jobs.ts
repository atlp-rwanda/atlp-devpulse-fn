import creator from './creator';
// import axios from "axios";
import axios from './axiosconfig';
import { GET_ONE_JOB_POST_ALL_DETAILS } from '..';

export const getOnejobPostAllDetails =
  ({ id }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: 'post',
        data: {
          query: `
          query GetJobApplication($getJobApplicationId: ID!) {
            getJobApplication(id: $getJobApplicationId) {
                title
                id
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
            input: {
              id,
            },
          },
        },
      });

      const response = await datas.data.data.getOnejobPostAllDetails;
      // console.log( response)
      dispatch(creator(GET_ONE_JOB_POST_ALL_DETAILS, response));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
