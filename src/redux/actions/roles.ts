import axios from "./axiosconfig";
import { fetchRole } from "../actiontypes/deleteactiontype";

export const getRoles = () => async (dispatch: any) => {

    try {
      const data = await axios.post("/",
            { query: `
              query getRoles {
                roles {
                    _id
                    description
                    roleName
                    permissions {
                      viewOwn {
                        isPermitted
                      }
                      updateMultiple {
                        isPermitted
                      }
                    }
                    
                  }
               }
             `
         }
     );
     dispatch({
       type: fetchRole.fetchRoles,
       data: data.data.data.roles,
       
     });
     return data.data.data;
 } catch (err){
     console.log(err);
     
 }
 }