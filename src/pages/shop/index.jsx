import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Collapse,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Typography,
} from "@mui/material";
import { PRODUCTS } from "../../products";
import Product from "./Product";

const Shop = () => {
	const [list, setList] = React.useState({
		category: true,
		stock: true,
		popularSeries: true,
	});

	const setCategory = (newCategory) => {
		setList((prevList) => {
			return { ...prevList, category: newCategory };
		});
	};

	const setStock = (newStock) => {
		setList((prevList) => {
			return { ...prevList, stock: newStock };
		});
	};

	const setPopularSeries = (newPopularSeries) => {
		setList((prevList) => {
			return { ...prevList, popularSeries: newPopularSeries };
		});
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				minHeight: "100vh",
				m: 4,
			}}
		>
			<CssBaseline />
			<Box sx={{ flexGrow: 1, minWidth: "10vw", maxWidth: "40vw" }}>
				<Paper
					variant="outlined"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.primary.main + "20",
					}}
				>
					<List component="nav" aria-label="mailbox folders">
						<ListItemButton
							onClick={() => setCategory(!list.category)}
						>
							<ListItemText primary="Rodzaje" />
						</ListItemButton>
						<Collapse
							in={list.category}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Prize figurki" />
								</ListItemButton>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Scale figurki" />
								</ListItemButton>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Mini figurki" />
								</ListItemButton>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Figruki akcji" />
								</ListItemButton>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Gadżety" />
								</ListItemButton>
							</List>
						</Collapse>
						<Divider />
						<ListItemButton onClick={() => setStock(!list.stock)}>
							<ListItemText primary="Stan towaru" />
						</ListItemButton>
						<Collapse in={list.stock} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Nowy" />
								</ListItemButton>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Używany" />
								</ListItemButton>
							</List>
						</Collapse>
						<Divider />
						<ListItemButton
							onClick={() =>
								setPopularSeries(!list.popularSeries)
							}
						>
							<ListItemText primary="Popularne serie" />
						</ListItemButton>
						<Collapse
							in={list.popularSeries}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Vocaloid" />
								</ListItemButton>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText primary="Love live" />
								</ListItemButton>
							</List>
						</Collapse>
					</List>
				</Paper>
			</Box>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 6, sm: 12, md: 16 }}
				sx={{ px: 2 }}
			>
				{PRODUCTS.map((product) => (
					<>
						<Grid item key={product.id}>
							<Product data={product} />
						</Grid>
						<Grid item key={product.id}>
							<Product data={product} />
						</Grid>
					</>
				))}
			</Grid>
		</Box>
	);
};

export default Shop;
