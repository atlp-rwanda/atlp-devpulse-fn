import { useState } from "react";
import { request } from "graphql-request";

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export const useResetPassword = (token: string | null) => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values: { password: string }, { setSubmitting }) => {
    if (!token) {
      setError("Invalid or missing token");
      setSubmitting(false);
      return;
    }

    try {
      const API_URL = process.env.BACKEND_URL;
      await request(`${API_URL}/graphql`, RESET_PASSWORD_MUTATION, {
        token,
        newPassword: values.password,
      });
      setPasswordChanged(true);
      setError("");
    } catch (error) {
      setError("An error occurred while resetting your password");
    } finally {
      setSubmitting(false);
    }
  };

  return { passwordChanged, error, handleSubmit };
};