import React from "react";
import "./TagAssetComp.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
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
import { Validate } from "../../../utils/validator";
import { position } from "stylis";
import useServices from "../custom-hooks/use-Services";
import { LocationOn } from "@mui/icons-material";
const TagAssetComp = () => {
  const { addBusinessLoc } = useServices();

  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: "",
  //   });
  const Map = () => {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    const [asset, setAsset] = useState(null);
    const [item, setItem] = useState([1]);
    const [pos, setPos] = useState(null);
    const [status, setStatus] = useState(null);

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

  const handleAdd = async () => {
    let array = [];
    let len = item.length;
    for (let i = 0; i < len + 1; i++) {
      array.push(1);
    }
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            Tag
          </li>
          <li class="breadcrumb-item " aria-current="page">
            Tag Asset
          </li>
        </ol>
      </nav>
      <FormControl sx={{ minWidth: 250, marginLeft: "10px" }}>
        <InputLabel id="asset" size="small">
          Asset Type
        </InputLabel>
        <Select
          size="small"
          sx={{ backgroundColor: "white" }}
          labelId="asset"
          id="asset-list"
          // value={age}
          label="Asset"
          // value={asset}
          // onChange={(e) => {
          //   setAsset(e.target.value);
          // }}
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
        <div className="data">
          <div className="field">
            <FormControl
              sx={{ minWidth: 120, marginTop: 1, marginLeft: "10px" }}
            >
              <InputLabel id="business" size="small">
                Business Name
              </InputLabel>
              <Select
                size="small"
                labelId="business"
                id="business-list"
                // value={age}
                label="Business"
                // value={business}
                // onChange={(e) => {
                //   setBusiness(e.target.value);
                // }}
                // error={error.business}
                // helperText={error.business ? "required" : ""}
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
        </div>
      </div>

      <div className="section">
        <div className="heading">
          <img src="./personal-information.png" height={20} width={20} />
          <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
            Asset Details
          </Typography>
        </div>

        {/* {item.map((row, index) => ( */}
        <div className="list">
          {/* <div className="elem"> */}
          <FormControl sx={{ minWidth: 100 }} key={index}>
            <InputLabel id="asset" size="small">
              Asst No
            </InputLabel>
            <Select
              size="small"
              labelId="asset"
              id="asset-list"
              // value={age}

              label="Assets"
              // value={values.assetNo}
              // onChange={handleChange("assetNo")}
              // error={error.assetNo}
              // helperText={error.business ? "required" : ""}
            >
              <MenuItem value={"Asset 1"}>Asset 1</MenuItem>
              <MenuItem value={"Asset 2"}>Asset 2</MenuItem>
              <MenuItem value={"Asset 3"}>Asset 3</MenuItem>
            </Select>
            {/* {error.business ? (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  required
                </FormHelperText>
              ) : (
                ""
              )} */}
          </FormControl>
          {/* </div> */}
          <div className="elem">
            <TextField
              key={index}
              id="outlined-basic"
              size="small"
              label="Name"
              variant="outlined"
              placeholder="Asset Name"
              // value={values.name}
              sx={{ minWidth: 100 }}
              // onChange={handleChange("name")}
              // error={error.name}
              // helperText={error.name ? "Name is required" : ""}
            />
          </div>
          <div className="elem">
            <TextField
              key={index}
              id="outlined-basic"
              size="small"
              label="Desc"
              variant="outlined"
              placeholder="Description"
              sx={{ marginLeft: "10px", minWidth: 100 }}
              // error={error.desc}
              // value={values.desc}
              // onChange={handleChange("desc")}
              // helperText={error.desc ? "desc should be 13 digits" : ""}
            />
          </div>
          <div className="elem">
            <FormControl
              sx={{ width: 200, marginLeft: "10px" }}
              size="small"
              key={index}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Location
              </InputLabel>
              <OutlinedInput
                sx={{ minWidth: 100 }}
                // value={
                //   values.lat && values.long
                //     ? values.lat.toFixed(2) +
                //       "lat" +
                //       " " +
                //       values.long.toFixed(2) +
                //       "lng"
                //     : ""
                // }
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={getLocation}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      <LocationOn />
                    </IconButton>
                  </InputAdornment>
                }
                label="Location"
              />
            </FormControl>
          </div>
          <div sx={{ width: "10%" }}>
            <FormControl sx={{ minWidth: 100 }} key={index}>
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
                // onChange={handleChange("status")}
                // error={error.status}
                // helperText={error.business ? "required" : ""}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>In-active</MenuItem>
              </Select>
              {/* {error.status ? (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    required
                  </FormHelperText>
                ) : (
                  ""
                )} */}
            </FormControl>
          </div>
        </div>
        {/* ))} */}
        <div className="add">
          <Button
            variant="contained"
            color="info"
            size="small"
            sx={{
              //   backgroundColor: "#74a16f",
              marginTop: "10px",
              marginRight: "18%",
            }}
            onClick={handleAdd}
          >
            Add More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagAssetComp;
