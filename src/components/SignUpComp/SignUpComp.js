import "./SignUpComp.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom/dist";

import useServices from "../custom-hooks/use-Services";
// import SignUpDetailsComp from "./SignUpDetailsComp";
import SignUpDetailsComponent from "./SignUpDetailsComponent";
import SignUpOtpComp from "./SignUpOtpComp";

const SignUpComp = ({ color }) => {
  console.log("Color", color);
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { signup, verifyOtp } = useServices();

  // const add = async () => {
  //   try {
  //     const res = await signup({
  //       email: userDetails.email,
  //       password: userDetails.password,
  //     });

  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   navigate("/signin");
  // };
  const onSubmit = async () => {
    try {
      console.log("In verify otp", userDetails, otp);

      const res = await verifyOtp(otp);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // navigate("/signin");
  };

  const switchStep = () => {
    switch (step) {
      case 1:
        return (
          <SignUpDetailsComponent
            setStep={setStep}
            step={step}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        );
      case 2:
        return (
          <SignUpOtpComp
            setStep={setStep}
            step={step}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            onSubmit={onSubmit}
            otp={otp}
            setOtp={setOtp}
          />
        );
    }
  };

  return (
    <div>{switchStep()}</div>
    // <div className="signup-wraper">
    //   <div className="m-auto  items-center flex align-items-center justify-content-center  col-8  p-6  ">
    //     <div className="mx-auto flex align-items-center justify-content-center  col-8  text-black bg-light p-2 rounded">
    //       <h3 className="text-center p-2 ">Trace N Track</h3>
    //       <div>{switchStep()}</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SignUpComp;
