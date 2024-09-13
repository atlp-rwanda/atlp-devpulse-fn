import axios from "./axiosconfig";

export const deleteUser = async(id:any) => {
    try {

        const response = await axios.post("/",{
            query: `
            mutation Mutation($deleteUserLoggedId: ID!) {
                deleteUser_Logged(ID: $deleteUserLoggedId)
              }
            `,
            variables: {
                deleteUserLoggedId: id,
            }
        })

        return response;

    } catch (error) {
        console.log(error);
        
    }
}