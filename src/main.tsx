import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./store";

import App from "./App";
import theme from "./theme";
import "./i18n";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<CssBaseline />
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
