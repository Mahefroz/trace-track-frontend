import { useState } from "react";
import "./SignUpComponent.css";
import {
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const SignUpOtpComp = ({ onSubmit, otp, setOtp, userDetails }) => {
  console.log("Props", onSubmit, otp, setOtp, userDetails);
  const submitHandler = async () => {
    // console.log(hi);
  };

  return (
    <div className="signup-wraper ">
      <div className="signup-card">
        <div align="center">
          <h3 align="center">Trace N Track</h3>
          <FormControl
            size="small"
            sx={{ m: 1, width: "35ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="otp">OTP</InputLabel>
            <OutlinedInput
              id="otp"
              label="OTP"
              placeholder="Enter OTP here"
              onChange={(e) =>
                setOtp({ ...userDetails, ["otp"]: e.target.value })
              }
              value={userDetails.otp}
            />
            {/* {error.otp ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                required
              </FormHelperText>
            ) : (
              ""
            )} */}
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ m: 1, width: "43ch" }}
            //   sx={{ marginTop: "10px", width: "75%" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpOtpComp;

// <div className="opt-wrapper align-items-center d-flex justify-content-center">
//   <div className="d-flex justify-content-center flex-column">
//     <input
//       className="form-control"
//       onChange={(e) => setOtp(e.target.value)}
//       value={otp}
//     />
//     <button className="btn btn-primary" onClick={onSubmit}>
//       Submit
//     </button>
//   </div>
// </div>
