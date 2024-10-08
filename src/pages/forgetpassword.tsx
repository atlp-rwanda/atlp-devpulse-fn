import React from "react";
import { Header } from "../components/sidebar/Header";
import { ForgotPasswordForm } from "../components/form/ForgotPasswordForm";
import { useForgotPassword } from "../components/form/useForgotPassword";

export const ForgotPasswordPage: React.FC = () => {
  const { emailSent, error, handleSubmit } = useForgotPassword();

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen dark:bg-zinc-800">
        <div className="border border-gray-400 p-6 bg-gray-300 dark:bg-[#1F2A37] shadow-lg w-11/12 max-w-lg rounded-sm sm:mt-[70px]">
          <h1 className="text-3xl text-[#1F2A37] dark:text-white font-bold text-center mb-6">
            Forgot Password
          </h1>
          <ForgotPasswordForm 
            emailSent={emailSent} 
            error={error} 
            onSubmit={handleSubmit} 
          />
        </div>
      </div>
    </>
  );
};
export default ForgotPasswordPage;
