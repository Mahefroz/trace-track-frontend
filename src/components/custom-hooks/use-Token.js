import { useState } from "react";
import Cookies from "js-cookie";

export default function useToken() {
  const [token, setToken] = useState();
  const getToken = () => {
    // const tokenString = sessionStorage.getItem("token");
    const tokenString = Cookies.get("jwtToken");
    console.log("Token in cookie", tokenString);
    // const userToken = JSON.parse(tokenString);
    return tokenString;
  };
  // const saveToken = (userToken) => {
  //   console.log("Token", userToken);
  //   sessionStorage.setItem("token", JSON.stringify(userToken));
  //   setToken(userToken.token);
  // };

  return {
    // setToken: saveToken,
    token,
    getToken,
  };
}
