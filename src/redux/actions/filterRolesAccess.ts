import creator from "./creator";
import axios from "./axiosconfig";
import { GET_ALL_FILTERED_ROLES_ACCESS, SEND_EMAIL, SEND_EMAIL_ERROR } from "..";
import { fetchrolesandaccesscount } from "../actiontypes/deleteactiontype";
import { toast } from "react-toastify";

export const getAllFilteredRolesAccess =
  ({ page, itemsPerPage, All, wordEntered, filterAttribute }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
        query Query($input: filterOptions) {
          filterRolesAccessDetails(input: $input) {
            role_id {
              roleName
              _id
              description
              delete_at
              cycle_id {
                id
                name
                startDate
                endDate
              }
            }
            role_id {
              roleName
              _id
              description
              cycle_id {
                id
                name
                startDate
                endDate
              }
              delete_at
              status
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
      // console.log("result",datas.data.data.filterRolesAccessDetails);
      const Roles = await datas.data.data.filterRolesAccessDetails;
      // console.log( "actionnnnnnnnnnn", Roles )
      dispatch(creator(GET_ALL_FILTERED_ROLES_ACCESS, Roles));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const getAllRoles = () => async (dispatch: any) => {
  try {
    const datas = await axios.post("/", {
      query: `
            query GetAllRoleAttributescount {
                getAlltRoleAttributescount {
                  total
                }
              }
              `,
    });

    const totalRolesAccess = await datas.data.data
      .getAlltRoleAttributescount.total;
    console.log(totalRolesAccess);
    dispatch({
      type: fetchrolesandaccesscount.fetchrolesandaccesscount_success,
      data: totalRolesAccess,
    });
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};

export const sendBulkyEmail =
  ({ to, subject, html, cc, bcc }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios.post("/", {
        query: `
        query SendBulkyEmail($params: sendParams) {
            sendBulkyEmail(params: $params) {
              status
              mail_res
            }
          }
      `,
        variables: {
          params: {
            html,
            subject,
            to,
            cc,
            bcc,
          },
        },
      });
      const emailResponse = await datas.data.data.sendBulkyEmail;

      if (emailResponse.status === "success") {
        toast.success(emailResponse.mail_res);
        dispatch(creator(SEND_EMAIL, emailResponse));
      } else {
        toast.error(emailResponse.mail_res);
        dispatch(creator(SEND_EMAIL_ERROR, emailResponse));
      }
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
