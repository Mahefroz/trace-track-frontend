import React from "react";
import "./TagAssetComp.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { FilledInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import { Typography, TextField, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { useMemo } from "react";
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "google-maps-react";
import { Validate } from "../../utils/validator";
import { position } from "stylis";
import { LocationOn } from "@mui/icons-material";
import WebcamModal from "../modals/WebcamModal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Uploads from "../modals/Uploads";
import BarcodeComp from "../TaggingMethods/BarcodeComp";
import useServices from "../custom-hooks/use-Services";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import swal from "sweetalert";
import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";

import Qr from "../TaggingMethods/Qr";
import { saveAs } from "file-saver";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "grey",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TagAssetComp = () => {
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(1);
  const [name, setName] = useState("");
  const [item, setItem] = useState([1]);
  const [data, setData] = useState([]);
  const [tag, setTag] = useState({ qr: "", bc: "", sn: "", bn: "" });
  const [photos, setPhotos] = useState({ img1: "", img2: "" });
  const [openModal, setOpenModal] = useState(false);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [method, setMethod] = useState(0);
  const [barcode, setBarcode] = useState(false);
  const { addAsset } = useServices();
  const [loading, setLoading] = useState(false);

  const createData = (no, name, desc, location, status, images, photos) => {
    return { no, name, desc, location, status, images, photos };
  };

  const rows = [
    createData(3, "Asset 1", "This is an asset", "1", "1", "1", "1"),
  ];
  const [values, setValues] = useState([
    {
      assetNo: null,
      name: "",
      desc: "",
      status: "",
      lat: null,
      long: null,
    },
  ]);
  const [error, setError] = useState({
    name: false,
    desc: false,
    status: false,
    lat: false,
    long: false,
  });
  const handleCamera = (prop) => async (event) => {};
  const handleChange = (prop) => async (event) => {
    let input = event.target.value;
    console.log("change", prop, input);

    await setValues({ ...values, [prop]: event.target.value });
    const validate = {
      name: error.name,
      desc: error.desc,
      status: error.status,
      lat: error.lat,
      long: error.long,
    };

    if (prop === "name" && input.length === 0) {
      validate.name = true;
    } else if (prop === "name" && input.length === 0) {
      validate.name = false;
    }
    if (prop === "desc" && input.length === 0) {
      validate.desc = true;
    } else if (prop === "desc" && input.length === 0) {
      validate.desc = false;
    }
    if (prop === "status" && input.length === 0) {
      validate.status = true;
    } else if (prop === "status" && input.length === 0) {
      validate.status = false;
    }
    if (prop === "lat" && input.length === 0) {
      validate.lat = true;
    } else if (prop === "lat" && input.length === 0) {
      validate.lat = false;
    }
    if (prop === "long" && input.length === 0) {
      validate.long = true;
    } else if (prop === "long" && input.length === 0) {
      validate.long = false;
    }

    console.log("Validate on change", validate);

    await setError({
      ...error,
      ...validate,
    });

    // setAge(event.target.value);
  };
  const handleAdd = async () => {
    let array = [];
    let len = item.length;
    for (let i = 0; i < len + 1; i++) {
      array.push(1);
    }
    setItem([...item, array]);
    console.log(array);
    await setData([...data, values]);
    await setValues({
      assetNo: null,
      name: "",
      desc: "",
      status: "",
      lat: null,
      long: null,
    });
  };
  const handleSubmit = async (details) => {
    // await setData([...data, values]);
    // let asset_imgs = [];
    // asset_imgs.push([photos.img1]);
    // asset_imgs.push([photos.img2]);

    console.log("Values", details, photos, tag);
    let formData = new FormData();
    console.log("Asset submit", details, values.lat, values.long);
    formData.append("asset_no", 1);
    formData.append("name", details.name);
    formData.append("desc", details.desc);
    formData.append("lat", values.lat);
    formData.append("long", values.long);
    formData.append("method", 1);
    formData.append("status", "active");
    formData.append("img", photos.img1);
    formData.append("img", photos.img2);
    if (method === 1) {
      formData.append("tag", tag.qr);
    } else if (method === 2) {
      formData.append("tag", tag.bc);
      // formData.append("img", [photos.img1, photos.img2]);
    }
    for (let [key, value] of formData.entries()) {
      console.log("Formdata", key, value);
    }

    try {
      if (type === 1) {
        const res = await addAsset(formData);

        if (res.data) {
          setLoading(false);
          await swal(res.msg, "Asset ID:" + res.data.id.toString(), "success");

          console.log(res);
          // navigate("/tagProduct");
        } else {
          setLoading(false);
          await swal("Asset could not be added", res.error, "error");
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
    // const payload = {
    //   asset_no: 1,
    //   name: details.name,
    //   desc: details.desc,
    //   lat: values.lat,
    //   long: values.long,
    //   method: method,
    // };
    // console.log("Payload", payload);
  };

  const getLocation = async () => {
    setError({ ...error, lat: false, long: false });
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setValues({
            ...values,
            ["lat"]: position.coords.latitude,
            ["long"]: position.coords.longitude,
          });

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
  // const handleClose = async () => {};

  return (
    <>
      <WebcamModal
        open={openModal}
        onUpload={async (newImages) => {
          console.log("Uploaded", newImages);
          await setPhotos(newImages);
          setOpenModal(false);
        }}
        onClose={() => {
          setOpenModal(false);
          // console.log("Images", images);
        }}
      />
      <Uploads
        open={openImgModal}
        data={photos}
        onClose={() => {
          setOpenImgModal(false);
          // console.log("Images", images);
        }}
      />
      <div className="main-container">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ fontSize: 12, marginTop: 0 }}
        >
          <Link underline="hover" color="inherit">
            Trace N Track
          </Link>
          <Link underline="hover" color="inherit">
            Tag
          </Link>
          <Link
            underline="hover"
            color="primary"
            aria-current="page"
            href="/tagAsset"
          >
            Tag Asset
          </Link>
        </Breadcrumbs>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", top: "50%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {type === 1 ? (
              <>
                <div className="data">
                  <div className="field">
                    <FormControl sx={{ minWidth: 250 }}>
                      <InputLabel id="type" size="small">
                        Asset Type
                      </InputLabel>
                      <Select
                        size="small"
                        sx={{ backgroundColor: "white" }}
                        labelId="type"
                        id="type-list"
                        value={type}
                        label="type"
                        // value={type}
                        onChange={async (e) => {
                          await setType(e.target.value);
                        }}
                        // error={error.business}
                        // helperText={error.business ? "required" : ""}
                      >
                        <MenuItem value={1}>Asset</MenuItem>
                        <MenuItem value={2}>Business Asset</MenuItem>
                      </Select>
                      {/* {error.business ? (
          <FormHelperText sx={{ color: "#d32f2f" }}>required</FormHelperText>
        ) : (
          ""
        )} */}
                    </FormControl>
                  </div>
                  <div className="field">
                    <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel id="method" size="small">
                        Tagging Method
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="method"
                        id="method-list"
                        // value={age}
                        label="method"
                        value={method}
                        onChange={(e) => {
                          setMethod(e.target.value);
                        }}
                        // error={error.name}
                        // helperText={error.name ? "required" : ""}
                      >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>QR</MenuItem>
                        <MenuItem value={2}>Barcode</MenuItem>
                        <MenuItem value={3}>Serial Number</MenuItem>
                        <MenuItem value={4}>Batch Number</MenuItem>
                      </Select>
                      {/* {error.business ? (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  required
                </FormHelperText>
              ) : (
                ""
              )} */}
                    </FormControl>
                  </div>
                </div>
                <div className="section">
                  <div className="heading">
                    <img
                      src="./personal-information.png"
                      height={20}
                      width={20}
                    />
                    <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Asset Details
                    </Typography>
                  </div>
                </div>

                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                  <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Asset No</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Location
                        </StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">
                          Add Photo
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          View Uploads
                        </StyledTableCell>
                        {method !== 0 && (
                          <StyledTableCell align="center">Tag</StyledTableCell>
                        )}
                        {method !== 0 && method !== 2 ? (
                          <StyledTableCell align="center">
                            View Tag
                          </StyledTableCell>
                        ) : (
                          ""
                        )}

                        <StyledTableCell>Submit</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.no}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.desc}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <TextField
                              id="outlined-basic"
                              size="small"
                              label="Location"
                              variant="outlined"
                              disabled
                              // placeholder="Location"
                              sx={{ width: 100 }}
                              // error={error.desc}
                              // value={data[index].lat}
                              value={
                                values.lat && values.long
                                  ? values.lat.toFixed(2) +
                                    " " +
                                    values.long.toFixed(2)
                                  : ""
                              }
                              onChange={getLocation}
                              // helperText={error.desc ? "desc should be 13 digits" : ""}
                            />
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={getLocation}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              <LocationOn />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/* {row.status} */}
                            <FormControl sx={{ width: 100 }}>
                              <InputLabel id="status" size="small">
                                Status
                              </InputLabel>
                              <Select
                                size="small"
                                labelId="status"
                                id="statuses"
                                // value={age}

                                label="Status"
                                // value={values.status}
                                onChange={handleChange("status")}
                                // error={error.status}
                                // helperText={error.business ? "required" : ""}
                              >
                                <MenuItem value={"active"}>Active</MenuItem>
                                <MenuItem value={"inactive"}>
                                  In-active
                                </MenuItem>
                              </Select>
                              {/* {error.status ? (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    required
                  </FormHelperText>
                ) : (
                  ""
                )} */}
                            </FormControl>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/* {row.images} */}
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                marginLeft: "10px",
                                marginRight: "5px",
                              }}
                              onClick={() => {
                                setOpenModal(true);
                              }}
                            >
                              Take Photo
                            </Button>
                            {photos.img1 !== "" && photos.img2 !== "" ? (
                              <img src="check.png" height={20} width={20} />
                            ) : (
                              ""
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/* {row.photos} */}
                            <Button
                              variant="contained"
                              // color="#bbdefb"
                              size="small"
                              sx={{
                                marginLeft: "10px",
                                backgroundColor: "#bbdefb",
                              }}
                              onClick={() => {
                                setOpenImgModal(true);
                              }}
                            >
                              View Photos
                            </Button>
                          </StyledTableCell>
                          {method === 1 ? (
                            <StyledTableCell>
                              <Qr
                                data={rows}
                                onUpload={async (img) => {
                                  setTag({ ...tag, qr: img });
                                }}
                                page="asset"
                              />
                            </StyledTableCell>
                          ) : method === 2 ? (
                            <div>
                              {!barcode && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  sx={{ marginTop: "20px" }}
                                  onClick={() => {
                                    setBarcode(true);
                                  }}
                                >
                                  Generate
                                </Button>
                              )}
                              {
                                barcode && (
                                  <BarcodeComp
                                    data={data}
                                    product="product1"
                                    link="http://localhost:5173"
                                    onUpload={async (img) => {
                                      console.log(
                                        "Barcode image",
                                        img.current.src
                                      );
                                      setTag({ ...tag, bc: img.current.src });
                                    }}
                                  />
                                )
                                // <img src={tag.bc} />
                              }
                            </div>
                          ) : (
                            ""
                          )}
                          {method !== 0 && method !== 2 && (
                            <StyledTableCell>
                              {tag.qr !== "" && (
                                <img src={tag.qr} height={30} width={30} />
                              )}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>
                            {" "}
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => {
                                console.log("Type 1 submit");
                                setLoading(true);
                                handleSubmit(row);
                              }}
                            >
                              Submit
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <>
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel id="type" size="small">
                    Asset Type
                  </InputLabel>
                  <Select
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    labelId="type"
                    id="type-list"
                    value={type}
                    label="type"
                    // value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    // error={error.business}
                    // helperText={error.business ? "required" : ""}
                  >
                    <MenuItem value={1}>Asset</MenuItem>
                    <MenuItem value={2}>Business Asset</MenuItem>
                  </Select>
                  {/* {error.business ? (
          <FormHelperText sx={{ color: "#d32f2f" }}>required</FormHelperText>
        ) : (
          ""
        )} */}
                </FormControl>
                <div className="section">
                  <div className="heading">
                    <img
                      src="./verified.png"
                      height={25}
                      width={25}
                      sx={{ padding: "10px" }}
                    />
                    <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Select Business
                    </Typography>
                  </div>
                </div>
                <div className="data">
                  <div className="field">
                    <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
                      <InputLabel id="name" size="small">
                        Business Name
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="name"
                        id="name-list"
                        // value={age}
                        label="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          console.log("Business name", e.target.value);
                        }}
                        // error={error.name}
                        // helperText={error.name ? "required" : ""}
                      >
                        <MenuItem value={"Business 1"}>Business 1</MenuItem>
                        <MenuItem value={"Business 2"}>Business 2</MenuItem>
                        <MenuItem value={"Business 3"}>Business 3</MenuItem>
                      </Select>
                      {/* {error.business ? (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  required
                </FormHelperText>
              ) : (
                ""
              )} */}
                    </FormControl>
                  </div>
                  <div className="field">
                    <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
                      <InputLabel id="method" size="small">
                        Tagging Method
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="method"
                        id="method-list"
                        // value={age}
                        label="method"
                        value={method}
                        onChange={(e) => {
                          setMethod(e.target.value);
                        }}
                        // error={error.name}
                        // helperText={error.name ? "required" : ""}
                      >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>QR</MenuItem>
                        <MenuItem value={2}>Barcode</MenuItem>
                        <MenuItem value={3}>Serial Number</MenuItem>
                        <MenuItem value={4}>Batch Number</MenuItem>
                      </Select>
                      {/* {error.business ? (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  required
                </FormHelperText>
              ) : (
                ""
              )} */}
                    </FormControl>
                  </div>
                </div>
                <div className="section">
                  <div className="heading">
                    <img
                      src="./personal-information.png"
                      height={20}
                      width={20}
                    />
                    <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                      Asset Details
                    </Typography>
                  </div>
                </div>

                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                  <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Asset No</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Location
                        </StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">
                          Add Photo
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          View Uploads
                        </StyledTableCell>
                        {method !== 0 && (
                          <StyledTableCell align="center">Tag</StyledTableCell>
                        )}
                        {method !== 0 && method !== 2 ? (
                          <StyledTableCell align="center">
                            View Tag
                          </StyledTableCell>
                        ) : (
                          ""
                        )}
                        <StyledTableCell>Submit</StyledTableCell>
                        {/* {method === 1 ||
                  method === 3 ||
                  (method === 4 && (
                    <StyledTableCell align="center">View Tag</StyledTableCell>
                  ))} */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.no}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.desc}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <TextField
                              id="outlined-basic"
                              size="small"
                              label="Location"
                              variant="outlined"
                              disabled
                              // placeholder="Location"
                              sx={{ width: 100 }}
                              // error={error.desc}
                              // value={data[index].lat}
                              value={
                                values.lat && values.long
                                  ? values.lat.toFixed(2) +
                                    " " +
                                    values.long.toFixed(2)
                                  : ""
                              }
                              onChange={getLocation}
                              // helperText={error.desc ? "desc should be 13 digits" : ""}
                            />
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={getLocation}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              <LocationOn />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/* {row.status} */}
                            <FormControl sx={{ width: 100 }}>
                              <InputLabel id="status" size="small">
                                Status
                              </InputLabel>
                              <Select
                                size="small"
                                labelId="status"
                                id="statuses"
                                // value={age}

                                label="Status"
                                // value={values.status}
                                onChange={handleChange("status")}
                                // error={error.status}
                                // helperText={error.business ? "required" : ""}
                              >
                                <MenuItem value={"active"}>Active</MenuItem>
                                <MenuItem value={"inactive"}>
                                  In-active
                                </MenuItem>
                              </Select>
                              {/* {error.status ? (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    required
                  </FormHelperText>
                ) : (
                  ""
                )} */}
                            </FormControl>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/* {row.images} */}
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{
                                marginLeft: "10px",
                                marginRight: "5px",
                              }}
                              onClick={() => {
                                setOpenModal(true);
                              }}
                            >
                              Take Photo
                            </Button>
                            {photos.img1 !== "" && photos.img2 !== "" ? (
                              <img src="check.png" height={20} width={20} />
                            ) : (
                              ""
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/* {row.photos} */}
                            <Button
                              variant="contained"
                              // color="#bbdefb"
                              size="small"
                              sx={{
                                marginLeft: "10px",
                                backgroundColor: "#bbdefb",
                              }}
                              onClick={() => {
                                setOpenImgModal(true);
                              }}
                            >
                              View Photos
                            </Button>
                          </StyledTableCell>
                          {method === 1 ? (
                            <StyledTableCell>
                              <Qr
                                data={rows}
                                onUpload={async (img) => {
                                  setTag({ ...tag, qr: img });
                                }}
                                page="asset"
                              />
                            </StyledTableCell>
                          ) : method === 2 ? (
                            <div>
                              {!barcode && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  sx={{ marginTop: "20px" }}
                                  onClick={() => {
                                    setBarcode(true);
                                  }}
                                >
                                  Generate
                                </Button>
                              )}
                              {
                                barcode && (
                                  <BarcodeComp
                                    data={data}
                                    product="product1"
                                    link="http://localhost:5173"
                                    onUpload={async (img) => {
                                      console.log(
                                        "Barcode image",
                                        img.current.src
                                      );
                                      setTag({ ...tag, bc: img.current.src });
                                    }}
                                  />
                                )
                                // <img src={tag.bc} />
                              }
                            </div>
                          ) : (
                            ""
                          )}
                          {method !== 0 && method !== 2 && (
                            <StyledTableCell>
                              {tag.qr !== "" && (
                                <img src={tag.qr} height={30} width={30} />
                              )}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>
                            {" "}
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => {
                                setLoading(true);
                                handleSubmit(row);
                                // setBarcode(true);
                              }}
                            >
                              Submit
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        )}
      </div>
    </>
  );
};

export default TagAssetComp;

// {
//   item.map((row, index) => (
//     <div className="list">
//       <TextField
//         size="small"
//         id="outlined-basic"
//         label="no"
//         variant="outlined"
//         placeholder="Asset no"
//         value={index}
//         sx={{ width: "60px" }}
//         disabled
//       />
//       <TextField
//         id="outlined-basic"
//         size="small"
//         label="Name"
//         variant="outlined"
//         placeholder="Asset Name"
//         value={values.name}
//         sx={{ minWidth: 100, marginLeft: "10px" }}
//       />
//       <TextField
//         id="outlined-basic"
//         size="small"
//         label="Desc"
//         variant="outlined"
//         placeholder="Description"
//         sx={{ minWidth: 100, marginLeft: "10px" }}
//         // value={values.desc}
//         // onChange={handleChange("desc")}
//         // helperText={error.desc ? "desc should be 13 digits" : ""}
//       />

//       {/* <div className="elem">
//             <TextField
//               id="outlined-basic"
//               size="small"
//               label="Name"
//               variant="outlined"
//               placeholder="Asset Name"
//               value={values.name}
//               sx={{ minWidth: 100 }}
//             />
//           </div>
//           <div className="elem">
//             <TextField
//               id="outlined-basic"
//               size="small"
//               label="Desc"
//               variant="outlined"
//               placeholder="Description"
//               sx={{ minWidth: 100 }}
//               // value={values.desc}
//               // onChange={handleChange("desc")}
//               // helperText={error.desc ? "desc should be 13 digits" : ""}
//             />
//           </div> */}
//       <div className="elem">
//         <TextField
//           id="outlined-basic"
//           size="small"
//           label="Location"
//           variant="outlined"
//           disabled
//           // placeholder="Location"
//           sx={{ minWidth: 100, marginLeft: "10px" }}
//           // error={error.desc}
//           // value={data[index].lat}
//           value={
//             values.lat && values.long
//               ? values.lat.toFixed(2) + " " + values.long.toFixed(2)
//               : ""
//           }
//           onChange={getLocation}
//           // helperText={error.desc ? "desc should be 13 digits" : ""}
//         />
//         <IconButton
//           aria-label="toggle password visibility"
//           onClick={getLocation}
//           // onMouseDown={handleMouseDownPassword}
//           edge="end"
//         >
//           <LocationOn />
//         </IconButton>
//       </div>
//       <div sx={{ width: "10%" }}>
//         <FormControl sx={{ width: 100, marginLeft: "10px" }}>
//           <InputLabel id="status" size="small">
//             Status
//           </InputLabel>
//           <Select
//             size="small"
//             labelId="status"
//             id="statuses"
//             // value={age}

//             label="Status"
//             // value={values.status}
//             onChange={handleChange("status")}
//             // error={error.status}
//             // helperText={error.business ? "required" : ""}
//           >
//             <MenuItem value={"active"}>Active</MenuItem>
//             <MenuItem value={"inactive"}>In-active</MenuItem>
//           </Select>
//           {/* {error.status ? (
//                 <FormHelperText sx={{ color: "#d32f2f" }}>
//                   required
//                 </FormHelperText>
//               ) : (
//                 ""
//               )} */}
//         </FormControl>
//       </div>

//       <Button
//         variant="contained"
//         color="secondary"
//         size="small"
//         sx={{
//           marginLeft: "10px",
//         }}
//         onClick={() => {
//           setOpenModal(true);
//         }}
//       >
//         Take Photo
//       </Button>
//     </div>
//   ));
// }
