import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
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
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
// import itLocale from "i18n-iso-countries/langs/it.json";

import { Validate } from "../../utils/validator";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useServices from "../custom-hooks/use-Services";
import "./SignUpComponent.css";

const SignUpDetailsComponent = ({
  step,
  setStep,
  setUserDetails,

  userDetails,
}) => {
  const { signup } = useServices();

  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealedCP, setIsRevealedCP] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");

  const selectCountryHandler = (value) => {
    setError({ ...error, ["country"]: false });
    setValues({ ...values, ["country"]: value });
  };
  // Have to register the languages you want to use
  countries.registerLocale(enLocale);
  // countries.registerLocale(itLocale);

  // Returns an object not a list
  const countryObj = countries.getNames("en");

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    country: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async () => {
    console.log("Values", values, error);
    const validate = {
      fname: false,
      lname: false,
      email: false,
      country: false,
      email: false,
      password: false,
      cpassword: false,
    };

    if (values.fname.length != 0 && error.fname === false) {
      validate.fname = false;
    } else {
      validate.fname = true;
    }
    if (values.lname.length != 0 && error.lname === false) {
      validate.lname = false;
    } else {
      validate.lname = true;
    }
    if (values.country.length != 0 && error.country === false) {
      validate.country = false;
    } else {
      validate.country = true;
      setError({ ...error, ["country"]: true });
    }
    // if (values.country.length != 0 && error.country === false) {
    //   validate.country = false;
    // } else {
    //   validate.country = true;
    // }

    if (values.email.length != 0 && error.email === false) {
      validate.email = false;
    } else {
      validate.email = true;
    }
    if (values.password.length != 0 && error.password === false) {
      validate.password = false;
    } else {
      validate.password = true;
    }
    if (values.cpassword.length != 0 && error.cpassword === false) {
      validate.cpassword = false;
    } else {
      validate.cpassword = true;
    }
    // if (
    //   validate.fname === false &&
    //   validate.lname === false &&
    //   validate.email === false &&
    //   validate.country === false &&
    //   validate.password === false &&
    //   validate.cpassword === false
    // ) {
    setStep(2);
    setUserDetails(values);
    try {
      const res = await signup({
        email: values.email,
        password: values.password,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // navigate("/signin");
    // }
  };

  const [error, setError] = useState({
    fname: false,
    lname: false,
    email: false,
    country: false,
    email: false,
    password: false,
    cpassword: false,
  });
  const handleChange = (prop) => async (event) => {
    let input = event.target.value;
    console.log("change", prop, input.length);

    await setValues({ ...values, [prop]: event.target.value });
    const validate = {
      fname: error.fname,
      lname: error.lname,
      email: error.email,
      // country: error.country,
      email: error.email ? error.email : false,
      password: error.password ? error.password : false,
      cpassword: error.cpassword ? error.cpassword : false,
    };
    if (prop === "fname" && input.length === 0) {
      validate.fname = true;
    } else if (prop === "fname" && error.fname) {
      validate.fname = false;
    }
    if (prop === "lname" && input.length === 0) {
      validate.lname = true;
    } else if (prop === "lname" && error.lname) {
      validate.lname = false;
    }
    if (prop === "email") {
      const tmp = !Validate(event.target.value, { isEmail: true });
      console.log("Email error", tmp);
      validate.email = tmp;
    }
    // if (prop === "country" && input.length === 0) {
    //   validate.country = true;
    // } else if (prop === "country" && error.country) {
    //   validate.country = false;
    // }

    if (prop === "password") {
      const tmp = !Validate(values?.password, { isPassword: true });
      validate.password = tmp;
    }
    if (prop === "cpassword") {
      const tmp = !Validate(values?.cpassword, { isPassword: true });
      validate.cpassword = tmp;
    }
    console.log("validate", validate);

    await setError({
      ...error,
      ...validate,
    });

    // setAge(event.target.value);
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [showcPassword, setShowcPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () =>
    setShowcPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
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
            <InputLabel htmlFor="fname">First Name</InputLabel>
            <OutlinedInput
              id="fname"
              label="firstName"
              onChange={handleChange("fname")}
              error={error.fname}
            />
            {error.fname ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                required
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl
            size="small"
            sx={{ m: 1, width: "35ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="lname">Last Name</InputLabel>
            <OutlinedInput
              id="lname"
              label="lastName"
              onChange={handleChange("lname")}
              error={error.lname}
            />
            {error.lname ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                required
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl
            size="small"
            sx={{ m: 1, width: "35ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              label="Email"
              onChange={handleChange("email")}
              error={error.email}
            />
            {error.email ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                Invalid email
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>

          <FormControl
            size="small"
            sx={{ m: 1, width: "35ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="country">Country</InputLabel>
            <Select
              size="small"
              labelId="tag-settings"
              id="country"
              placeholder="Select Tag Setting for"
              error={error.country}
              // value={tag}
              label="Country"
              value={values.country}
              onChange={(e) => selectCountryHandler(e.target.value)}
              // onChange={handleChange("country")}
            >
              {!!countryArr?.length &&
                countryArr.map(({ label, value }) => (
                  <MenuItem
                    key={value}
                    value={label}
                    sx={{ alignItems: "left" }}
                  >
                    {label}
                  </MenuItem>
                ))}
            </Select>
            {error.country ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                required
              </FormHelperText>
            ) : (
              ""
            )}
            {/* <OutlinedInput
              id="country"
              label="country"
              onChange={handleChange("country")}
              error={error.country}
            />
            {error.country ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                required
              </FormHelperText>
            ) : (
              ""
            )} */}
          </FormControl>

          <FormControl
            size="small"
            sx={{ m: 1, width: "35ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange("password")}
              error={error.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {error.password ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                Invalid password
              </FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl
            size="small"
            sx={{ m: 1, width: "35ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showcPassword ? "text" : "password"}
              onChange={handleChange("cpassword")}
              //   error={error.confirm - password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showcPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            {/* {error.confirmpassword ? (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                Invalid password
              </FormHelperText>
            ) : (
              ""
            )} */}
          </FormControl>

          <div>
            {isLoading ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ m: 1, width: "43ch" }}
                //   sx={{ marginTop: "10px", width: "75%" }}
                // onClick={save}
              >
                <CircularProgress size={15} color="inherit" />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ m: 1, width: "43ch" }}
                //   sx={{ marginTop: "10px", width: "75%" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </div>
          <div className="row">
            <Typography sx={{ fontSize: "12px" }}>
              {" "}
              Already Have an Account?
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                color: "blue !important",
                fontSize: "12px",
              }}
              onClick={() => {
                // handleSignup();
                navigate("/signin");
              }}
            >
              Sign In
            </Typography>
            {/* <h6>
              Don't have an account?{" "}
              <a
                sx={{ cursor: "pointer", color: "blue !important" }}
                class="link-opacity-10"
                onClick={() => {
                  // handleSignup();
                  navigate("/signup");
                }}
              >
                Sign up
              </a>
            </h6> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpDetailsComponent;
