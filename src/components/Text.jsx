import React from "react";
import { Button } from "@mui/material";

const Text = ({ color }) => {
  console.log("Color", color);
  return (
    <div>
      <Button variant="text" color={color}>
        Text
      </Button>
    </div>
  );
};

export default Text;
