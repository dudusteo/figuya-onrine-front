import * as React from "react";

import {
	CssBaseline,
	Box,
	Collapse,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Paper,
	useMediaQuery,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import ProductService, { Product } from "../../services/productService";
import ProductCard from "./ProductCard";

const data = {
	type: [
		{ name: "prize", count: 0 },
		{ name: "scale", count: 0 },
		{ name: "mini", count: 0 },
		{ name: "action", count: 0 },
		{ name: "gadget", count: 0 },
	],
	condition: [
		{ name: "new", count: 0 },
		{ name: "used", count: 0 },
	],
	popularSeries: [
		{ name: "Vocaloid", count: 0 },
		{ name: "Love live", count: 0 },
	],
};

interface BooleanList {
	type: boolean;
	condition: boolean;
	popularSeries: boolean;
}

const Shop = () => {
	const { t } = useTranslation();
	const [products, setProducts] = React.useState<Product[]>([]);
	const [list, setList] = React.useState<BooleanList>({
		type: true,
		condition: true,
		popularSeries: true,
	});

	const isSmallScreen = useMediaQuery((theme: any) =>
		theme.breakpoints.down("md")
	);

	const setType = (newType: boolean) => {
		setList((prevList) => {
			return { ...prevList, type: newType };
		});
	};

	const setCondition = (newCondition: boolean) => {
		setList((prevList) => {
			return { ...prevList, condition: newCondition };
		});
	};

	const setPopularSeries = (newPopularSeries: boolean) => {
		setList((prevList) => {
			return { ...prevList, popularSeries: newPopularSeries };
		});
	};

	React.useEffect(() => {
		ProductService.getProducts().then((products) => {
			setProducts(products);
		});
	}, []);



	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: isSmallScreen ? "column" : "row",
				minHeight: "100vh",
				m: 2,
			}}
		>
			<CssBaseline />
			<Box sx={{ flexGrow: 1, minWidth: "12rem", maxWidth: "8vw" }}>
				<Paper
					variant="outlined"
					sx={{
						backgroundColor: (theme: any) =>
							theme.palette.primary.light + 50,
					}}
				>
					<List
						component="nav"
						aria-label="mailbox folders"
						sx={{ color: "primary.main" }}
					>
						<ListItemButton onClick={() => setType(!list.type)}>
							<ListItemText primary={t("shop.type")} />
						</ListItemButton>
						<Collapse in={list.type} timeout="auto">
							<List component="div" disablePadding>
								{data.type.map((type, index) => (
									<ListItemButton key={index} sx={{ pl: 4 }}>
										<ListItemText
											primary={t("shop." + type.name)}
										/>
										<ListItemText
											sx={{ textAlign: "right" }}
											primary={type.count}
										/>
									</ListItemButton>
								))}
							</List>
						</Collapse>
						<Divider />
						<ListItemButton
							onClick={() => setCondition(!list.condition)}
						>
							<ListItemText primary={t("shop.condition")} />
						</ListItemButton>
						<Collapse in={list.condition} timeout="auto">
							<List component="div" disablePadding>
								{data.condition.map((condition, index) => (
									<ListItemButton key={index} sx={{ pl: 4 }}>
										<ListItemText
											primary={t(
												"shop." + condition.name
											)}
										/>
										<ListItemText
											sx={{ textAlign: "right" }}
											primary={condition.count}
										/>
									</ListItemButton>
								))}
							</List>
						</Collapse>
						<Divider />
						<ListItemButton
							onClick={() =>
								setPopularSeries(!list.popularSeries)
							}
						>
							<ListItemText primary={t("shop.popular")} />
						</ListItemButton>
						<Collapse in={list.popularSeries} timeout="auto">
							<List component="div" disablePadding>
								{data.popularSeries.map((condition, index) => (
									<ListItemButton key={index} sx={{ pl: 4 }}>
										<ListItemText
											primary={condition.name}
										/>
										<ListItemText
											sx={{ textAlign: "right" }}
											primary={condition.count}
										/>
									</ListItemButton>
								))}
							</List>
						</Collapse>
					</List>
				</Paper>
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				{products && (
					<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 8, lg: 12, xl: 12 }} >
						{products.map((product) => (
							<Grid item key={product.id} xs={4} sm={4} md={4} lg={4} xl={3} >
								<ProductCard product={product} />
							</Grid>
						))}
					</Grid>
				)}
			</Box>
		</Box>
	);
};

export default Shop;
