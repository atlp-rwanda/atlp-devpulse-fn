import creator from './creator';
import { GET_PROGRAMS } from '..';
import axios from './axiosconfig';
import { toast } from 'react-toastify';

export const getAllPrograms = () => async (dispatch: any) => {
  try {
    const datas = await axios.post('/', {
      query: `
        query GetAll($data: Page!) {
          getAll(data: $data) {
            _id
            title
            requirements
            description
            modeOfExecution
            mainObjective
          }
      }
      `,
      variables: {
        data: {
          page: 1,
          pageSize: 20,
        },
      },
    });
    const programs = await datas.data.data.getAll;
    dispatch(creator(GET_PROGRAMS, programs));
    return programs.length;
  } catch (error) {
    return 0;
  }
};
