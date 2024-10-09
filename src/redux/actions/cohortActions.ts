import creator from './creator';
import { GET_COHORTS } from '..';
import axios from './axiosconfig';
import { toast } from 'react-toastify';

export const getAllCohorts = () => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data : {
        query: `
        query GetAllCohorts {
        getAllCohorts {
            title
            start
            program{
            _id
            title
            }
            id
            end
            cycle {
            name
            id
            }
        }
      }
      `
      }
   
    });
    const cohorts = await datas.data.data.getAllCohorts;
    dispatch(creator(GET_COHORTS, cohorts));
    return cohorts.length;
  } catch (error) {
    return 0;
  }
};
