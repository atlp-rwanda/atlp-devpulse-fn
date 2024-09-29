import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import { useTheme } from "../hooks/darkmode";
import { request } from "graphql-request";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
const logo: string = require("../assets/logo.svg").default;
const LogoWhite: string = require("../assets/logoWhite.svg").default;

const ForgotPasswordPage = () => {
  const { theme, setTheme } = useTheme();
  const [emailSent, setEmailSent] = useState(false);

  const handleToggleTheme = () => {
    setTheme(!theme);
  };

  const handleSubmit = async (values: { email: string }) => {
    const RESET_PASSWORD_MUTATION = `
      mutation SendPasswordResetEmail($email: String!) {
        sendPasswordResetEmail(email: $email) {
          message
        }
      }
    `;

    try {
      const response = await request("/graphql", RESET_PASSWORD_MUTATION, {
        email: values.email,
      });
      console.log(response);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center dark:bg-zinc-800">
        <div
          className={`flex items-center justify-between h-[70px] fixed z-50 top-0 border-b border-gray-400 w-screen bg-gray-300 dark:bg-dark-bg`}
        >
          <div className="flex items-center ">
            <span>
              <Link to="/" className="flex items-center">
                {theme ? (
                  <img
                    className="cursor-pointer mx-2 fill-[blue]"
                    src={logo}
                    style={{ fill: '#333' }}
                  />
                ) : (
                  <img
                    className="cursor-pointer  mx-2"
                    src={LogoWhite}
                    alt="logoWhite"
                  />
                )}
                <h1 className="sm-text-1xl mr-12 font-bold font-lexend text-primary md:hidden dark:text-green">
                  PULSE
                </h1>
              </Link>
            </span>
          </div>
          <div className="flex items-center mr-4">
            <div
              className={`mx-4 dark:text-zinc-100 rounded-full px-2 text-xl cursor-pointer flex items-center w-9 h-9`}
              onClick={handleToggleTheme}
            >
              {theme ? (
                <MoonIcon className="w-8" />
              ) : (
                <SunIcon className="w-8 text-dark-text-fill" />
              )}
            </div>
            <Link to={'/signup'}>
              <span className="flex items-center font-bold text-primary dark:text-white">
                SignUp
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-screen dark:bg-zinc-800">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Forgot Password</h1>

        {emailSent ? (
          <p className="text-green-500 dark:text-green-400">
            An email with password reset instructions has been sent to your email address.
          </p>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-gray-300 dark:bg-dark-bg p-6 rounded-lg shadow-md w-80">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold mb-2 dark:text-white"
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4  text-white rounded-md focus:bg-[#56C870] bg-[#56C870] focus:outline-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Send Reset Link'}
                </button>
              </Form>
            )}
          </Formik>
        )}

        <p className="mt-4 text-sm dark:text-white">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
