import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { registerSchema } from "../validation/Register";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Button from "./Button";
import { fetchCountries } from "../country/country";
import { zodResolver } from "@hookform/resolvers/zod";
import { formData } from "../validation/Register";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { Toasty } from "../Toasty/Toasty";
import axios from "axios";
import Datalist from "../ReusableComponents/DataList";
import { showErrorToast } from "utils/toast";
import { useNavigate } from "react-router-dom";

interface Country {
  name: string;
  code: string;
  phone: string;
  suffix: string;
}

function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState([false, false]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAnError, setError] = useState<string | null>(null);

  const [fetchedCountries, setFetchedCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countdown, setCountdown] = useState(3);

  const handleCountrySearch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = fetchedCountries.filter((country) =>
      country.name.toLowerCase().startsWith(searchTerm)
    );
    setFilteredCountries(filtered);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        navigate('/login');
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    async function fetchCountriesData() {
      const countriesData = await fetchCountries();
      const sortedFiltered = countriesData.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
      setFetchedCountries(sortedFiltered);
      setFilteredCountries(sortedFiltered);
    }
    fetchCountriesData();
  }, []);


  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCountry(value);
  
    // Filter countries based on the input
    const filtered = fetchedCountries.filter((country) =>
      country.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  
    // If a valid country is selected, update the country code
    const selectedCountryObj = fetchedCountries.find(
      (country) => country.name.toLowerCase() === value.toLowerCase()
    );
    if (selectedCountryObj) {
      setValue("countryCode", `${selectedCountryObj.phone}${selectedCountryObj.suffix}`);
    }
  };
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, 
  } = useForm<formData>({
    resolver: zodResolver(registerSchema),
  });

  const showToast = (message: any, type: any) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  const onSubmit = async (data: any) => {

    setIsLoading(true);
    if (data.password !== data.confirmPassword) {
      showToast("Passwords doesn't match!", "error");
      setIsLoading(false);
      return;
    }
    try {
      const parsedData = registerSchema.parse(data);
      const response = await axios.post(`${process.env.BACKEND_URL}`, {
        query: `
          mutation CreateUser($userInput: UserInput_Logged) {
            createUser_Logged(userInput: $userInput) {
              country
              email
              firstname
              gender
              lastname
              password
              createdAt
              id
              picture
              role {
                _id
              }
              telephone
              token
            }
          }
        `,
        variables: {
          userInput: {
            firstname: parsedData.firstname,
            lastname: parsedData.lastname,
            country: parsedData.country,
            code: parsedData.countryCode,
            gender: parsedData.gender,
            email: parsedData.email,
            password: parsedData.password,
            telephone: `${parsedData.countryCode} ${parsedData.phoneNumber}`,
          },
        },
      });
      if (response.data.errors) {
        const error = response.data.errors[0].message;
        if (
          error.includes("E11000 duplicate key error collection") &&
          error.includes("email_1 dup key")
        ) {
          showToast("Email already exists. Please sign in.", "error");
        } else if (
          error.includes(
            "Telephone number already exists. Please use a different number."
          )
        ) {
          showToast("This telephone number is already in use.", "error");
        } else {
          showToast(error, "error");
        }
      } else {
        setIsSuccess(true)
      }
    } catch (error: any) {
      showToast("An error occurred.", "error");
    }
    setIsLoading(false);
  };

  const handleClickShowPassword = (index: number) => {
    setShowPassword((prevShowPassword) => {
      const updatedShowPassword = [...prevShowPassword];
      updatedShowPassword[index] = !prevShowPassword[index];
      return updatedShowPassword;
    });
  };
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
              <p>Your account has been succefully created !</p>
              {/* <p>Redirecting to login page in {countdown} seconds...</p> */}
            </div>
            <Link to="/login" ><Button label="Continue" className="w-[80px]" /></Link>
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
              <div className=" relative w-[25vw] sm:w-5/6 lg:w-[25vw]">
                <InputField
                  placeholder="Password"
                  type={showPassword[0] ? "text" : "password"}
                  className="w-full rounded-md   px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                  {...register("password")}
                  error={errors?.password}
                  onCopy={(e) => e.preventDefault()}
                />
                <div
                  onClick={() => handleClickShowPassword(0)}
                  className=" absolute right-4 top-4"
                >
                  {showPassword[0] ? (
                    <FontAwesomeIcon icon={faEye} className="text-white" />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} className="text-white" />
                  )}
                </div>
              </div>
              <div className=" relative w-[25vw] sm:w-5/6 lg:w-[25vw]">
                <InputField
                  placeholder="confirm Password"
                  type={showPassword[1] ? "text" : "password"}
                  className="w-full rounded-md   px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                  {...register("confirmPassword")}
                  error={errors?.confirmPassword}
                />
                <div
                  onClick={() => handleClickShowPassword(1)}
                  className=" absolute right-4 top-4"
                >
                  {showPassword[1] ? (
                    <FontAwesomeIcon icon={faEye} className="text-white" />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} className="text-white" />
                  )}
                </div>
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
                    options={[
                      { value: "female" },
                      { value: "male" },
                      { value: "other" },
                    ]}
                  />
                </div>
              </div>

              <div className="flex items-center w-[25vw] sm:w-5/6 lg:w-[25vw]  justify-between">
                <div className="w-[20%] ">
                <InputField
                  placeholder="Country Code"
                  type="text"
                  className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                  {...register("countryCode")}
                  error={errors?.countryCode}
                />
                </div>
                <div className=" w-[65%]">
                  <InputField
                    type="text"
                    placeholder="Phone Number"
                    className=" w-full  rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-white sm:text-[12px]  outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
                    {...register("phoneNumber")}
                    error={errors?.phoneNumber}
                  />
                </div>
              </div>
              <div className="flex items-center sm:w-5/6 w-[25vw] lg:w-[25vw]   jusify-around">
                <InputField
                  type="checkbox"
                  {...register("acceptTerms")}
                  className="form-checkbox h-4 bg-green"
                  error={errors?.acceptTerms}
                />
                <div className="ml-[10px]">
                  <label htmlFor="acceptTerms" className="text-white ">
                    I accept the{" "}
                    <a href="#" className="text-[#56C870]">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
              </div>
            </div>
            <div className="sm:w-[35vw] lg:w-[20vw] w-[20vw]">
              {isLoading ? (
                <>
                  <Button
                    type="submit"
                    label=""
                    className=" sm:w-full w-5/6 rounded-md mb-20  px-2 py-3 text-white   focus:bg-[#56C870]  bg-[#56C870]"
                    disabled={true}
                  >
                    <svg
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
  );
}

export default SignupForm;
