import * as React from "react";

import { Box } from "@mui/material";

import { enqueueSnackbar } from "notistack";
import { addServiceSnackbarWrapper } from "../../../utils";
import PackageService from "../../../services/old/packages.service";
import Table from "../../../core/table";

const columns = [
	{ field: "id", headerName: "ID", width: 80 },
	{ field: "name", headerName: "NAME", flex: 1, editable: true },
	{ field: "itemCost", headerName: "ITEM COST", flex: 1, editable: true },
	{
		field: "shipmentCost",
		headerName: "SHIPMENT COST",
		flex: 1,
		editable: true,
	},
	{
		field: "additionalCost",
		headerName: "ADDITIONAL COST",
		flex: 1,
		editable: true,
	},
];

interface PackageTableProps {
	setCurrentId: (id: number) => void;
}

const PackageTable = ({ setCurrentId }: PackageTableProps) => {
	const [packages, setPackages] = React.useState([]);

	const addRow = (row: any) => {
		const formData = new FormData();

		Object.keys(row).forEach((key) => {
			formData.append(key, row[key]);
		});

		let count = 0;

		for (let [key, value] of formData.entries()) {
			if (
				(typeof value === "string" && value.length === 0) ||
				(key === "images" && value.length === 0)
			) {
				count++;
				enqueueSnackbar("Puste pole: " + key, {
					autoHideDuration: 3000,
					variant: "error",
				});
			}
		}
		if (count === 0) {
			addServiceSnackbarWrapper(PackageService.addPackage(formData));
		}
	};

	React.useEffect(() => {
		PackageService.getAllPackages().then((data) => setPackages(data));
	}, []);

	return (
		<Box sx={{ my: 2 }}>
			<Table
				tableName="packages"
				rows={packages}
				columns={columns}
				addRow={addRow}
				deleteRow={(id: number) => console.log("TODO")}
				onSelect={(x) => setCurrentId(x)}
			></Table>
		</Box>
	);
};

export default PackageTable;
