import { red } from "@mui/material/colors";
import { Theme, createTheme } from "@mui/material/styles";

// A custom theme for this app
const baseTheme: Theme = createTheme({
	palette: {
		primary: {
			main: "#CB5182",
			light: "#E5A8C1",
		},
		secondary: {
			main: "#E5A8C0",
		},
		error: {
			main: red.A400,
		},
	},
});

const extendedTheme: Theme = createTheme({
	...baseTheme,
});

export default extendedTheme;
