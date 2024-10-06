import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from "../validation/forgetvalidation";

interface ForgotPasswordFormProps {
  emailSent: boolean;
  error: string;
  onSubmit: (values: { email: string }, { setSubmitting }) => Promise<void>;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ emailSent, error, onSubmit }) => {
  if (emailSent) {
    return (
      <p className="text-white dark:text-green-400 text-center">
        An email with password reset instructions has been sent to your email address.
      </p>
    );
  }

  return (
    <>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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

      <p className="mt-4 text-sm dark:text-white text-center">
        Remembered your password?{" "}
        <Link to="/login" className="text-blue-600 dark:text-blue-400">
          Login here
        </Link>
      </p>
    </>
  );
};
