import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationSchema } from "../validation/resetvalidation";

interface ResetPasswordFormProps {
  onSubmit: (values: { password: string }, { setSubmitting }) => Promise<void>;
  error: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, error }) => (
  <Formik
    initialValues={{ password: "", confirmPassword: "" }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form className="w-full max-w-md">
        <PasswordField name="password" placeholder="Enter your new password" />
        <PasswordField name="confirmPassword" placeholder="Confirm your new password" />
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}
        <SubmitButton isSubmitting={isSubmitting} />
      </Form>
    )}
  </Formik>
);

const PasswordField: React.FC<{ name: string; placeholder: string }> = ({ name, placeholder }) => (
  <div className="mb-4">
    <Field
      name={name}
      type="password"
      className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none bg-gray-100 dark:bg-[#1F2A37]"
      placeholder={placeholder}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs mt-1"
    />
  </div>
);

const SubmitButton: React.FC<{ isSubmitting: boolean }> = ({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full py-2 px-4 text-white rounded-md bg-[#56C870] focus:outline-none disabled:opacity-50"
  >
    {isSubmitting ? "Submitting..." : "New Password"}
  </button>
);

