import * as React from "react";

import { Box } from "@mui/material";
import FigurineService from "../../services/figurine.service";

import Table from "../../core/table";

const columns = [
	{ field: "id", headerName: "ID", flex: 1 },
	{ field: "name", headerName: "NAME", flex: 1 },
	{ field: "item_cost", headerName: "ITEM COST", flex: 1 },
	{ field: "shipment_cost", headerName: "SHIPMENT COST", flex: 1 },
	{ field: "additional_cost", headerName: "ADDITIONAL COST", flex: 1 },
];

const PackageTable = (props) => {
	const { ...rest } = props;
	const [packages, setPackages] = React.useState([]);

	React.useEffect(() => {
		FigurineService.getPackageOptions().then((data) => setPackages(data));
	}, []);

	return (
		<Box {...rest}>
			<Table
				rows={packages}
				columns={columns}
				submit={FigurineService.addPackageOption}
			></Table>
		</Box>
	);
};

export default PackageTable;
