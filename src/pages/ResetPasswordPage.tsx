import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswordForm } from "../components/form/ResetPasswordForm";
import { SuccessMessage } from "../components/form/SuccessMessage";
import { useResetPassword } from "../components/form/useResetPassword";

export const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");
  const { passwordChanged, error, handleSubmit } = useResetPassword(token);

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Invalid or missing token!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen dark:bg-zinc-800">
      <div className="border border-gray-400 p-6 bg-gray-300 dark:bg-[#1F2A37] shadow-lg w-11/12 max-w-lg rounded-sm">
        <h1 className="text-3xl text-[#1F2A37] dark:text-white font-bold text-center mb-6">
          Reset Password
        </h1>
        {passwordChanged ? (
          <SuccessMessage onNavigate={() => navigate("/login")} />
        ) : (
          <ResetPasswordForm onSubmit={handleSubmit} error={error} />
        )}
      </div>
    </div>
  );
};
export default ResetPasswordPage;