import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import "./PromptModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "6px",
  // boxShadow: 24,
  p: 4,
};

export default function PromptModal(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="main">
            <Typography sx={{ fontSize: 14 }}>{props.text}</Typography>
          </Box>
          <Box className="btn-section">
            <Box className="btn">
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => {
                  props.save(false);
                }}
              >
                No
              </Button>
            </Box>
            <Box className="btn">
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => {
                  props.save(true);
                }}
              >
                Yes{" "}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
