import React, { useContext, useEffect, useState } from "react";
import { loginAction } from "../redux/actions/login_action";
import { Navigate, useNavigate } from "react-router-dom";
import { request, GraphQLClient } from "graphql-request";
import { connect } from "react-redux";
import { Token } from "../utils/utils";
const access_token = Token();
const LoginPage = (props: any) => {
  // console.log("Props", props);
  const [user, setUser] = useState("");
  const [idToken, setIdToken] = useState();
  const CLIENT_ID = process.env.CLIENT_ID;
  console.log("User from logout", user);
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

    console.log("token", token);

    //@ts-ignore
    setIdToken(response.credential);
    // @ts-ignore
    const client = new GraphQLClient(process.env.BACKEND_URL, {
      headers: { Authorization: token },
    });
    await client.request(MY_QUERY).then((data) => {
      console.log("data", data);
      <Navigate to="/" />;
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

    props.loginAction();
  }, [user]);

  const authenticated =
    access_token !== null && access_token !== undefined && access_token !== "";

  const handleLogout = async () => {
    await localStorage.removeItem("access_token");
    // localStorage.clear()
    console.log("Logout");
    setUser("Logout");
    <Navigate to="/login" />;
  };

  return (
    <div className="App">
      {authenticated ? (
        <div className="Logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div id="signInDiv"></div>
      )}
    </div>
  );
};

const mapState = (state: any) => ({
  LoggedUser: state.loginReducer,
});

export default connect(mapState, {
  loginAction,
})(LoginPage);
