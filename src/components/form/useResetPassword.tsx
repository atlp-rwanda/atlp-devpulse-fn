import { useState } from "react";
import { request, ClientError } from "graphql-request";

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

interface ResetPasswordResponse {
  resetPassword: string
}

interface ResetPasswordValues {
  password: string;
}

export const useResetPassword = (token: string | null) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (!token) {
      setError("Invalid or missing token");
      setSubmitting(false);
      return;
    }

    try {
      const API_URL = process.env.BACKEND_URL;
      if (!API_URL) {
        throw new Error("Backend URL is not defined");
      }

      const response = await request<ResetPasswordResponse>(
        `${API_URL}/graphql`,
        RESET_PASSWORD_MUTATION,
        {
          token,
          newPassword: values.password,
        }
      );

      if (!response.resetPassword) {
        throw new Error("Failed to reset password");
      }

      setSuccessMessage(response.resetPassword);
      setError("");
    } catch (error) {
      if (error instanceof ClientError) {
        const graphqlError = error.response.errors?.[0];

        if (graphqlError?.message.includes("Boolean cannot represent a non boolean value")) {
         
          const extractedMessage = graphqlError?.message.match(/message: "(.*?)"/)?.[1];
          if (extractedMessage) {
           
            setSuccessMessage(extractedMessage);
            setError("");
          } else {
            setError("An unexpected error occurred while resetting your password.");
          }
        } else {
          setError(graphqlError?.message || "An error occurred while resetting your password.");
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return { successMessage, error, handleSubmit };
};
