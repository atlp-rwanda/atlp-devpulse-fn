import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ImageUpload from "../components/updateUserProfile/imageUpload";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { toast } from "react-toastify";
import { TuserSchema, userSchema } from "../utils/userSchema";
import {
  fetchUser,
  updateUser,
  getUserIdFromToken,
} from "../utils/profileUtils";
import { Icon } from "@iconify/react";
const Logo: string = require('../assets/andela-logo.svg').default;
const coverImage: string = require("../assets/cover.png").default;
// const DEFAULT_IMAGE: string = require("../../assets/default-image.jpg").default;

const Profile = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const userData = useAppSelector((state: any) => state.updateUser?.data);
  const role = localStorage.getItem("roleName");
  const rolePrefix = role === "admin" || role === "superAdmin" ? "admin" : role;
  const userId = getUserIdFromToken();

  useEffect(() => {
    if (userId) {
      fetchUser(userId, dispatch, setLoading);
    }
  }, [userId, dispatch]);

  return (
    <>
      {userData && (
        <div className="w-full h-[900px] flex flex-col mt-10 z-20  bg-light-bg dark:bg-dark-frame-bg ">
          <div className=" mt-[-40px] relative">
            <img src={userData.coverImage || coverImage} alt="coverimage" className="w-full h-60" />
            <div className="w-full absolute top-20 px-8">
            
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-md px-10 py-12 ">
            <div className="text-xl font-semibold pb-1 dark:text-white">
              About
            </div>
            <hr className="w-14 mt-[-25px] border-2 border-green " />
            <div className="flex flex-row gap-5 flex-wrap w-full">
              <div className="bg-white  dark:bg-dark-bg shadow-lg rounded-md dark:text-white p-5 flex flex-col gap-2 flex-1">
                <h2 className="font-semibold pb-2 text-lg">{userData.firstname} {userData.lastname}</h2>
                <div className="flex gap-2 items-center">
                  <Icon
                    icon="material-symbols:mail-outline"
                    className="w-5 h-5"
                  />
                  <span>{userData.email}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon icon="mdi:phone-outline" className="w-5 h-5" />
                  <span>({userData.code}) {userData.telephone}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon
                    icon="material-symbols:location-on-outline"
                    className="w-5 h-5"
                  />
                  <span>{userData.address || 'No address provided'}</span>
                </div>
              </div>
              <div className="bg-white  dark:bg-dark-bg shadow-lg rounded-md dark:text-white p-5 flex flex-col gap-2 flex-1">
                <h2 className="font-semibold pb-2">Biography</h2>
                <p>
                {userData.biography || 'No biography provided'}
                </p>
              </div>
            </div>
            <div className="w-full bg-[#173B3F] my-8 rounded-lg p-6">
              <div className="flex gap-5 dark:text-white items-center">
                
                <div>
                    <img src={Logo} alt="Andela logo" className="w-full h-full object-contain" />
                </div>
                <div >
                  <h2 className="text-xl font-semibold">Andela</h2>
                  <a href="">https://andela.pulse.com</a>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-5 flex-wrap w-full">
              <div className="bg-white  dark:bg-dark-bg shadow-lg rounded-md dark:text-white p-5 flex flex-col gap-2 flex-1">
                <h2 className="pb-4 text-green font-semibold">
                  You in the organization
                </h2>
                <p>
                  <span className="font-bold">Joined:</span> 20 July 2022
                </p>
                <p>
                  <span className="font-bold">Role:</span> Trainee
                </p>
                <p>
                  <span className="font-bold">Team:</span> Codebandits
                </p>
              </div>
              <div className="bg-white  dark:bg-dark-bg shadow-lg rounded-md dark:text-white p-5 flex flex-col gap-2 flex-1">
                <h2 className="pb-4 text-green font-semibold">Management</h2>
                <p>
                  <span className="font-bold">Program:</span> 20 July 2022
                </p>
                <p>
                  <span className="font-bold">Current Stage:</span> Core
                  concepts
                </p>
                <p>
                  <span className="font-bold">Manager:</span>Mukunzi Dodo
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
