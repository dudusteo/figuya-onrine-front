import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import { IAccount } from "@spree/storefront-api-v2-sdk";
import AccountService from "../../services/accountService";

const Account = () => {
	const [currentUser, setCurrentUser] = React.useState<IAccount>();

	React.useEffect(() => {
		AccountService.accountInfo("token").then((user: IAccount) => {
			setCurrentUser(user);
		});
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
						<strong>{`${currentUser.data.attributes.first_name} ${currentUser.data.attributes.last_name}`}</strong>{" "}
						Profile
					</h3>
				</header>
				<p>
					<strong>Id:</strong> {currentUser.data.id}
				</p>
				<p>
					<strong>Email:</strong> {currentUser.data.attributes.email}
				</p>
			</div>
		</Box>
	);
};

export default Account;
