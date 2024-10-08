import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswordForm } from "../components/form/ResetPasswordForm";
import { SuccessMessage } from "../components/form/SuccessMessage";
import { useResetPassword } from "../components/form/useResetPassword";
import {Header} from "../components/sidebar/Header"
export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = new URLSearchParams(location.search).get("token");
  const { successMessage, error, handleSubmit } = useResetPassword(token || null);

  const onSubmit = async (values: { password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    await handleSubmit(values, { setSubmitting });
  };

  return (
    <>
     <Header/>
    <div className="flex flex-col justify-center items-center h-screen dark:bg-zinc-800">
    
      <div className="border border-gray-400 p-6 bg-gray-300 dark:bg-[#1F2A37] shadow-lg w-11/12 max-w-lg rounded-sm">
        <h1 className="text-3xl text-[#1F2A37] dark:text-white font-bold text-center mb-6">
          Reset Password
        </h1>
        {successMessage ? (
          <SuccessMessage 
            message={successMessage}
            onNavigate={() => navigate("/login")} 
          />
        ) : (
          <ResetPasswordForm onSubmit={onSubmit} error={error} />
        )}
      </div>
    </div>
    </>
  );
};

export default ResetPasswordPage;
