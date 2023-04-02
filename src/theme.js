import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#CB5182",
      contrastText: "#fff",
    },
    secondary: {
      main: "#E5A8C0",
      contrastText: "#fff",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
