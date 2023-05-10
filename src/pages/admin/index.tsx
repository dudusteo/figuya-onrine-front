import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import AuthService from "../../services/auth.service";

import PackageTable from "./PackageTable";
import FigurineTable from "./FigurineTable";

const Admin = () => {
	const [showAdminBoard, setShowAdminBoard] = React.useState<boolean>(false);

	const [currentPackageId, setCurrentPackageId] = React.useState<number>(0);

	React.useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
		}
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
			{showAdminBoard && (
				<>
					<PackageTable
						setCurrentId={setCurrentPackageId}
					></PackageTable>
					{currentPackageId ? (
						<FigurineTable
							currentPackageId={currentPackageId}
						></FigurineTable>
					) : (
						<div></div>
					)}
				</>
			)}
		</Box>
	);
};

export default Admin;
