import * as React from "react";

import { Box } from "@mui/material";

import Table from "../../core/table";
import { addServiceSnackbarWrapper } from "../../utils";
import { enqueueSnackbar } from "notistack";
import PackageService from "../../services/package.service";

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

const PackageTable = (props) => {
	const { setCurrentId, ...rest } = props;
	const [packages, setPackages] = React.useState([]);

	const addRow = (object) => {
		const formData = new FormData();

		Object.keys(object).forEach((key) => {
			formData.append(key, object[key]);
		});

		let count = 0;

		for (let [key, value] of formData.entries()) {
			if (
				(typeof value === "string" && value.length === 0) ||
				(key === "images" && value.size === 0)
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
		<Box {...rest}>
			<Table
				tableName="packages"
				rows={packages}
				columns={columns}
				addRow={addRow}
				onSelect={(x) => setCurrentId(x)}
			></Table>
		</Box>
	);
};

export default PackageTable;
