import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { request, GraphQLClient } from "graphql-request";
import { Token } from "../utils/utils";

const LoginPage = (props: any) => {
  const access_token = Token();
  const authenticated =
    access_token !== null && access_token !== undefined && access_token !== "";

  const navigate = useNavigate();

  const CLIENT_ID = process.env.CLIENT_ID;

  const MY_QUERY = `
    {
  getUsers_Logged {
    id
    createdAt
    name
    email
  }
}
  `;

  const handleCallBackResponse = async (response: any) => {
    // //@ts-ignore
    // google.accounts.id.prompt();
    const token = response.credential;
    localStorage.setItem("access_token", token);
    // @ts-ignore
    const client = new GraphQLClient(process.env.BACKEND_URL, {
      headers: { Authorization: token },
    });
    await client.request(MY_QUERY).then((data) => {
      data && navigate("/");
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
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "contained",
      size: "large",
    });
  }, []);

  return authenticated ? (
    <Navigate to="/" />
  ) : 
  (
    <>
      <div className=" App grid h-screen place-items-center justify-center text-lg font-bold border-2 border-solid rounded-sm">
        {" "}
        <div id="signInDiv" className=""></div>
      </div>
    </>
  );
};

export default LoginPage;
