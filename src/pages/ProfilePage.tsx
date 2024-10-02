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
} from "../utils/Profileutils";
import ProfileForm from "../components/updateUserProfile/ProfileForm";
import ImageUpload from "../components/updateUserProfile/ImageUpload";
import { ThreeDots } from "react-loader-spinner";

const Profile: React.FC = () => {
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
    await updateUser(data, userId, dispatch,userData);
  };

  return (
    <>
      {userData && (
        <div className="w-full h-[900px] flex flex-col mt-10 z-20">
          <div className=" mt-[-40px] relative ">
            <img
              src="https://cdn-amkpl.nitrocdn.com/qgEseOkSlljuBSKdCQPXqukeMDwvaGTw/assets/images/optimized/rev-97ef727/www.royalalaskanmovers.com/wp-content/uploads/sites/7/2024/07/ca_featured.png"
              alt=""
              className="w-full h-60"
            />
            <ImageUpload form={form} />
          </div>
          <ProfileForm form={form} onSubmit={onSubmit} />
        </div>
      )}
    </>
  );
};

export default Profile;
