import React from "react";
import { useBarcode } from "react-barcodes";
import { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { useRef } from "react";
import "./BarcodeComp.css";
import { useEffect } from "react";

const BarcodeComp = (props) => {
  console.log("Barcode props", props);

  const { inputRef } = useBarcode({
    value: "http://localhost5173",
    options: {
      background: "#FFF",
      // width: 0.8,
      // format: "CODE128",

      // displayValue: false,
    },
  });

  // const generateBarcode = () => {
  //   // const bc = getElementById("mybarcode");
  //   props.onUpload(inputRef);
  // };

  const downloadBarcode = () => {
    const canvas = document.getElementById("mybarcode");
    console.log("Canvas", canvas);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "mybarcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    const img = document.getElementById("mybarcode");
    // props.onUpload(inputRef);
  }, []);

  return (
    <div className=".qr-download">
      {/* <Button
          size="small"
          sx={{ marginLeft: "10px" }}
          variant="outlined"
          color="primary"
          onClick={downloadBarcode}
        >
          Download
        </Button> */}
      {props.view === "large" ? (
        <canvas id="mybarcode" height={200} width={300} ref={inputRef} />
      ) : (
        <Tooltip title="Click to download">
          <canvas
            id="mybarcode"
            onClick={downloadBarcode}
            height={0.2}
            width={0.2}
            ref={inputRef}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default BarcodeComp;
