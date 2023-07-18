import "./SignInComp.css";
import React from "react";
import {
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  Typography,
} from "@mui/material";

import { Validate } from "../../utils/validator";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useServices from "../custom-hooks/use-Services";
import useToken from "../custom-hooks/use-Token";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom/dist";
import AccountCircle from "@mui/icons-material/AccountCircle";
const SignInComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useServices();
  const { setToken, getToken } = useToken();
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    // getToken();
    if (getToken() != undefined) {
      navigate("/dashboard");
    }
  }, []);

  //   const validationSchema = Yup.object({
  //     email: Yup.string().email("Invalid Email").required("Email Required"),
  //     password: Yup.string()
  //       .required("Password Required")
  //       .min(8, "Must be atleast 8 characters"),
  //   });

  const handleSubmit = async () => {
    //   const { email, password } = values;
    //   setErrorMessage("");

    if (
      values.email.length > 0 &&
      values.password.length > 0 &&
      error.email === false &&
      error.password === false
    ) {
      setIsLoading(true);
      console.log("hi");
      try {
        const res = await login({
          email: values.email,
          password: values.password,
        });
        console.log("Login Response", res);
        if (res) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const handleChange = (prop) => async (event) => {
    let input = event.target.value;
    console.log("change", prop, input.length);

    await setValues({ ...values, [prop]: event.target.value });
    const validate = {
      password: error.password ? error.password : false,
      email: error.email ? error.email : false,
    };

    if (prop === "email") {
      const tmp = !Validate(event.target.value, { isEmail: true });
      console.log("Email error", tmp);
      validate.email = tmp;
    }
    // if (prop === "password") {
    //   const tmp = !Validate(values?.password, { isPassword: true });
    //   validate.password = tmp;
    // }
    console.log("validate", validate);

    await setError({
      ...error,
      ...validate,
    });

    // setAge(event.target.value);
  };
  return (
    <div className="signin-wraper ">
      <div className="signin-card">
        <div align="center">
          <h3 align="center">Tag N Track</h3>
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
          <div className="forget">
            <Typography sx={{ fontSize: "10px" }}>Forgot Password?</Typography>
          </div>
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
              Don't have an account?{" "}
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                color: "blue !important",
                fontSize: "12px",
              }}
              onClick={() => {
                // handleSignup();
                navigate("/signup");
              }}
            >
              Sign up
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
export default SignInComponent;
