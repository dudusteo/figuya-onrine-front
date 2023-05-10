import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import SignUp from "../../../core/sign-up";

const Register = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			<SignUp />
		</Box>
	);
};

export default Register;
