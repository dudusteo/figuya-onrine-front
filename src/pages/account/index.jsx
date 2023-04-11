import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import AuthService from "../../services/auth.service";

const Account = () => {
	const [data, setData] = React.useState("");
	AuthService.getContent()
		.then((result) => setData(result))
		.catch((error) => console.log(error.response.data.message));

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			<div>{data}</div>
		</Box>
	);
};

export default Account;
