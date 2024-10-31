import jwtDecode from 'jwt-decode';
import { GraphQLClient } from 'graphql-request';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export const destination = () =>{
  const roleName = localStorage.getItem("roleName");
  const destin =  (roleName === "superAdmin" || roleName === "Admin") ? "/admin" : "/applicant";
  return destin;
}

export const Token = () => {
  const access_token = localStorage.getItem('access_token');
  const verifyToken = async (token: any) => {
    try {
      const QUERY = `query CheckUserRole($email: String) {
          checkUserRole(email: $email) {
            _id
            roleName
            description
          }
        } `
    ;

      const decoded: any = jwtDecode(token);
      const email = decoded.data ? decoded.data.email : decoded.email;
      console.log('decoded', decoded.data);
      console.log(decoded);
      const currentTime = Math.floor(Date.now() / 1000);
      console.log('currentTime', currentTime);
      const mockTime = decoded.exp - 3000;
      console.log('mockTime', mockTime);

      if(decoded.exp < currentTime) {
        localStorage.removeItem('access_token');
        toast.error('Session expired, please login again');
        return null;
      }

      if (process.env.BACKEND_URL) {
        const client = new GraphQLClient(process.env.BACKEND_URL, {
          headers: { Authorization: token },
        });
        await client.request(QUERY, { email }).then((data: any) => {
          if (data) {
            const roleName = data.checkUserRole?.roleName;
            localStorage.setItem('roleName', roleName);
            localStorage.setItem('userId', decoded.data.userId);
          }
        });
        return decoded;
      }
      console.log('decoded', decoded.data);
      return decoded;
    } catch (error) {
      //@ts-ignore
      console.error('Error', error.message);
    }
  };
  const user = access_token ? verifyToken(access_token) : null;
  return user; 
};