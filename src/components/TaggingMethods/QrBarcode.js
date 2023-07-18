import React from "react";
import { useState } from "react";
import QRCode from "qrcode";
import { Button } from "@mui/material";
import "./Qr.css";
import { saveAs } from "file-saver";
const generateQR = (data) => {
  delete data.QR;
  delete data.Image;
  let qr = "";
  console.log("Data in qr", data);
  const fileData = JSON.stringify(data);
  const file = new Blob([fileData], { type: "text/plain" });
  saveAs(file, "example.txt");

  const img = QRCode.toDataURL(JSON.stringify(data), {
    type: "jpg",
  });

  return img;
};
const toDataURL = async (url) => {
  return fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
};

const download = async (qr) => {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = await toDataURL(qr);
  a.download = "data" + "." + "png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
const downloadBarcode = async (barcode) => {
  // const canvas = document.getElementById("mybarcode");
  // console.log(canvas);
  const pngUrl = barcode
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = `${barcode}.png`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
export { generateQR, download, downloadBarcode };
