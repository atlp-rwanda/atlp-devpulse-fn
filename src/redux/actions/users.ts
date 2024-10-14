import axios from "./axiosconfig";
import {
  SINGLE_USER,
  SINGLE_USER_FAIL,
  USER_TO_UPDATE,
  USER_TO_UPDATE_FAIL,
} from "..";
import { fetchUser } from "../actiontypes/deleteactiontype";
import creator from "./creator";


export const getAllMembers = () => async (dispatch: any) => {
  try {
    const { data } = await axios.post("/", {
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
      data: data,
    });

    return data;
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
          
           `
           ,
       variables: {
          assignRoleToUserId2: userId,
          roleId
       }
       }
   );
  
   return data.data;
   
} catch (err){
   console.log(err);
   return err;
   
}
}

export const getUserbyFilter= async (filter) => {
  
  try{
    const data = await axios.post("/",
      {
        query: `
          query GetByFilter($filter: UserFilterInput!) {
            getByFilter(filter: $filter) {
              id
              firstname
              lastname
              email
              isActive
              telephone
              country
              code
              gender
              authMethod
              isVerified
              createdAt
            }
          }

        `,
        variables: {
          filter: {
            ...filter
          }
        }
      });
      return data.data;
    } catch (err){
      console.log(err);
      return err;
    }
}

export const updateUserSelf = async (id: string, data: object) => {
  const query = `
    mutation UpdateUserSelf($id: ID!, $editUserInput: EditUserSelfInput_Logged) {
      updateUserSelf(ID: $id, editUserInput: $editUserInput)
    }
  `;

  const variables = {
    id,
    editUserInput: { ...data },
  };

  console.log("GraphQL Request:", {
    query,
    variables,
  });

  try {
    const response = await axios.post("/", {
      query,
      variables,
    });
    return response;
  } catch (error: any) {
    console.error("Error:", error);
    return error;
  }
};

export const getAllCoordinators = () => async (dispatch: any) => {
  try {
    const data = await axios.post("/", {
      query: `
        query getMembers {
          getUsers_Logged {
            firstname
            lastname
            email
            role {
              roleName
            }
          }
        }
      `,
    });

    const members = data.data.data.getUsers_Logged;
    const coordinators = members.filter(
      (member: any) =>
        member.role.roleName === "superAdmin" ||
        member.role.roleName === "admin"
    );

    dispatch({
      type: "FETCH_COORDINATORS",
      data: coordinators,
    });

    return coordinators.length;
  } catch (err) {
    return 0;
  }
};
