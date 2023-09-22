import axios from "./axiosconfig";

export const updateStatus = async(id:any) => {
    try {

        const response = await axios.post("/",{
            query: `
            mutation Mutation($id: ID!) {
                updateUserStatus(ID: $id)
              }
            `,
            variables: {
                id,
            }
        })

        return response;

    } catch (error: any) {
        console.log(error);
        return error;
        
    }
}