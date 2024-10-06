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

interface SubmittingHelpers {
  setSubmitting: (isSubmitting: boolean) => void;
}

const extractMessageFromError = (error: ClientError): string | null => {
  const graphqlError = error.response.errors?.[0];
  if (graphqlError?.message.includes("Boolean cannot represent a non boolean value")) {
    return graphqlError.message.match(/message: "(.*?)"/)?.[1] || null;
  }
  return null;
};

const handleGraphQLError = (error: ClientError): { success: string } | { error: string } => {
  const extractedMessage = extractMessageFromError(error);
  if (extractedMessage) {
    return { success: extractedMessage };
  }
  const errorMessage = error.response.errors?.[0]?.message || "An error occurred while resetting your password.";
  return { error: errorMessage };
};

export const useResetPassword = (token: string | null) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const resetStates = (success: string = "", errorMsg: string = "") => {
    setSuccessMessage(success);
    setError(errorMsg);
  };

  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting }: SubmittingHelpers
  ) => {
    if (!token) {
      resetStates("", "Invalid or missing token");
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

      resetStates(response.resetPassword);
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      
      if (error instanceof ClientError) {
        const result = handleGraphQLError(error);
        if ('success' in result) {
          resetStates(result.success);
          return;
        }
        errorMessage = result.error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      resetStates("", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return { successMessage, error, handleSubmit };
};