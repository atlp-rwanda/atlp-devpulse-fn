import axios from "./axiosconfig";
import { fetchRole } from "../actiontypes/deleteactiontype";
import { toast } from "react-toastify";

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
     if (data?.data?.data?.roles !== undefined){
     dispatch({
       type: fetchRole.fetchRoles,
       data: data.data.data.roles,
       
     });
    } else {
      (data?.data?.errors !== undefined) ?
        toast.error(data?.data?.errors[0].message) :
        toast.error("Something went wrong");

    }
    
     return data.data.data;
 } catch (err){
     console.log(err);
     
 }
 }