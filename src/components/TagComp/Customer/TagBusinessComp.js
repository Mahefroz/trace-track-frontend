import React from "react";
import "./TagBusinessComp.css";
import { useEffect, useState, useMemo } from "react";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Typography,
  TextField,
  Button,
  Box,
  Breadcrumbs,
  Snackbar,
} from "@mui/material";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { GoogleMap, useLoadScript, Marker } from "google-maps-react";
import { Validate } from "../../../utils/validator";
import { position } from "stylis";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import MuiAlert from "@mui/material/Alert";
import swal from "sweetalert";
import useBusinessServices from "../.././custom-hooks/services/use-BusinessServices";
import useLocationServices from "../.././custom-hooks/services/use-LocationServices";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const TagBusinessComp = () => {
  const { allBusinessTypes } = useBusinessServices();
  const { addLocation } = useLocationServices();
  const [businessType, setBusinessType] = useState([]);
  const [open, setOpen] = useState(false);
  const [resp, setResp] = useState({ success: "", error: "" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: "",
  //   });
  const Map = () => {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return (
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        <Marker position={center} />
      </GoogleMap>
    );
  };
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [pos, setPos] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    type: null,
    businessName: "",
    name: "",
    cnic: "",
    pno: "",
    email: "",
    lat: lat,
    long: lng,
  });
  const [error, setError] = useState({
    type: false,
    businessName: false,
    name: false,
    cnic: false,
    pno: false,
    email: false,
    lat: false,
    long: false,
  });
  const getAllBusinessTypes = async () => {
    const result = await allBusinessTypes();
    setBusinessType(result.data);
    console.log("All Business types", result);
  };
  useEffect(() => {
    getAllBusinessTypes();
  }, []);
  const getLocation = async () => {
    await setError({ ...error, lat: false, long: false });
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await setStatus(null);
          await setValues({
            ...values,
            ["lat"]: position.coords.latitude,
            ["long"]: position.coords.longitude,
          });

          //   setLat(position.coords.latitude);
          //   setLng(position.coords.longitude);
          setPos(position);
          console.log(
            "Lat",
            position.coords.latitude,
            "Long",
            position.coords.longitude,
            "Position",
            position
          );
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  const validate = (prop) => {
    if (prop === "cnic" && values.cnic.length != 12) {
      setError({ ...error, [prop]: true });
    } else {
      setError({ ...error, [prop]: false });
      // }
    }
  };

  const handleChange = (prop) => async (event) => {
    let input = event.target.value;
    console.log("change", prop, input.length);

    await setValues({ ...values, [prop]: event.target.value });
    const validate = {
      type: error.type,
      businessName: error.businessName,
      name: error.name,
      cnic: error.cnic,
      pno: error.pno,
      email: error.email ? error.email : false,
      lat: error.lat,
      long: error.long,
    };

    if (prop === "type") {
      validate.type = false;
    }

    if (prop === "businessName" && input.length === 0) {
      validate.businessName = false;
    } else if (prop === "businessName" && error.businessName) {
      validate.businessName = false;
    }

    if (prop === "name" && input.length === 0) {
      validate.name = true;
    } else if (prop === "name" && error.name) {
      validate.name = false;
    }

    if (prop === "cnic" && input.length != 13) {
      validate.cnic = true;
    } else if (prop === "cnic" && error.cnic) {
      validate.cnic = false;
    }
    if (prop === "pno" && input.length != 11) {
      validate.pno = true;
    } else if (prop === "pno" && error.pno) {
      validate.pno = false;
    }
    if (prop === "email") {
      const tmp = !Validate(event.target.value, { isEmail: true });
      console.log("Email error", tmp);
      validate.email = tmp;
    }
    console.log("Validate on change", validate);

    await setError({
      ...error,
      ...validate,
    });

    // setAge(event.target.value);
  };
  console.log("Error", error);

  const handleSubmit = async () => {
    console.log("Values", values);
    console.log("Error", error);
    const validate = {
      type: false,
      businessName: false,
      name: false,
      cnic: false,
      pno: false,
      email: false,
      lat: false,
      long: false,
    };
    if (values.type.length === 0 || values.type === null) {
      validate.type = true;
    } else {
      validate.type = false;
    }
    if (values.businessName.length === 0 || values.businessName === null) {
      validate.businessName = true;
    } else {
      validate.businessName = false;
    }

    if (values.lat === null || values.lat.length === 0) {
      validate.lat = true;
    } else {
      validate.lat = false;
    }
    if (values.long === null) {
      validate.long = true;
    } else {
      validate.long = false;
    }
    if (values.name.length != 0 && error.name === false) {
      validate.name = false;
    } else {
      validate.name = true;
    }
    if (values.cnic.length != 0 && error.cnic === false) {
      validate.cnic = false;
    } else {
      validate.cnic = true;
    }
    if (values.pno.length != 0 && error.pno === false) {
      validate.pno = false;
    } else {
      validate.pno = true;
    }
    if (values.email.length != 0 && error.email === false) {
      validate.email = false;
    } else {
      validate.email = true;
    }

    // console.log("Validate on submit", validate);
    if (
      validate.type === false &&
      validate.businessName === false &&
      validate.lat === false &&
      validate.long === false &&
      validate.name === false &&
      validate.cnic === false &&
      validate.pno === false &&
      validate.email === false
    ) {
      console.log("Submit");
      try {
        const payload = {
          cnic: values.cnic,
          ownerName: values.name,
          pno: values.pno,
          email: values.email,
          business: [
            {
              businessCategory: values.type,
              businessName: values.businessName,
              location: {
                latitude: values.lat,
                longitude: values.long,
              },
            },
          ],
        };
        const res = await addLocation(payload);
        console.log("Api Response", res);
        setOpen(true);
        if (res.data) {
          setLoading(false);
          setResp({ success: res.msg, error: "" });

          // await swal(
          //   res.msg,
          //   "Business Location ID:" + " " + res.data.id.toString(),
          //   "success"
          // );
        } else {
          setLoading(false);
          setResp({ success: "", error: res.error });
          // await swal("Error", res.msg, "error");
        }
        // navigate("/dashboard");
      } catch (err) {
        console.log("Error", err);
      }
    } else {
      // setError({ ...error, ...validate });
      console.log("Invalid");
    }
    await setError({ ...error, ...validate });
    // setError({ ...error, name: true });
  };
  // console.log("Values", values);
  console.log("Error", error);
  return (
    <div className="main-container">
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: 12, marginTop: 0 }}>
        <Link underline="hover" color="inherit">
          Trace N Track
        </Link>
        <Link underline="hover" color="inherit">
          Tag
        </Link>
        <Link underline="hover" color="inherit">
          Tag Customer Location
        </Link>
        <Link
          underline="hover"
          color="primary"
          aria-current="page"
          href="/tagBusiness"
        >
          Add Customer
        </Link>
      </Breadcrumbs>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", top: "50%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="section">
            <div className="heading">
              <img src="./verified.png" height={20} width={20} />
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  //  fontSize: 20, marginTop: "20px"
                }}
              >
                Customer Information
              </Typography>
            </div>
            <div className="data">
              <div className="field">
                {/* <Typography className="ml-1">Business / Company</Typography> */}
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="business" size="small">
                    Customer Category
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="customer"
                    id="customer-list"
                    // value={age}
                    label="Customer Category"
                    value={values.customer}
                    onChange={handleChange("type")}
                    error={error.customer}
                    // helperText={error.business ? "required" : ""}
                  >
                    {businessType.map((row) => {
                      return <MenuItem value={row.id}>{row.category}</MenuItem>;
                    })}
                  </Select>
                  {error.business ? (
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      required
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </div>

              <div className="field">
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Company Name"
                  sx={{
                    cursor: "pointer",
                  }}
                  onChange={handleChange("businessName")}
                />
                {/* <Typography className="ml-1">Business / Company Type</Typography> */}
                {/* <FormControl
                  sx={{ minWidth: 120, marginTop: 1, marginLeft: "5px" }}
                >
                  <InputLabel id="type" size="small">
                    Company Type
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="type"
                    id="type-list"
                    // helperText="required"
                    // value={age}
                    value={values.type}
                    label="Types"
                    error={error.type}
                    onChange={handleChange("type")}
                  >
                    <MenuItem value={10}>Type 1</MenuItem>
                    <MenuItem value={20}>Type 2</MenuItem>
                    <MenuItem value={30}>Type 3</MenuItem>
                  </Select>
                  {error.type ? (
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      required
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl> */}
              </div>
            </div>
          </div>

          <div className="section">
            <div className="heading">
              <img src="./personal-information.png" height={20} width={20} />
              <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                Owner / Customer Details
              </Typography>
            </div>

            <div className="data">
              <div className="field">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Name"
                  variant="outlined"
                  value={values.name}
                  sx={{ minWidth: 300 }}
                  onChange={handleChange("name")}
                  error={error.name}
                  helperText={error.name ? "Name is required" : ""}
                />
              </div>
              <div className="field">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="CNIC"
                  variant="outlined"
                  sx={{ marginLeft: "10px", minWidth: 300 }}
                  error={error.cnic}
                  value={values.cnic}
                  onChange={handleChange("cnic")}
                  helperText={error.cnic ? "CNIC should be 13 digits" : ""}
                />
              </div>
            </div>
            <div className="data">
              <div className="field">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Phone No"
                  variant="outlined"
                  sx={{ minWidth: 300 }}
                  value={values.pno}
                  onChange={handleChange("pno")}
                  error={error.pno}
                  helperText={error.pno ? "Invalid phone no" : ""}
                />
              </div>
              <div className="field">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Email"
                  variant="outlined"
                  sx={{ marginLeft: "10px", minWidth: 300 }}
                  value={values.email}
                  onChange={handleChange("email")}
                  error={error.email}
                  helperText={error.email ? "Invalid email" : ""}
                />
              </div>
            </div>
          </div>
          <div className="section">
            <div className="heading">
              <img src="./placeholder.png" height={20} width={20} />
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  //  fontSize: 20, marginTop: "20px"
                }}
              >
                Location
              </Typography>
            </div>

            <div className="data">
              <div className="field">
                <TextField
                  id="outlined-basic"
                  // label="Latitude"
                  sx={{ color: "black" }}
                  disabled
                  value={`${values.lat}  lat`}
                  defaultValue={lat}
                  variant="outlined"
                  size="small"
                  onChange={handleChange("lat")}
                  error={error.lat}
                  helperText={error.lat ? "Select Location" : ""}
                />
              </div>
              <div className="field">
                <TextField
                  id="outlined-basic"
                  // label="Longitude"
                  value={`${values.long}  lng`}
                  variant="outlined"
                  disabled
                  sx={{ marginLeft: "10px" }}
                  size="small"
                  onChange={handleChange("long")}
                  error={error.long}
                  helperText={error.long ? "Select Location" : ""}
                />
              </div>
            </div>
            <div className="data">
              <Button
                variant="contained"
                color="info"
                sx={{
                  //   backgroundColor: "#74a16f",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}
                onClick={getLocation}
              >
                Get Location
              </Button>
            </div>
            <div className="submit">
              <Button
                variant="contained"
                color="success"
                sx={{
                  //   backgroundColor: "blue",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}
                onClick={() => {
                  // setLoading(true);
                  handleSubmit();
                }}
                // onClick={getLocation}
              >
                Submit
              </Button>
            </div>
            {/* {!isLoaded ? <div>Loading...</div> : <Map />} */}
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            {resp.success.length !== 0 ? (
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {resp.success}
              </Alert>
            ) : (
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {resp.error}
              </Alert>
            )}
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default TagBusinessComp;
