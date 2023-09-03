import { Box, Grid } from "@mui/material";
import Panel from "./Panel";
import { Product } from "../../services/productService";

interface HomePanelProps {
	products: Product[];
}

const HomePanel = ({ products }: HomePanelProps) => {
	const main: Product[] = products.slice(0, 2);
	const sub: Product[] = products.slice(2, 6);

	const rows: Product[][] = sub.reduce(function (
		rows: Product[][],
		key: Product,
		index: number
	) {
		return ((index % 2 === 0
			? rows.push([key])
			: rows[rows.length - 1].push(key)) && rows) as Product[][];
	},
	[]);

	return (
		<Grid container columns={{ xs: 6, sm: 12, md: 16 }} sx={{ px: 7 }}>
			{main.map((product, index) => (
				<Panel key={index} image={product.images[0]} sx={{ mx: -5 }} />
			))}
			<Box sx={{ mx: 2 }}></Box>
			{rows.map((row, index) => (
				<Grid item key={index + main.length} sx={{ my: 3 }}>
					<Panel
						image={row[0].images[0]}
						sx={{ mx: -1, my: -3 }}
						small
					/>
					<Box sx={{ my: 7 }}></Box>
					<Panel
						image={row[1].images[0]}
						sx={{ mx: -8.5, mt: -3 }}
						small
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default HomePanel;
