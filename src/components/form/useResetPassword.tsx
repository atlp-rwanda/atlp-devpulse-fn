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

const extractSuccessMessage = (error: ClientError): string | null => {
  const match = error.response.errors?.[0]?.message.match(/message: "(.*?)"/);
  return match?.[1] || null;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ClientError) {
    return error.response.errors?.[0]?.message || "An error occurred while resetting your password.";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

const processResponse = (response: ResetPasswordResponse): ResetState => ({
  successMessage: response.resetPassword || "",
  error: "",
});

const processError = (error: unknown): ResetState => {
  if (error instanceof ClientError) {
    const successMessage = extractSuccessMessage(error);
    if (successMessage) {
      return { successMessage, error: "" };
    }
  }
  return { successMessage: "", error: getErrorMessage(error) };
};

const makeRequest = async (url: string, token: string, password: string): Promise<ResetPasswordResponse> => {
  return request<ResetPasswordResponse>(
    url,
    RESET_PASSWORD_MUTATION,
    {
      token,
      newPassword: password,
    }
  );
};

const usePasswordResetRequest = () => {
  const sendRequest = async (token: string, password: string): Promise<ResetState> => {
    const API_URL = process.env.BACKEND_URL;
    if (!API_URL) {
      return { successMessage: "", error: "Backend URL is not defined" };
    }

    try {
      const response = await makeRequest(`${API_URL}/graphql`, token, password);
      return processResponse(response);
    } catch (error) {
      return processError(error);
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