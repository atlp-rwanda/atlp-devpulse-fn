import { useState } from "react";
import { request } from "graphql-request";

const RESET_PASSWORD_MUTATION = `
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

export const useForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values: { email: string }, { setSubmitting }) => {
    try {
      const API_URL = process.env.BACKEND_URL;
      await request(`${API_URL}/graphql`, RESET_PASSWORD_MUTATION, {
        email: values.email,
      });
      setEmailSent(true);
      setError("");
    } catch (error: any) {
      setError(error.response?.errors?.[0]?.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return { emailSent, error, handleSubmit };
};