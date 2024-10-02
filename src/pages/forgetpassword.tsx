import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import { useTheme } from "../hooks/darkmode";
import { request } from "graphql-request";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const logo = require("../assets/logo.svg").default;
const LogoWhite = require("../assets/logoWhite.svg").default;

const RESET_PASSWORD_MUTATION = `
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

const ForgotPasswordPage = () => {
  const { theme, setTheme } = useTheme();
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleToggleTheme = () => setTheme(!theme);

  const handleSubmit = async (values: { email: string }, { setSubmitting }) => {
    try {
      const API_URL = process.env.BACKEND_URL;
      await request(`${API_URL}/graphql`, RESET_PASSWORD_MUTATION, {
        email: values.email,
      });
      setEmailSent(true);
      setError("");
    } catch (error:any) {
      setError(error.response?.errors?.[0]?.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderLogo = () => (
    <Link to="/" className="flex items-center">
      <img
        className={`cursor-pointer mx-2 ${theme ? 'fill-[blue]' : ''}`}
        src={theme ? logo : LogoWhite}
        alt={theme ? "logo" : "logoWhite"}
        style={theme ? { fill: '#333' } : {}}
      />
      <h1 className="sm-text-1xl mr-12 font-bold font-lexend text-primary md:hidden dark:text-green">
        PULSE
      </h1>
    </Link>
  );

  const renderThemeToggle = () => (
    <div
      className="mx-4 dark:text-zinc-100 rounded-full px-2 text-xl cursor-pointer flex items-center w-9 h-9"
      onClick={handleToggleTheme}
    >
      {theme ? (
        <MoonIcon className="w-8" />
      ) : (
        <SunIcon className="w-8 text-dark-text-fill" />
      )}
    </div>
  );

  const renderHeader = () => (
    <div className="flex items-center dark:bg-zinc-800">
      <div className="flex items-center justify-between h-[70px] fixed z-50 top-0 border-b border-gray-400 w-screen bg-gray-300 dark:bg-dark-bg">
        <div className="flex items-center">
          {renderLogo()}
        </div>
        <div className="flex items-center mr-4">
          {renderThemeToggle()}
          <Link to="/signup">
            <span className="flex items-center font-bold text-primary dark:text-white">
              SignUp
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-md px-4">
          <div className="mb-4">
            <Field
              name="email"
              type="email"
              className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none bg-gray-100 dark:bg-[#1F2A37]"
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 text-white rounded-md bg-[#56C870] focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Send Reset Link'}
          </button>
        </Form>
      )}
    </Formik>
  );

  const renderContent = () => (
    <div className="flex flex-col justify-center items-center h-screen dark:bg-zinc-800">
      <div className="border border-gray-400 p-6 bg-gray-300 dark:bg-[#1F2A37] shadow-lg w-11/12 max-w-lg rounded-sm sm:mt-[70px]">
        <h1 className="text-3xl text-[#1F2A37] dark:text-white font-bold text-center mb-6">
          Forgot Password
        </h1>

        {emailSent ? (
          <p className=" text-green-300 dark:text-green-400 text-center">
            An email with password reset instructions has been sent to your email address.
          </p>
        ) : (
          renderForm()
        )}

        <p className="mt-4 text-sm dark:text-white text-center">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};

export default ForgotPasswordPage;