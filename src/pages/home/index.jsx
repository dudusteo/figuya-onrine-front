import { Box, CssBaseline, Grid } from "@mui/material";
import * as React from "react";

import { PRODUCTS } from "../../products";
import Panel from "./Panel";

const Home = () => {
	const main = PRODUCTS.slice(0, 2);
	const sub = PRODUCTS.slice(0, 6);

	const rows = sub.reduce(function (rows, key, index) {
		return (
			(index % 2 === 0
				? rows.push([key])
				: rows[rows.length - 1].push(key)) && rows
		);
	}, []);

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
						img={product.productImage}
						sx={{ mx: -5 }}
					/>
				))}
				<Box sx={{ mx: 2 }}></Box>
				{rows.map((row, index) => (
					<Grid item sx={{ my: 3 }}>
						<Panel
							key={index}
							img={row[0].productImage}
							sx={{ mx: -1, my: -3 }}
							small
						/>
						<Box sx={{ my: 7 }}></Box>
						<Panel
							key={index}
							img={row[1].productImage}
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
