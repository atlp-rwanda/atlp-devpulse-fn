import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "graphql-request";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const ResetPasswordPage = () => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  if (!token) {
    return <p className="text-red-500">Invalid or missing token!</p>;
  }

  const handleSubmit = async (values: { password: string }) => {
    const RESET_PASSWORD_MUTATION = `
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword)
}
    `;

    try {
      const API_URL = process.env.BACKEND_URL
      const response = await request(`${API_URL}/graphql`, RESET_PASSWORD_MUTATION, {
        token,
        newPassword: values.password,
      });
      console.log(response);
      setPasswordChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen dark:bg-zinc-800">
      <div className="border border-gray-400 py-3 bg-gray-300 dark:bg-[#1F2A37] shadow-lg sm:fixed w-[45vw] flex max-h-[90%] sm:mt-[70px] sm:max-h-[100%] flex-col items-center justify-center rounded-sm sm:w-[90%] lg:w-[45vw]">
        <h1 className="text-3xl text-[#1F2A37] dark:text-white font-bold py-4">
          Reset Password
        </h1>

        {passwordChanged ? (
          <div>
            <p className="text-green-500 dark:text-green-400">
              Your password has been successfully changed!
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 py-2 px-4 text-white rounded-md bg-[#56C870] focus:outline-none"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(8, "Password must be at least 8 characters long")
                .required("Required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], "Passwords must match")
                .required("Required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-1/2">
                <div className="mb-4">
                  <Field
                    name="password"
                    type="password"
                    className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-black dark:autofill:text-white bg-gray-100 dark:bg-[#1F2A37]"
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
                    className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-black dark:autofill:text-white bg-gray-100 dark:bg-[#1F2A37]"
                    placeholder="Confirm your new password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 text-white rounded-md focus:bg-[#56C870] bg-[#56C870] focus:outline-none"
                >
                  {isSubmitting ? "Submitting..." : "Set New Password"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
