import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3b3e3f",
    },
    secondary: {
      main: "#3ce4cb",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
});

export default theme;
