import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { loginSchema } from '../validation/login';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import Button from './Button';
import { fetchCountries } from '../country/country';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormData } from '../validation/login';
import { AiOutlineCheck } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Toasty } from '../Toasty/Toasty';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { request, GraphQLClient } from 'graphql-request';
import { loginAction } from '../../redux/actions/login';
import { toast } from 'react-toastify';

const googleIcn: string = require('../../assets/assets/googleIcon.jpg').default;

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState([false, false]);
  const [path, setPath] = useState('/');
  const [isSuccess, setIsSuccess] = useState(false);
  const CLIENT_ID = process.env.CLIENT_ID;
  const navigate = useNavigate();

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

  const handleCallBackResponse = async (response: any) => {
    // //@ts-ignore
    // google.accounts.id.prompt();
    const token = response.credential;
    localStorage.setItem('access_token', token);
    const roleName = localStorage.getItem('roleName');
    if (roleName === 'applicant') {
     return navigate('/myApplications');
    }
    // @ts-ignore
    const client = new GraphQLClient(process.env.BACKEND_URL, {
      headers: { Authorization: token },
    });
    await client.request(MY_QUERY).then((data) => {
      data && navigate(path);
    });
  };

  useEffect(() => {
    /*Global google*/

    //@ts-ignore
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallBackResponse,
    });

    //@ts-ignore
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      type: 'icon',
      theme: 'contained',
      size: 'large',
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const parsedData = loginSchema.parse(data);
      const response = await loginAction(parsedData.email, parsedData.password);

      const validate = (token) => {
        localStorage.setItem(
          'access_token',
          response?.data?.data?.login?.token,
        );
       const roleName = localStorage.getItem('roleName');
       if (roleName === 'applicant') {
         return navigate('/myApplications');
       }
        navigate('/');
        setIsLoading(false);
      };

      response?.data?.data?.login !== null
        ? validate(response?.data?.data?.login?.token)
        : toast.error(response?.data?.errors[0].message);
    } catch (error: any) {
      toast.error('something went wrong!!');
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
      <div className="flex items-center  justify-center mx-auto bg-white dark:bg-[#374151] h-screen">
        <form
          onSubmit={(event) => {
            handleSubmit(onSubmit)(event);
          }}
          className=" border border-gray-400 bg-gray-300 dark:bg-[#1F2A37] z-50 shadow-lg sm:fixed w-[45vw] flex max-h-[90%] md:mt-[70px]  sm:mt-[70px] lg:mt-[0px]  sm:max-h-[100%] flex-col items-center justify-center rounded-sm sm:w-[90%] lg:w-[45vw]"
        >
          <h1 className="text-3xl text-[#1F2A37] dark:text-white font-bold py-4">
            Login
          </h1>
          <div className="sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center  lg:w-auto">
            <div className="w-[25vw] sm:w-5/6 lg:w-[25vw]">
              <InputField
                placeholder="andela@gmail.com"
                type="text"
                className="w-full rounded-md px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-black dark:autofill:text-white bg-gray-100 dark:bg-[#1F2A37]"
                {...register('email')}
                error={errors?.email}
                autoComplete="on"
              />
            </div>
            <div className=" relative w-[25vw] sm:w-5/6 lg:w-[25vw]">
              <InputField
                placeholder="Password"
                type={showPassword[0] ? 'text' : 'password'}
                className="w-full rounded-md   px-2 py-3 border border-white placeholder:text-gray-400 text-black dark:text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-black dark:autofill:text-white  bg-gray-100 dark:bg-[#1F2A37]"
                {...register('password')}
                error={errors?.password}
                onCopy={(e) => e.preventDefault()}
              />
              <div
                onClick={() => handleClickShowPassword(0)}
                className=" absolute right-4 top-4"
              >
                {showPassword[0] ? (
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
          </div>
          <div className="sm:w-[35vw] lg:w-[20vw] w-[20vw] mt-3 ">
            {isLoading ? (
              <>
                <Button
                  type="submit"
                  label=""
                  className=" sm:w-full w-5/6 rounded-md mb-4  px-2 py-3 text-white   focus:bg-[#56C870]  bg-[#56C870]"
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
              <Button
                type="submit"
                label="Login"
                className="my-1  mb-4 sm:w-full w-5/6 "
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-2 sm:w-[35vw] lg:w-[20vw] w-[20vw]">
            <hr className="flex-grow border-gray-600 dark:border-gray-100 border-t " />
            <span className="px-4 dark:text-[#e2e2e2] text-sm">
              Or continue with
            </span>
            <hr className="flex-grow border-gray-600 dark:border-gray-100 border-t" />
          </div>
          <div className=" py-2 mt-3 mb-4">
            <div id="signInDiv" className=" rounded-full h-[40px] w-[40px]">
              <img src={googleIcn} alt="google" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
