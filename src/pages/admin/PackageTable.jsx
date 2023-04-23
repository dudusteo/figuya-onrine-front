import * as React from "react";

import { Box } from "@mui/material";
import FigurineService from "../../services/figurine.service";

import Table from "../../core/table";

const columns = [
	{ field: "id", headerName: "ID", width: 80 },
	{ field: "name", headerName: "NAME", flex: 1, editable: true },
	{ field: "item_cost", headerName: "ITEM COST", flex: 1, editable: true },
	{
		field: "shipment_cost",
		headerName: "SHIPMENT COST",
		flex: 1,
		editable: true,
	},
	{
		field: "additional_cost",
		headerName: "ADDITIONAL COST",
		flex: 1,
		editable: true,
	},
];

const PackageTable = (props) => {
	const { setCurrent, ...rest } = props;
	const [packages, setPackages] = React.useState([]);

	React.useEffect(() => {
		FigurineService.getPackageOptions().then((data) => setPackages(data));
	}, []);

	return (
		<Box {...rest}>
			<Table
				rows={packages}
				columns={columns}
				addRow={FigurineService.addPackageOption}
				onSelect={(x) => setCurrent(x)}
			></Table>
		</Box>
	);
};

export default PackageTable;
