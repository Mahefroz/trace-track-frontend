import "./SignInComp.css";
import { TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import useServices from "../custom-hooks/use-Services";
import loginServices from "../custom-hooks/services/use-loginServices";
import useToken from "../custom-hooks/use-Token";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom/dist";
import AccountCircle from "@mui/icons-material/AccountCircle";

const SignInComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = loginServices();
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

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .min(8, "Must be atleast 8 characters"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    const { email, password } = values;
    setErrorMessage("");

    if (email.length > 0 && password.length > 0) {
      setIsLoading(true);
      console.log("hi");
      try {
        const res = await login({ email: email, password: password });
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
  return (
    <div className="signin-wraper ">
      <div className="signin-card">
        <h3 className="heading">Trace N Track</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form>
              {/* <div className="mb-3"> */}
              <TextField
                htmlFor="email"
                id="column"
                size="small"
                label="Email"
                variant="outlined"
                placeholder="Email Address"
              />
              <TextField
                type={isRevealed ? "text" : "password"}
                htmlFor="password"
                id="column"
                size="small"
                label="Password"
                variant="outlined"
                placeholder="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {isRevealed ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {isLoading ? (
                <button type="submit" className="btn btn-primary form-control">
                  <CircularProgress size={15} color="inherit" />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary form-control">
                  Submit
                </button>
              )}
            </Form>
          )}
        </Formik>
        <div className="m-2">
          <h6>
            Don't have an account?{" "}
            <a
              style={{ cursor: "pointer" }}
              class="link-opacity-10"
              onClick={() => {
                // handleSignup();
                navigate("/signup");
              }}
            >
              Sign up
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
};
export default SignInComp;
