import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import AuthService from "../../services/auth.service";

import PackageTable from "./PackageTable";
import FigurineTable from "./FigurineTable";

const Admin = () => {
	const [showAdminBoard, setShowAdminBoard] = React.useState(false);

	const [currentPackageId, setCurrentPackageId] = React.useState("");

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
						sx={{ my: 2 }}
						setCurrentId={setCurrentPackageId}
					></PackageTable>
					{currentPackageId && (
						<FigurineTable
							sx={{ my: 2 }}
							currentPackageId={currentPackageId}
						></FigurineTable>
					)}
				</>
			)}
		</Box>
	);
};

export default Admin;
