import creator from "./creator";
import { GET_USER_TICKETS, UPDATE_TICKET, CREATE_TICKET  } from "..";
import { toast } from "react-toastify";
import axios from "axios";

export const createTicket = ({ title, body }) => {
    async (dispatch: any) => {
        const data = await axios({
            url: process.env.BACKEND_URL,
            method: "post",
            data: {
                query: `
                    mutation CreateTicket($title: String!, $body: String!) {
                        createTicket(title: $title, body: $body) {
                            _id
                            title
                            body
                            status
                            author{
                                email
                                firstName
                                lastName
                            
                            }
                        }
                    }
                `,
                variables: { title, body },

            }
        })
    }
}
