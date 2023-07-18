import React from "react";
import { useState } from "react";
import QRCode from "qrcode";
import { Button } from "@mui/material";
import "./Qr.css";
import { saveAs } from "file-saver";

const Qr = (props) => {
  const [data, setData] = useState(props.data);
  const [qr, setQr] = useState("");

  console.log("Qr props", props);
  const generateQR = () => {
    const fileData = JSON.stringify(data);
    const file = new Blob([fileData], { type: "text/plain" });
    saveAs(file, "example.txt");

    QRCode.toDataURL("http://localhost:3000/files/example.txt", {
      type: "jpg",
    })
      .then((img) => {
        console.log("Qr image", img);
        setQr(img);
        props.onUpload(img);
      })
      .catch(() => {
        console.log("Could Not create QR ");
      });
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

  const download = async () => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = await toDataURL(qr);
    a.download = "data" + "." + "png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div>
      {qr === "" && (
        <Button variant="contained" onClick={generateQR}>
          Generate QR
        </Button>
      )}
      {qr !== "" && (
        <>
          <Button
            size="small"
            sx={{ marginLeft: "10px" }}
            variant="outlined"
            color="primary"
            onClick={download}
          >
            Download
          </Button>
          {/* <Button
            size="small"
            sx={{ marginLeft: "10px" }}
            variant="outlined"
            color="primary"
            onClick={() => {
              props.onUpload(qr);
            }}
          >
            View
          </Button> */}
        </>
      )}

      {/* </div> */}
    </div>
  );
};

export default Qr;
