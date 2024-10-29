import creator from "./creator";
import {
  GET_USER_TICKETS,
  UPDATE_TICKET,
  CREATE_TICKET,
  GET_ALL_TICKETS,
  GET_TICKET,
  RESOLVE_TICKET,
} from "..";
import axios from "axios";

export const createTicket =
  (title: string, body: string) => async (dispatch: any) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.post(
        `${process.env.BACKEND_URL}`,
        {
          query: `
               mutation CreateTicket($title: String!, $body: String!){
                    createTicket(title: $title, body: $body) {
                        id
                        title
                        body
                        status
                        author {
                            id
                            email
                            firstname
                            lastname
                        }
                        createdAt
                        updatedAt
                        adminReplies{
                          body
                          createdAt
                          id
                          repliedBy {
                            createdAt
                            email
                            firstname
                            lastname
                            id
                          
                          }
                        }
                        applicantReplies {
                          body
                          createdAt
                          id
                          repliedBy {
                            id
                            email
                            firstname
                            lastname
                          }
                        }
                    }
                } 
            `,
          variables: { title, body },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ticketData = response.data?.data?.createTicket;
      dispatch(creator(CREATE_TICKET, ticketData));
      return ticketData;
    } catch (error) {
      console.error("Error creating ticket", error);
      throw error;
    }
  };

export const updateTicket =
  (id: string, body: string) => async (dispatch: any) => {
    try {
      const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Token not found");
    }

      const response = await axios.post(`${process.env.BACKEND_URL}`, {
        query: `
                mutation UpdateTicket($updateTicketId: ID!, $body: String!) {
                    updateTicket(id: $updateTicketId, body: $body) {
                        id
                        title
                        body
                        status
                        author {
                            email
                            firstname
                            lastname
                        }
                        createdAt
                        updatedAt
                        adminReplies{
                          body
                          createdAt
                          id
                          repliedBy {
                            createdAt
                            email
                            firstname
                            lastname
                            id
                          }
                        }
                        applicantReplies {
                            body
                            createdAt
                            id
                            repliedBy {
                              email
                              firstname
                              lastname
                              id
                            }
                      
                      }
                    }
                }
            `,
        variables: { updateTicketId: id, body: body },
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTicketData = response.data?.data?.updateTicket;
      dispatch(creator(UPDATE_TICKET, updatedTicketData));
    } catch (error) {
      console.error("Error updating ticket", error);
    }
  };

export const getUserTickets = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.post(
      `${process.env.BACKEND_URL}`,
      {
        query: `
                query GetUserTickets {
                    getUserTickets {
                        id
                        title
                        body
                        createdAt
                        updatedAt
                        status
                        author {
                            email
                            firstname
                            lastname
                            id
                        }
                        adminReplies{
                          body
                          createdAt
                          id
                          repliedBy {
                            createdAt
                            email
                            firstname
                            lastname
                            id
                          }
                        }
                        applicantReplies {
                          body
                          createdAt
                          id
                          repliedBy {
                            email
                            firstname
                            lastname
                            id
                          }
                        }
                    
                    }
                }

            `,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const ticketData = response.data?.data?.getUserTickets;
    dispatch(creator(GET_USER_TICKETS, ticketData));
  } catch (error) {
    console.error("Error getting user tickets", error);
  }
};

export const getAllTickets = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.post(
      `${process.env.BACKEND_URL}`,
      {
        query: `
          query GetAllTickets {
            getAllTickets {
              id
              title
              body
              status
              createdAt
              updatedAt
              author {
                id
                email
                lastname
                firstname
                createdAt
              }
              adminReplies{
                          body
                          createdAt
                          id
                          repliedBy {
                            createdAt
                            email
                            firstname
                            lastname
                            id
                          }
                        }
                        applicantReplies {
                          body
                          createdAt
                          id
                          repliedBy {
                            email
                            firstname
                            lastname
                            id
                          }
                        }
            }
          }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );



    const ticketData = response.data?.data?.getAllTickets;
    dispatch(creator(GET_ALL_TICKETS, ticketData));
  } catch (error) {
    console.error("Error getting all tickets", error);
  }
};

export const GetTicket = (ticketId: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.post(
      `${process.env.BACKEND_URL}`,
      {
        query: `
        query GetTicketById($getTicketByIdId: ID!) {
  getTicketById(id: $getTicketByIdId) {
    author {
      createdAt
      email
      firstname
      id
      lastname
    }
    body
    createdAt
    id
    status
    title
    updatedAt
    adminReplies{
                          body
                          createdAt
                          id
                          repliedBy {
                            createdAt
                            email
                            firstname
                            lastname
                            id
                          }
                        }
                        applicantReplies {
                          body
                          createdAt
                          id
                          repliedBy {
                            email
                            firstname
                            lastname
                            id
                          }
                        }
  }
}
      `,
        variables: {
          getTicketByIdId: ticketId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const ticketData = response.data?.data?.getTicketById;
    dispatch(creator(GET_TICKET, ticketData));
  } catch (error) {
    console.error("Error getting ticket", error);
  }
};

export const resolveTicket =
  (ticketId: string, adminResponse: string) => async (dispatch: any) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${process.env.BACKEND_URL}`,
        {
          query: `
        mutation ResolveTicket($resolveTicketId: ID!, $adminResponse: String!) {
          resolveTicket(id: $resolveTicketId, adminResponse: $adminResponse) {
    id
    author {
      createdAt
      email
      firstname
      id
      lastname
    }
    body
    createdAt
    status
    title
    updatedAt
    adminReplies{
                          body
                          createdAt
                          id
                          repliedBy {
                            createdAt
                            email
                            firstname
                            lastname
                            id
                          }
                        }
                        applicantReplies {
                          body
                          createdAt
                          id
                          repliedBy {
                            email
                            firstname
                            lastname
                            id
                          }
                        }
  }
        
        }`,

          variables: {
            resolveTicketId: ticketId,
            adminResponse,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resolvedTicketData = response.data?.data?.resolveTicket;
      dispatch(creator(RESOLVE_TICKET, resolvedTicketData));
      return resolvedTicketData;
    } catch (error) {
      console.error("Error resolving ticket", error);
      throw error;
    }
  };
