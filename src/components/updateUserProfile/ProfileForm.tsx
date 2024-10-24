import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { TuserSchema } from "../../utils/userSchema";
import PasswordInput from "./PasswordInput";
import useImageUpload from "./useImagePreview";

interface ProfileFormProps {
  form: UseFormReturn<TuserSchema>;
  onSubmit: (data: TuserSchema) => Promise<void>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  form,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const { previewImage, isUploading, handleImageChange } = useImageUpload(form);


  return (
    <form
      className="w-[60%]  flex flex-col gap-6 rounded-md px-10 py-12 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="text-xl font-semibold pb-1 dark:text-white">
        Edit Profile
      </label>
      <hr className="w-32 mt-[-25px] border-2 border-green " />
      <div className="w-full justify-between flex gap-16 flex-wrap">
        <div className="flex flex-col flex-1  min-w-[200px]">
          <label htmlFor="" className=" dark:text-white">
            First Name
          </label>
          <input
            type="text"
            {...register("firstname")}
            className="flex-1 pl-4 py-2 rounded border-[1px] border-dark-bg bg-transparent dark:text-white dark:border-white"
          />
          {errors.firstname && (
            <p className="text-sm text-red-600">{errors.firstname.message}</p>
          )}
        </div>
        <div className="flex flex-col flex-1  min-w-[200px]">
          <label htmlFor="" className="text-white">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastname")}
            className="flex-1 pl-4 py-2 rounded-md border-[1px] border-dark-bg bg-transparent dark:text-white dark:border-white"
          />
          {errors.lastname && (
            <p className="text-sm text-red-600">{errors.lastname.message}</p>
          )}
        </div>
      </div>

      <div className="w-full justify-between flex gap-16 flex-wrap">
        <div className="flex-1 flex flex-col  min-w-[200px]">
          <label htmlFor="" className="text-white">
            Code
          </label>
          <input
            type="text"
            {...register("code")}
            className="flex-1 pl-4 py-2 rounded-md border-[1px] border-dark-bg bg-transparent dark:text-white dark:border-white"
          />
          {errors.code && (
            <p className="text-sm text-red-600">{errors.code.message}</p>
          )}
        </div>
        <div className="flex flex-1 flex-col  min-w-[200px]">
          <label htmlFor="" className="text-white">
            Telephone
          </label>
          <input
            type="text"
            {...register("telephone")}
            className="flex-1 pl-4 py-2 rounded-md border-[1px] border-dark-bg bg-transparent dark:text-white dark:border-white"
          />
          {errors.telephone && (
            <p className="text-sm text-red-600">{errors.telephone.message}</p>
          )}
        </div>
      </div>
      <div className="w-full flex gap-16  justify-between flex-wrap ">
        <div className="flex flex-1 flex-col  min-w-[200px]">
          <label htmlFor="" className="text-white">
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            className="flex-1 pl-4 py-2 rounded-md border-[1px] border-dark-bg bg-transparent dark:text-white dark:border-white"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <PasswordInput register={register} errors={errors} />
      </div>

      <div className="">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="pl-4 py-2 rounded dark:bg-transparent dark:text-white"
        />
      </div>
      <div className="flex gap-4">
        <button
          className="py-2 mt-2 w-64 text-white font-medium bg-green rounded flex justify-center hover:bg-emerald-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ThreeDots height="20" width="30" color="#ffffff" />
          ) : (
            "UPDATE"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
