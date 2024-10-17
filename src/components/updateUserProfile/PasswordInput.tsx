import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

interface PasswordInputProps {
  register: any;
  errors: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="relative  flex-1 rounded">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="" className="text-white">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Change password"
            className="w-full pl-4 py-2 rounded-md border-[1px] bg-transparent dark:text-white"
          />
        </div>

        <div
          onClick={handleClickShowPassword}
          className="absolute right-4 top-10"
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <FontAwesomeIcon
              icon={faEye}
              className="text-gray-400 dark:text-white"
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="text-gray-400 dark:text-white"
            />
          )}
        </div>
      </div>
      {errors.password && (
        <p className="text-sm text-red-600">{errors.password.message}</p>
      )}
    </>
  );
};

export default PasswordInput;
