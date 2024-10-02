import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "graphql-request";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Required"),
});

const ResetPasswordPage = () => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Invalid or missing token!</p>
      </div>
    );
  }

  const handleSubmit = async (values: { password: string }, { setSubmitting }) => {
    try {
      const API_URL = process.env.BACKEND_URL;
      await request(`${API_URL}/graphql`, RESET_PASSWORD_MUTATION, {
        token,
        newPassword: values.password,
      });
      setPasswordChanged(true);
      setError("");
    } catch (error:any) {
      // setError(error.response?.errors?.[0]?.message || "An error occurred while resetting your password");
    } finally {
      setSubmitting(false);
    }
  };

  const renderForm = () => (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-md">
          <div className="mb-4">
            <Field
              name="password"
              type="password"
              className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none bg-gray-100 dark:bg-[#1F2A37]"
              placeholder="Enter your new password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <Field
              name="confirmPassword"
              type="password"
              className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none bg-gray-100 dark:bg-[#1F2A37]"
              placeholder="Confirm your new password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 text-white rounded-md bg-[#56C870] focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Set New Password"}
          </button>
        </Form>
      )}
    </Formik>
  );

  const renderSuccess = () => (
    <div className="text-center">
      <p className="text-green-500 dark:text-green-400 mb-4">
        Your password has been successfully changed!
      </p>
      <button
        onClick={() => navigate("/login")}
        className="py-2 px-4 text-white rounded-md bg-[#56C870] focus:outline-none"
      >
        Go to Login
      </button>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen dark:bg-zinc-800">
      <div className="border border-gray-400 p-6 bg-gray-300 dark:bg-[#1F2A37] shadow-lg w-11/12 max-w-lg rounded-sm">
        <h1 className="text-3xl text-[#1F2A37] dark:text-white font-bold text-center mb-6">
          Reset Password
        </h1>
        {passwordChanged ? renderSuccess() : renderSuccess() }
      </div>
    </div>
  );
};

export default ResetPasswordPage;