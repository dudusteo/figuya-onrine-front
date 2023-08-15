import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import UserService from "../../services/userService";

const Account = () => {
	const [currentUser, setCurrentUser] = React.useState<User>();

	React.useEffect(() => {
		UserService.getCurrentUser()
			.then((currentUser) => setCurrentUser(currentUser))
			.catch((error: Error) => {});
	}, []);

	if (!currentUser) {
		return <div>loading...</div>;
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			<div>
				<header>
					<h3>
						<strong>{currentUser?.username}</strong> Profile
					</h3>
				</header>
				<p>
					<strong>Token:</strong>{" "}
					{currentUser?.token.substring(0, 20)} ...{" "}
					{currentUser?.token.substr(currentUser?.token.length - 20)}
				</p>
				<p>
					<strong>Id:</strong> {currentUser?.id}
				</p>
				<p>
					<strong>Email:</strong> {currentUser?.email}
				</p>
				{/* <strong>Authorities:</strong>
				<ul>
					{currentUser?.roles &&
						currentUser?.roles.map(
							(role: string, index: number) => (
								<li key={index}>{role}</li>
							)
						)}
				</ul> */}
			</div>
		</Box>
	);
};

export default Account;
