import creator from "./creator";
import axios from "./axiosconfig";
import { GET_ALL_FILTERED_TICKETS } from "..";
import { toast } from "react-toastify";

export const getAllFilteredTickets =
  ({ page, itemsPerPage, All, wordEntered, filterAttribute }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
      query FilterTicketDetails($input: FilterOptions) {
  filterTicketDetails(input: $input) {
    body
    author {
      firstname
      lastname
      id
      email
    }
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
          input: {
            page,
            itemsPerPage,
            All,
            wordEntered,
            filterAttribute,
          },
        },
      });
      console.log("result", datas.data.data.filterTicketDetails);
      const tickets = await datas.data?.data?.filterTicketDetails;
      if (tickets.length === 0) {
        toast.error("No Programs found! Try again");
      }
      dispatch(creator(GET_ALL_FILTERED_TICKETS, tickets));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const getAllTicketAttributes = () => async (dispatch: any) => {
  try {
    const datas = await axios.post("/", {
      query: `
            query GetAllTicketAttributescount {
                getAllTicketAttributescount {
                  total
                }
              }
              `,
    });

    const totalTickets = await datas.data?.data?.getAllTicketAttributescount
      .total;
    console.log(totalTickets);
    dispatch({
      data: totalTickets,
    });
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};
