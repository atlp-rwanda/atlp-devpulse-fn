import { useState } from "react";
import { request, ClientError } from "graphql-request";

interface ResetPasswordResponse {
  resetPassword: string
}

interface ResetPasswordValues {
  password: string;
}

interface SubmittingHelpers {
  setSubmitting: (isSubmitting: boolean) => void;
}

interface ResetState {
  successMessage: string;
  error: string;
}

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

const usePasswordResetRequest = () => {
  const sendRequest = async (token: string, password: string): Promise<ResetState> => {
    const API_URL = process.env.BACKEND_URL;
    if (!API_URL) {
      throw new Error("Backend URL is not defined");
    }

    try {
      const response = await request<ResetPasswordResponse>(
        `${API_URL}/graphql`,
        RESET_PASSWORD_MUTATION,
        {
          token,
          newPassword: password,
        }
      );

      return {
        successMessage: response.resetPassword || "",
        error: "",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const extractedMessage = error.response.errors?.[0]?.message.match(/message: "(.*?)"/)?.[1];
        if (extractedMessage) {
          return {
            successMessage: extractedMessage,
            error: "",
          };
        }
        return {
          successMessage: "",
          error: error.response.errors?.[0]?.message || "An error occurred while resetting your password.",
        };
      }
      
      return {
        successMessage: "",
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      };
    }
  };

  return { sendRequest };
};

export const useResetPassword = (token: string | null) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const { sendRequest } = usePasswordResetRequest();

  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting }: SubmittingHelpers
  ) => {
    if (!token) {
      setSuccessMessage("");
      setError("Invalid or missing token");
      setSubmitting(false);
      return;
    }

    try {
      const result = await sendRequest(token, values.password);
      setSuccessMessage(result.successMessage);
      setError(result.error);
    } finally {
      setSubmitting(false);
    }
  };

  return { successMessage, error, handleSubmit };
};