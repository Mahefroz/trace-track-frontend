// import SignInComp from "../components/SignInComp/SignInComp";
import SignInComponent from "../components/SignInComp/SignInComponent";
// import useToken from "../../services/useToken";
// import { useEffect } from "react";

const SignIn = () => {
  // const { setToken, getToken } = useToken();
  // useEffect(() => {
  //   getToken();
  //   // console.log(getToken);
  // }, []);

  return (
    <div
      style={{ backgroundImage: `url("/track.jpg")`, backgroundSize: "cover" }}
    >
      <SignInComponent />
    </div>
  );
};

export default SignIn;
