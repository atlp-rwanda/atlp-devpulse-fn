import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { fetchCountries } from "../country/country";
import { zodResolver } from "@hookform/resolvers/zod";
import { googleFormData, googleDataSchema } from "../validation/Register";
import { AiOutlineCheck } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Datalist from "../ReusableComponents/DataList";
import { Link } from "react-router-dom";
import { updateUserSelf } from '../../redux/actions/users';
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { Toasty } from "../Toasty/Toasty";
import { fetchUserData } from "./SignInForm";
import useCountry from "../../hooks/useCountry";
import { Token } from "../../utils/utils";

const GoogleSignup = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAnError, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, 
      } = useForm<googleFormData>({
        resolver: zodResolver(googleDataSchema),
    });

    const {
      fetchedCountries,
      filteredCountries,
      selectedCountry,
      handleCountryChange,
    } = useCountry({ setValue });

    const showToast = (message: any, type: any) => {
        setError(message);
        setTimeout(() => {
          setError(null);
        }, 3000);
    }
    const onSubmit = async (data: googleFormData) => {
        setIsLoading(true); 
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          toast.error("User not authenticated");
          throw new Error("User not authenticated");
        }
        const userData: any = await fetchUserData(token);
        const id = userData.getUsers_Logged[0].id;
        const parsedData = googleDataSchema.parse(data);
        const response = await updateUserSelf(id, parsedData);
        if (response.status === 200 && response.data.data.updateUserSelf === true) {
            setIsSuccess(true);
            toast.success("User updated successfully");
        } else {
            toast.error("Error updating user");
        }
      } catch (error: any) {
          toast.error("Error updating user");
      } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
      }
    };
    useEffect(() => {
        Token();
        const token = localStorage.getItem("access_token");
        if (!token) {throw new Error("User not authenticated");}
        const decodedToken: any = jwtDecode(token);
        const {family_name, given_name, email} = decodedToken;
        setValue("firstname", family_name);
        setValue("lastname", given_name);
        setValue("email", email);
    }, [setValue]);
    
    return (
        <>
        <div className="flex items-center  justify-center mx-auto bg-[#374151] h-screen">
        {isAnError && (
          <Toasty message={isAnError} type="error" onClose={() => setError(null)} />
        )}
        {isSuccess ? (
          <div className="bg-[#1F2A37] w-[30vw]  flex h-[70vh] flex-col items-center justify-center rounded-sm sm:w-5/6 lg:w-[45vw]">
            <div
              className={`rounded-full flex items-center justify-center  ${isAnError ? "bg-white" : "bg-green"
                } p-4 mx-auto mb-4`}
            >
              <AiOutlineCheck className="text-white text-4xl" />
            </div>
            <div className="text-[#afb1b4] text-lg mb-4 font-inter">
              <p>Google account created successfully!!</p>
            </div>
            <Link to="/applicant" ><Button label="Continue" className="w-[80px]" /></Link>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              handleSubmit(onSubmit)(event);
            }}
            className="bg-[#1F2A37]  sm:fixed w-[45vw] flex max-h-[90%] md:mt-[70px]  sm:mt-[70px] lg:mt-[0px]  sm:max-h-[100%] flex-col items-center justify-center rounded-sm sm:w-[90%] lg:w-[45vw]"
          >
            <h1 className="text-3xl text-white font-bold py-4">
              Create Your Account
            </h1>
            <div className="sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center  lg:w-auto">
              <div className="w-[25vw]  sm:w-5/6 lg:w-[25vw]">
                <InputField
                  placeholder="firstname"
                  type="text"
                  className="w-full rounded-md   px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                  {...register("firstname")}
                  error={errors?.firstname}
                />
              </div>
              <div className="w-[25vw] sm:w-5/6 lg:w-[25vw]">
                <InputField
                  placeholder="lastname"
                  type="text"
                  className="w-full rounded-md   px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                  {...register("lastname")}
                  error={errors?.lastname}
                />
              </div>
              <div className="w-[25vw] sm:w-5/6 lg:w-[25vw]">
                <InputField
                  placeholder="andela@gmail.com"
                  type="text"
                  className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                  {...register("email")}
                  error={errors?.email}
                  autoComplete="on"
                />
              </div>
              <div className="flex items-center w-[25vw] gap-10   sm:w-5/6 lg:w-[25vw] justify-between">
                <div className="w-[50%]">
                <InputField
                  placeholder="Country"
                  list="countries"
                  className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                  {...register("country", {
                  onChange: (e) => handleCountryChange(e),
                   })} 
                  error={errors?.country}
                  />
                  <datalist id="countries">
                  {filteredCountries.map((country) => (
                   <option key={country.code} value={country.name} />
                  ))}
                  </datalist>
                </div>
                <div className="w-[50%] ">
                  <InputField
                    placeholder="Gender"
                    type="text"
                    {...register("gender")}
                    list="gender"
                    error={errors?.gender}
                  />
                  <Datalist
                    id="gender"
                    options={[{ value: "female" }, { value: "male" }, { value: "other" },]}
                  />
                </div>
              </div>
              <div className="flex items-center w-[25vw] sm:w-5/6 lg:w-[25vw]  justify-between">
                <div className="w-[20%] ">
                <InputField
                  placeholder="Country Code"
                  type="text"
                  className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                  {...register("code")}
                  error={errors?.code}
                />
                </div>
                <div className=" w-[65%]">
                  <InputField
                    type="text"
                    placeholder="Phone Number"
                    className=" w-full  rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px]  outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                    {...register("telephone")}
                    error={errors?.telephone}
                  />
                </div>
              </div>
            </div>
            <div className="sm:w-[35vw] lg:w-[20vw] w-[20vw]">
              {isLoading ? (
                <>
                  <Button
                    type="submit" label="" className=" sm:w-full w-5/6 rounded-md mb-20  px-2 py-3 text-white   focus:bg-[#56C870]  bg-[#56C870]"
                    disabled={true}
                  >
                    <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#56C870"
                      />
                    </svg>
                  </Button>
                </>
              ) : (
                <Button type="submit" label="Signup" className="my-1  mb-4 sm:w-full w-5/6 " />
              )}
            </div>
          </form>
        )}
      </div>
    </>  
    )
}
export default GoogleSignup;