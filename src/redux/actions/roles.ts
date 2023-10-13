import axios from './axiosconfig';
import { fetchRole } from '../actiontypes/deleteactiontype';
import { toast } from 'react-toastify';

export const getRoles = () => async (dispatch: any) => {
  try {
    const data = await axios.post('/', {
      query: `
      query GetAllRoles {
        getAllRoles {
          _id
          roleName
          description
          permissions {
            entity
            _id
            create
            viewOwn
            viewMultiple
            viewOne
            updateOwn
            updateMultiple
            updateOne
            deleteOwn
            deleteMultiple
            deleteOne
          }
        }
      }
             `,
    });
    if (data.data.data.getAllRoles !== undefined) {
      dispatch({
        type: fetchRole.fetchRoles,
        data: data.data.data.getAllRoles,
      });
    } else {
      data?.data?.errors !== undefined
        ? toast.error(data?.data?.errors[0].message)
        : toast.error('Something went wrong');
    }

    return data.data.data;
  } catch (err) {
    console.log(err);
  }
};
