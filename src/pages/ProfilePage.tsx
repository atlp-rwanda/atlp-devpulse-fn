import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { toast } from "react-toastify";
import { TuserSchema, userSchema } from "../utils/userSchema";
import {
  fetchUser,
  updateUser,
  getUserIdFromToken,
} from "../utils/profileUtils";
import ProfileForm from "../components/updateUserProfile/ProfileForm";
import ImageUpload from "../components/updateUserProfile/ImageUpload";
import { ThreeDots } from "react-loader-spinner";
const coverImage: string = require("../assets/cover.png").default;

const ProfileUpdate: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const userData = useAppSelector((state: any) => state.updateUser?.data);
  const form = useForm<TuserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstname: "-",
      lastname: "-",
      email: "-",
      telephone: "-",
      code: "-",
      password: "-",
      picture: "-",
    },
  });
  const { reset } = form;
  const userId = getUserIdFromToken();

  useEffect(() => {
    if (userId) {
      fetchUser(userId, dispatch, setLoading);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userData) {
      reset({ ...userData, password: "" });
    }
  }, [userData, reset]);

  const onSubmit = async (data: TuserSchema) => {
    if (!userId) {
      toast.error("User ID not found");
      return;
    }
    await updateUser(data, userId, dispatch, userData);
  };

  return (
    <>
      {userData && (
        <div className="w-full h-[900px] flex flex-col mt-10 z-20  bg-white dark:bg-dark-bg ">
          <div className=" mt-[-40px] relative">
            <img src={coverImage} alt="coverimage" className="w-full h-60" />
            <ImageUpload form={form} />
          </div>
          <ProfileForm form={form} onSubmit={onSubmit} />
        </div>
      )}
    </>
  );
};

export default ProfileUpdate;
