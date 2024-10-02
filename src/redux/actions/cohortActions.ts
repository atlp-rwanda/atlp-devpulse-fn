import creator from './creator';
import { GET_COHORTS } from '..';
import axios from './axiosconfig';
import { toast } from 'react-toastify';

export const getAllCohorts = () => async (dispatch: any) => {
  try {
    const datas = await axios.post('/', {
      query: `
        query GetAllCohorts {
        getAllCohorts {
            title
            start
            program
            id
            end
            cycle
            phase
            trainees {
            id
            firstName
            lastName
            }
          }
        }
      `,
    });
    const cohorts = await datas.data.data.getAllCohorts;
    dispatch(creator(GET_COHORTS, cohorts));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};
