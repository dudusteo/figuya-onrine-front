import * as React from "react";

import { Box, CssBaseline } from "@mui/material";

const Item = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
		</Box>
	);
};

export default Item;
