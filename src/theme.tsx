import { red } from "@mui/material/colors";
import { Theme, createTheme } from "@mui/material/styles";

// A custom theme for this app
const baseTheme: Theme = createTheme({
	palette: {
		primary: {
			main: "#CB5182",
			light: "#E5A8C1",
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

const extendedTheme: Theme = createTheme({
	...baseTheme,
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					border: `1px solid ${
						baseTheme.palette.primary.main + "12"
					}`,
					boxShadow: `0px 2px 1px -1px ${
						baseTheme.palette.primary.main + "20"
					}, 0px 1px 1px 0px ${
						baseTheme.palette.primary.main + "14"
					}, 0px 1px 3px 0px ${
						baseTheme.palette.primary.main + "12"
					}`,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: baseTheme.palette.primary.main,
					color: baseTheme.palette.primary.contrastText,
				},
			},
		},
	},
});

export default extendedTheme;
