import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Webcam from "react-webcam";
import { Component, useState } from "react";
import "./webcam.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "6px",
  // boxShadow: 24,
  p: 4,
};

export default function WebcamModal(props) {
  console.log("Props", props);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState("");
  const [images, setImages] = useState({ img1: "", img2: "" });
  const webcamRef1 = React.useRef(null);
  const webcamRef2 = React.useRef(null);

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setImage(imageSrc);
  // }, [webcamRef]);
  const capture1 = React.useCallback(async () => {
    const imageSrc1 = webcamRef1.current.getScreenshot();
    await setImages((prevState) => ({
      // object that we want to update
      ...prevState, // keep all other key-value pairs
      img1: imageSrc1, // update the value of specific key
    }));
    // setImages({ ...images, ["img1"]: imageSrc1 });
  }, [webcamRef1]);
  const capture2 = React.useCallback(async () => {
    const imageSrc2 = webcamRef2.current.getScreenshot();
    await setImages((prevState) => ({
      // object that we want to update
      ...prevState, // keep all other key-value pairs
      img2: imageSrc2, // update the value of specific key
    }));
    // setImages({ ...images, ["img2"]: imageSrc2 });
  }, [webcamRef2]);
  console.log("Images", images);
  const WebcamComponent = () => <Webcam />;

  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user",
  };
  const upload = async () => {
    // img=[]
    // img.push(images.img1)
    // img.push(images.img2);
    props.onUpload(images);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={props.onClose}
        // onBackdropClick={() => setOpen(false)}
        // onClose={setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="webcam-container">
            <Typography
              sx={{ fontWeight: "bold", fontSize: 20, color: "secondary" }}
            >
              Asset Images
            </Typography>
          </Box>
          <Box className="webcam-row">
            <Box className="webcam-container">
              <Typography sx={{ fontWeight: "bold" }}>Front</Typography>
              <Box className="webcam-img">
                {images.img1 === "" ? (
                  <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef1}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img src={images.img1} />
                )}
              </Box>
              <Box className="webcam-container">
                <Box>
                  {images.img1 !== "" ? (
                    <Button
                      variant="contained"
                      onClick={async (e) => {
                        e.preventDefault();
                        await setImages((prevState) => ({
                          ...prevState,
                          img1: "",
                        }));
                        // setImages("");
                      }}
                      className="webcam-btn"
                    >
                      Retake
                    </Button>
                  ) : (
                    <Button
                      // className="webcam-btn"
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        capture1();
                      }}
                    >
                      Capture
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
            <Box className="webcam-container">
              <Typography sx={{ fontWeight: "bold" }}>Back</Typography>
              <Box className="webcam-img">
                {images.img2 === "" ? (
                  <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef2}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img src={images.img2} />
                )}
              </Box>
              <Box className="webcam-container">
                <Box>
                  {images.img2 !== "" ? (
                    <Button
                      variant="contained"
                      onClick={async (e) => {
                        e.preventDefault();
                        await setImages((prevState) => ({
                          ...prevState,
                          img2: "",
                        }));
                      }}
                      className="webcam-btn"
                    >
                      Retake
                    </Button>
                  ) : (
                    <Button
                      // className="webcam-btn"
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        capture2();
                      }}
                    >
                      Capture
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="upload">
            {images.img1 !== "" && images.img2 !== "" ? (
              <Button
                className="webcam-btn"
                variant="contained"
                color="secondary"
                onClick={upload}
                // onClick={(e) => {
                //   e.preventDefault();
                //   capture2();
                // }}
              >
                Upload
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
