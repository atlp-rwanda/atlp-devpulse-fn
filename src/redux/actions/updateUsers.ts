import axios from "axios";

export const updateUserSelf = async (id: string, data: Record<string, any>) => {
  try {
    const response = await axios.post("/", {
      query: `
        mutation UpdateUserSelf($id: ID!, $editUserInput: EditUserSelfInput_Logged!) {
          updateUserSelf(id: $id, editUserInput: $editUserInput) {
            id
            firstName
            lastName
            email
            country
            code
            telephone
            gender
          }
        }
      `,
      variables: {
        id,
        editUserInput: data,
      },
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};