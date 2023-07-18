import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
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

export default function Uploads(props) {
  console.log("Img Props", props);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
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
                <img src={props.data.img1} />
              </Box>
            </Box>
            <Box className="webcam-container">
              <Typography sx={{ fontWeight: "bold" }}>Back</Typography>
              <Box className="webcam-img">
                <img src={props.data.img2} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
