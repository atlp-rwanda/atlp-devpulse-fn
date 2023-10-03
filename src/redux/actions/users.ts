import { fetchUser } from "../actiontypes/deleteactiontype";
import axios from "./axiosconfig";


export const getAllMembers=() => async (dispatch: any) => {

   try {
     const data = await axios.post("/",
           { query: `
             query getMembers {
                getUsers_Logged {
                  firstname
                  lastname
                  gender
                  country
                  code
                  email
                  id
                  createdAt
                  isActive
                  picture
                  role {
                    _id
                    description
                    permissions {
                      _id
                    }
                    roleName
                  }
                  
                  telephone
                }
              }
            `
        }
    );
    dispatch({
      type: fetchUser.fetchMembers,
      data: data.data
      ,
    });
    
    return data.data;
} catch (err){
    console.log(err);
    return err;
    
}
}

export const assignMemberRoles= async (userId, roleId)  => {

  try {
    const data = await axios.post("/",
          { query: `
          mutation Mutation( $assignRoleToUserId2: ID!, $roleId: ID!) {
            assignRoleToUser(ID: $assignRoleToUserId2, roleID: $roleId) {
              role {
                _id
                description
                permissions {
                  _id
                }
                roleName
              }
              picture
              
              isActive
              id
              email
              createdAt
            }
          }
          
           `
           ,
       variables: {
          assignRoleToUserId2: userId,
          roleId
       }
       }
   );
  
   return data.data;
   
} catch (err){
   console.log(err);
   return err;
   
}
}