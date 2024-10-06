import { useState } from "react";
import { request, ClientError } from "graphql-request";

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

interface ResetPasswordResponse {
  resetPassword: string;
}

interface ResetPasswordValues {
  password: string;
}

// Utility to extract error messages
const extractErrorMessage = (error: ClientError): string => {
  const graphqlError = error.response.errors?.[0];
  return graphqlError?.message || "An error occurred while resetting your password.";
};

// Handles GraphQL errors
const handleGraphQLError = (
  error: ClientError,
  setSuccessMessage: (msg: string) => void,
  setError: (msg: string) => void
) => {
  const graphqlError = error.response.errors?.[0];

  if (graphqlError?.message.includes("Boolean cannot represent a non boolean value")) {
    const extractedMessage = graphqlError?.message.match(/message: "(.*?)"/)?.[1];
    extractedMessage ? setSuccessMessage(extractedMessage) : setError("An unexpected error occurred.");
  } else {
    setError(extractErrorMessage(error));
  }
};

// Validates the token
const validateToken = (token: string | null): void => {
  if (!token) {
    throw new Error("Invalid or missing token");
  }
};

// Retrieves the API URL
const getApiUrl = (): string => {
  const API_URL = process.env.BACKEND_URL;
  if (!API_URL) {
    throw new Error("Backend URL is not defined");
  }
  return API_URL;
};

// Makes the GraphQL request
const makeResetPasswordRequest = async (token: string, password: string): Promise<string> => {
  const API_URL = getApiUrl();
  const response = await request<ResetPasswordResponse>(
    `${API_URL}/graphql`,
    RESET_PASSWORD_MUTATION,
    {
      token,
      newPassword: password,
    }
  );

  if (!response.resetPassword) {
    throw new Error("Failed to reset password");
  }

  return response.resetPassword;
};

// Main hook
export const useResetPassword = (token: string | null) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      validateToken(token);  // Validate token
      
      const message = await makeResetPasswordRequest(token as string, values.password);  // Make request
      setSuccessMessage(message);  // Set success message
      setError("");  // Clear error
    } catch (error) {
      if (error instanceof ClientError) {
        handleGraphQLError(error, setSuccessMessage, setError);  // Handle GraphQL error
      } else if (error instanceof Error) {
        setError(error.message);  // Set error message
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);  // Always set submitting to false
    }
  };

  return { successMessage, error, handleSubmit };
};
