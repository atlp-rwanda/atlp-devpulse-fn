import React, { useContext, useEffect, useState } from "react";
import { loginAction } from "../redux/actions/login_action";

import { request, GraphQLClient } from "graphql-request";
import { connect } from "react-redux";
import { Token } from "../utils/utils";
const access_token = Token();
const LoginPage = (props: any) => {
  // console.log("Props", props);
  const [user, setUser] = useState({});
  const [idToken, setIdToken] = useState();
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

    console.log("token", token);

    //@ts-ignore
    setIdToken(response.credential);
    // @ts-ignore
    const client = new GraphQLClient(process.env.BACKEND_URL, {
      headers: { Authorization: token },
    });
    await client.request(MY_QUERY).then((data) => {
      console.log("data", data);
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
      // Text: "Login with Google",
    });

    // props.loginUser();
    props.loginAction();
  }, [access_token]);

  const { name, picture, email }: any = user;

  return (
    <div className="App">
      {access_token !== null &&
      access_token !== undefined &&
      access_token !== "" ? (
        <div className="Logout">
          <button>Logout</button>
        </div>
      ) : (
        <div id="signInDiv">Login with Google</div>
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

// export default LoginPage;
