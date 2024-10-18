import creator from "./creator";
import axios from "./axiosconfig";
import { GET_ALL_FILTERED_ROLES_ACCESS, SEND_EMAIL, SEND_EMAIL_ERROR } from "..";
import { fetchrolesandaccesscount } from "../actiontypes/deleteactiontype";
import { toast } from "react-toastify";

export const getAllFilteredRolesAccess =
  ({ page, itemsPerPage, All, wordEntered, filterAttribute }: any) =>
  async (dispatch: any) => {
    try {
      if(filterAttribute==='' || filterAttribute===null){
        toast.error("Please insert a filter attribute")
      }
      const datas = await axios.post("/", {
        query: `
          query Query($input: FilterOptions) {
            filterRoleDetails(input: $input) {
              _id
              description
              roleName
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
      const Roles = await datas.data.data.filterRoleDetails;
      if (Roles.length===0){
        toast.error("No jobs found! Try again")
      }
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
        query Query($input: FilterOptions) {
          filterRoleDetails(input: $input) {
            _id
            description
            roleName
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
