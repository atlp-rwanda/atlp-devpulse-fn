import axios from "./axiosconfig";
import { toast } from "react-toastify";

export const inviteUser: any = async (names, email: string, roleId) => {

  try {
    const userNames = names.split(" ");
    const firstname = userNames[0];
    const lastname = (userNames.length >= 2) ? userNames.map((element, idx) => {
      if (idx > 0) {
        return element;
      }
    }) : [];
    const data = await axios.post("/",
      {
        query: `
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
            firstname,
            lastname: lastname.join(" "),
            email: email,
            role: roleId
          }
        }
      }
    );

    return data;

  } catch (err) {
    console.log(err);
    return err

  }
}