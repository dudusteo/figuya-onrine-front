import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import UserService from "../../services/user.service";

const Admin = () => {
	const [content, setContent] = React.useState("");

	React.useEffect(() => {
		UserService.getAdminBoard().then(
			(response) => {
				setContent(response.data);
			},
			(error) => {
				const _content =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				setContent(_content);
			}
		);
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			<h3>{content}</h3>
		</Box>
	);
};

export default Admin;
