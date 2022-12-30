import jwtDecode from "jwt-decode";
export const Token = () => {
  const access_token = localStorage.getItem("access_token");
  const verifyToken = (token: any) => {
    try {
      const decoded = jwtDecode(token);
      // console.log("decoded", decoded);
      return decoded;
    } catch (error) {
      //@ts-ignore
      console.error("Error", error.message);
    }
  };
  const user = access_token ? verifyToken(access_token) : null;
  return user;
};
