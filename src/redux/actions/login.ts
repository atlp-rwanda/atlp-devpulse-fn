import axios from "axios";

export const loginAction = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}`, {
      query: `
            mutation Mutation($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                    userId
                }
            }
            `,
      variables: {
        email,
        password,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});