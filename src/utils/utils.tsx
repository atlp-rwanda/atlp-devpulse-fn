import jwtDecode from "jwt-decode";
export const Token = () => {
  const access_token = localStorage.getItem("access_token");
  //   const user = jwtDecode(access_token);

  const verifyToken = (token: any) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      //@ts-ignore
      console.error("Error", error.message);
    }
  };

  const user = access_token ? verifyToken(access_token) : "";
  //   console.log("user", user);
  return user;
};
