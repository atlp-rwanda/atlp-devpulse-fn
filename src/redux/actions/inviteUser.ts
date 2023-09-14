import axios from "./axiosconfig";
import { toast } from "react-toastify";

export const inviteUser:any = async (email:string, roleId) =>  {

    try {
      const data = await axios.post("/",
            { query: `
            mutation Mutation($userInput: UserInput_Logged) {
                createUser_Logged(userInput: $userInput) {
                  isActive
                  id
                  gender
                  firstname
                  email
                  lastname
                  password
                  picture
                  
                }
              }
              
               `
               ,
           variables: {
            userInput: {
                email: email,
                role: roleId
            }
           }
         }
     );
   
    return data;
   
 } catch (err){
     console.log(err);
     return err
     
 }
 }