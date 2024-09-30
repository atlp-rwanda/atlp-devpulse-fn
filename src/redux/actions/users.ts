import {SINGLE_USER,SINGLE_USER_FAIL, USER_TO_UPDATE, USER_TO_UPDATE_FAIL } from "..";
import { fetchUser } from "../actiontypes/deleteactiontype";
import axios from "./axiosconfig";
import creator from "./creator";

export const getAllMembers = () => async (dispatch: any) => {
  try {
    const data = await axios.post("/", {
      query: `
             query getMembers {
                getUsers_Logged {
                  firstname
                  lastname
                  gender
                  country
                  code
                  email
                  id
                  createdAt
                  isActive
                  picture
                  role {
                    _id
                    description
                    permissions {
                      _id
                    }
                    roleName
                  }
                  
                  telephone
                }
              }
            `,
    });
    dispatch({
      type: fetchUser.fetchMembers,
      data: data.data,
    });

    return data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getSingleUser = (userId: string) => async (dispatch: any) => {
  try {
    const { data } = await axios.post("/", {
      query: `
        query getuser($id: ID!){
          user_Logged(ID: $id) {
            id
            firstname
            lastname
            email
            picture
            password
            telephone
            code
            picture
          }
        }
      `,
      variables: {
        id: userId,
      },
    });

    const response = data.data.user_Logged;
    return dispatch(creator(SINGLE_USER, response));
  } catch (error) {
    return dispatch(creator(SINGLE_USER_FAIL, error));
  }
};

export const update_User =
  ({
    id,
    editUserInput: {
      firstname,
      lastname,
      email,
      password,
      code,
      telephone,
      picture,
    },
  }: any) =>
  async (dispatch: any) => {
    try {
      const { data } = await axios.post("/", {
        query: `
        mutation update_User($id: ID!, $editUserInput: EditUserInput_Logged) {
          updateUser_Logged(ID: $id, editUserInput: $editUserInput)
        }
      `,
        variables: {
          id,
          editUserInput: {
            lastname,
            firstname,
            email,
            password,
            code,
            telephone,
            picture,
          },
        },
      });

      const response = data.data.updateUser_Logged;
      dispatch(creator(USER_TO_UPDATE, response));
    } catch (error) {
      console.log(error);
      return dispatch(creator(USER_TO_UPDATE_FAIL, error));
    }
  };
export const assignMemberRoles = async (userId, roleId) => {
  try {
    const data = await axios.post("/", {
      query: `
          mutation Mutation( $assignRoleToUserId2: ID!, $roleId: ID!) {
            assignRoleToUser(ID: $assignRoleToUserId2, roleID: $roleId) {
              role {
                _id
                description
                permissions {
                  _id
                }
                roleName
              }
              picture
              
              isActive
              id
              email
              createdAt
            }
          }
          
           `,
      variables: {
        assignRoleToUserId2: userId,
        roleId,
      },
    });

    return data.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
