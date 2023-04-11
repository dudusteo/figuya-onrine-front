import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import AuthService from "../../services/auth.service";

const Account = () => {
	const currentUser = AuthService.getCurrentUser();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			<div className="container">
				<header className="jumbotron">
					<h3>
						<strong>{currentUser?.username}</strong> Profile
					</h3>
				</header>
				<p>
					<strong>Token:</strong>{" "}
					{currentUser?.accessToken.substring(0, 20)} ...{" "}
					{currentUser?.accessToken.substr(
						currentUser?.accessToken.length - 20
					)}
				</p>
				<p>
					<strong>Id:</strong> {currentUser?.id}
				</p>
				<p>
					<strong>Email:</strong> {currentUser?.email}
				</p>
				<strong>Authorities:</strong>
				<ul>
					{currentUser?.roles &&
						currentUser?.roles.map((role, index) => (
							<li key={index}>{role}</li>
						))}
				</ul>
			</div>
		</Box>
	);
};

export default Account;
