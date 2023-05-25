import { Box, CssBaseline, Grid } from "@mui/material";
import * as React from "react";

import Panel from "./Panel";
import FigurineService from "../../services/figurineService";
import { Figurine } from "../../interfaces";

const Home = () => {
	const [items, setItems] = React.useState<Figurine[]>([]);

	React.useEffect(() => {
		FigurineService.getAllFigurines().then((data: Figurine[]) =>
			setItems(data)
		);
	}, []);

	const main: Figurine[] = items.slice(0, 2);
	const sub: Figurine[] = items.slice(2, 6);

	const rows: Figurine[][] = sub.reduce(function (
		rows: Figurine[][],
		key: Figurine,
		index: number
	) {
		return ((index % 2 === 0
			? rows.push([key])
			: rows[rows.length - 1].push(key)) && rows) as Figurine[][];
	},
	[]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				m: 4,
			}}
		>
			<CssBaseline />
			<Grid container columns={{ xs: 6, sm: 12, md: 16 }} sx={{ px: 7 }}>
				{main.map((product, index) => (
					<Panel
						key={index}
						image={product.images[0]}
						sx={{ mx: -5 }}
					/>
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
		</Box>
	);
};

export default Home;
