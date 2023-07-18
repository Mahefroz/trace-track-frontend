import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpDetailsComp = ({ step, setStep, setUserDetails, userDetails }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealedCP, setIsRevealedCP] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    uname: "",
    fname: "",
    email: "",
    password: "",
    cpassword: "",
    city: "",
    state: "",
    address: "",
    phoneno: "",
  };

  const validationSchema = Yup.object({
    uname: Yup.string().required("User Name Required"),
    fname: Yup.string().required("Name Required"),
    email: Yup.string().email("Invalid Email").required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .min(8, "Must be atleast 8 characters"),
    cpassword: Yup.string()
      .required("Confirm Password Required")
      .min(8, "Must be atleast 8 characters")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    city: Yup.string().required("City Name Required"),
    state: Yup.string().required("State Required"),
    address: Yup.string().required("Address Name Required"),
    phoneno: Yup.string().required("Phone no Required"),
  });

  const onSubmit = async (values) => {
    console.log("h");
    setStep(2);
    setUserDetails(values);
    // try {
    //   console.log("hi", values);
    //   const res = await signup(values);
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
    // navigate("/signin");
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            <div>
              <div className="row  items-center  mx-auto ">
                <div className="mb-3 col-6 col-sm-6">
                  <label htmlFor="fname" className="form-label">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="fname"
                    name="fname"
                  />
                  <ErrorMessage
                    name="fname"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="mb-3 col-6 col-sm-6">
                  <label htmlFor="uname" className="form-label">
                    Username
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="uname"
                    name="uname"
                  />
                  <ErrorMessage
                    name="uname"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="mb-3 col-6 col-sm-6">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                  />
                  <ErrorMessage
                    name="city"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="mb-3 col-6 col-sm-6">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                  />
                  <ErrorMessage
                    name="state"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="mb-3 col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <Field
                    type="address"
                    className="form-control"
                    id="address"
                    name="address"
                  />
                  <ErrorMessage
                    name="address"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="mb-3 col-6 col-sm-6">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="mb-3 col-6 col-sm-6">
                  <label htmlFor="phoneno" className="form-label">
                    Phone no
                  </label>
                  <Field
                    type="phoneno"
                    className="form-control"
                    id="phoneno"
                    name="phoneno"
                  />
                  <ErrorMessage
                    name="phoneno"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="mb-3 col-6 col-sm-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="d-flex" style={{ position: "relative" }}>
                    <Field
                      type={isRevealed ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      // onChange={() => setErrorMessage("")}
                    />
                    {isRevealed ? (
                      <img
                        src="/eye-off.svg"
                        style={{
                          position: "absolute",
                          right: "7px",
                          top: "18%",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsRevealed((state) => !state)}
                      />
                    ) : (
                      <img
                        src="/eye.svg"
                        style={{
                          position: "absolute",
                          right: "7px",
                          top: "18%",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsRevealed((state) => !state)}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="mb-3 col-6 col-sm-6">
                  <label htmlFor="cpassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="d-flex" style={{ position: "relative" }}>
                    <Field
                      type={isRevealedCP ? "text" : "password"}
                      className="form-control"
                      id="cpassword"
                      name="cpassword"
                      // onChange={() => setErrorMessage("")}
                    />
                    {isRevealedCP ? (
                      <img
                        src="/eye-off.svg"
                        style={{
                          position: "absolute",
                          right: "7px",
                          top: "18%",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsRevealedCP((state) => !state)}
                      />
                    ) : (
                      <img
                        src="/eye.svg"
                        style={{
                          position: "absolute",
                          right: "7px",
                          top: "18%",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsRevealedCP((state) => !state)}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name="cpassword"
                    component="span"
                    className="error-text"
                  />
                </div>

                <div className="col-12 p-2">
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                  >
                    Submit
                  </button>
                </div>
                <div className="m-1 ps-1">
                  <h6>
                    Already have an account?{" "}
                    <a
                      style={{ cursor: "pointer" }}
                      class="link-opacity-10"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Sign in
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpDetailsComp;
