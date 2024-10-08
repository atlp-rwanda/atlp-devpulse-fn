import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { loginSchema } from "../validation/login";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Button from "./Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormData } from "../validation/login";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { GraphQLClient } from "graphql-request";
import { loginAction } from "../../redux/actions/login";
import { Token } from '../../utils/utils';
import { getUserbyFilter } from "../../redux/actions/users";
import jwtDecode from "jwt-decode";

const googleIcn: string = require("../../assets/assets/googleIcon.jpg").default;

const MY_QUERY = `
  {
    getUsers_Logged {
      id
      createdAt
      firstname
      lastname
      email
    }
  }
`;

const CLIENT_ID = process.env.CLIENT_ID;

const fetchUserData = async (token: string) => {
  const client = new GraphQLClient(process.env.BACKEND_URL as string, {
    headers: { Authorization: token },
  });
  return client.request(MY_QUERY);
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isNormalLogin, setIsNormalLogin] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const redirectAfterLogin = async (isNormalLogin = true) => {
    if (isNormalLogin) {
      const lastAttemptedRoute = localStorage.getItem('lastAttemptedRoute');
      if (lastAttemptedRoute) {
        localStorage.removeItem('lastAttemptedRoute');
        navigate(lastAttemptedRoute);
      } else {
        await Token();
        const role = localStorage.getItem("roleName") as string;
        if (role === "applicant") {
          navigate("/applicant");
        } else if (role === "superAdmin") {
          navigate("/admin");
        } else {
          const searchParams = new URLSearchParams(location.search);
          const returnUrl = searchParams.get('returnUrl') || '/applicant';
          navigate(returnUrl);
        }
      }
    }
  }

  const checkAuthMethod = async (filter: any) => {
    const response = await getUserbyFilter(filter);
    console.log(response); 
    const userdata = response?.data?.getByFilter?.[0]; 
    return userdata?.authMethod;
  };

  const onSubmit = async (data: loginFormData) => {
    setIsLoading(true);
    try {
      const validatedData = loginSchema.parse(data);
      const response = await loginAction(validatedData.email, validatedData.password);

      const token = response?.data?.data?.login?.token;
      if (token) {
        localStorage.setItem("access_token", token);
        await redirectAfterLogin();
      } else {
        toast.error(response?.data?.errors[0].message);
      }
    } catch (error: any) {
      
        toast.error("Login failed, please try again.");

    } finally {
      setIsLoading(false);
    }
  };

  const checkFirstTimeUser = async (filter: object) => {
    const response = await getUserbyFilter(filter);
    const userdata = response?.data?.getByFilter?.[0];
    console.log(userdata);
    console.log(userdata.country.length);
    console.log(userdata.telephone.length);
    if (userdata.country.length === 0 && userdata.telephone.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleCallBackResponse = async (response: any) => {
    const token = response.credential;
    console.log(response);

    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    const useremail = decodedToken.email;
    console.log(useremail);
    const data: any = await fetchUserData(token);
    console.log(data);
  
    if (data) {
      const filter = { email: useremail };
      const authMethod = await checkAuthMethod(filter);
      console.log(authMethod);

      if (authMethod === "google") {
        setIsNormalLogin(false);
        const user = data.getUsers_Logged[0];
        const filter = { email: user.email };
        const firstTimeUserResult: boolean = await checkFirstTimeUser(filter);
        console.log(firstTimeUserResult);
        if (firstTimeUserResult) {
          toast.success("Welcome to our platform! fill in the missing data.");
          navigate("/google");
        } else {
          localStorage.setItem("access_token", token);
          setIsNormalLogin(true);
          await redirectAfterLogin(true);
        }
      } else {
        toast.error("This account cannot log in with Google.");
        navigate("/login");
      }
    }
  };
  

  useEffect(() => {
    //@ts-ignore
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallBackResponse,
    });

    //@ts-ignore
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      type: "icon",
      theme: "contained",
      size: "large",
    });
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center mx-auto bg-white dark:bg-[#374151] h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-400 bg-gray-300 dark:bg-[#1F2A37] shadow-lg sm:fixed w-[45vw] flex max-h-[90%] sm:mt-[70px] sm:max-h-[100%] flex-col items-center justify-center rounded-sm sm:w-[90%] lg:w-[45vw]"
      >
        <h1 className="text-3xl text-[#1F2A37] dark:text-white font-bold py-4">Login</h1>
        <div className="sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center lg:w-auto">
          <div className="w-[25vw] sm:w-5/6 lg:w-[25vw]">
            <InputField
              placeholder="andela@gmail.com"
              type="text"
              className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-black dark:autofill:text-white bg-gray-100 dark:bg-[#1F2A37]"
              {...register("email")}
              error={errors?.email}
              autoComplete="on"
            />
          </div>
          <div className="relative w-[25vw] sm:w-5/6 lg:w-[25vw]">
            <InputField
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-black dark:autofill:text-white bg-gray-100 dark:bg-[#1F2A37]"
              {...register("password")}
              error={errors?.password}
              onCopy={(e) => e.preventDefault()}
            />
            <div onClick={handleClickShowPassword} className="absolute right-4 top-4" aria-label="Toggle password visibility">
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} className="text-gray-400 dark:text-white" />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400 dark:text-white" />
              )}
            </div>
          </div>
        </div>
        <div className="sm:w-[35vw] lg:w-[20vw] w-[20vw] mt-3">
          {isLoading ? (
            <Button
              type="submit"
              label=""
              className="sm:w-full w-5/6 rounded-md mb-4 px-2 py-3 text-white focus:bg-[#56C870] bg-[#56C870]"
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
          ) : (
            <Button type="submit" label="Login" className="my-1 mb-4 sm:w-full w-5/6" />
          )}
        </div>
        <div className="flex items-center justify-center gap-2 sm:w-[35vw] lg:w-[20vw] w-[20vw]">
          <div id="signInDiv" className="h-[40px] w-[40px]"></div>
        </div>
        <p className="text-sm mt-3 mb-2 text-[#616161] dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#56C870]">
            Sign up
          </Link>
        </p>
        <p className="text-sm mt-3 mb-2 text-[#616161] dark:text-gray-300">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot your password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

