import jwtDecode from "jwt-decode";
import axios from "./axiosconfig";
import { toast } from "react-toastify";

export const verifyEmailAction = async() => {
    try {
        const hash = window.location.hash;

        const params = new URLSearchParams(hash.split('?')[1]);
        
        const token = params.get('token') as any;
        const decoded: any = await jwtDecode(token);
        const UserId = decoded.data._id
        const response = await axios.post("/",{
            query: `
                mutation Mutation($id: ID!) {
                    verifyUser(ID: $id) {
                        id
                        email
                        isVerified
                    }
                }
            `, variables: {
                id:`${UserId}`
            }
        })

        return response;

    } catch (error: any) {
        toast.error("An error Occured during verification")
        return error;
        
    }
}