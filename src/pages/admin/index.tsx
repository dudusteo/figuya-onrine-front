import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import AuthService from "../../services/authService";

import PackageTable from "./PackageTable";
import FigurineTable from "./FigurineTable";

const Admin = () => {
	const [showAdminBoard, setShowAdminBoard] = React.useState<boolean>(false);

	const [currentPackageId, setCurrentPackageId] = React.useState<number>(0);

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
