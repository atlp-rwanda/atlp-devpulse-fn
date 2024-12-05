import creator from './creator';
import { GET_Docs } from '..';
import axios from './axiosconfig';
import { toast } from 'react-toastify';

export const getAllDocs = () => async (dispatch: any) => {
  try {
    const datas = await axios.post('/', {
      query: `
        query GetAllDocs {
          getAllDocs {
                id
                title
                description
              }
      }
      `,
    });
    const documentations = await datas.data.data.getAllDocs;
    dispatch(creator(GET_Docs, documentations));
    return documentations.length;
  } catch (error) {
    return 0;
  }
};
