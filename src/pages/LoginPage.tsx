import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request, GraphQLClient } from "graphql-request";
import { Token } from "../utils/utils";
import LogoutPage from "./LogoutPage";

const access_token = Token();
const authenticated =
  access_token !== null && access_token !== undefined && access_token !== "";

const LoginPage = (props: any) => {
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
    // console.log("Encoded JWT token", response.credential);
    const token = response.credential;
    localStorage.setItem("access_token", token);
    // @ts-ignore
    const client = new GraphQLClient(process.env.BACKEND_URL, {
      headers: { Authorization: token },
    });
    await client.request(MY_QUERY).then((data) => {
      data && navigate(props.path);
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
      theme: "outline",
      size: "large",
    });
  }, []);

  return authenticated ? (
    <LogoutPage />
  ) : (
    <div className="App">
      {" "}
      <div id="signInDiv"></div>
    </div>
  );
};

export default LoginPage;
