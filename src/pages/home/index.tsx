import { Box, CssBaseline } from "@mui/material";
import * as React from "react";

import HomePanel from "../../core/home-panel";
import ProductService, { Product } from "../../services/productService";

const Home = () => {
	const [products, setProducts] = React.useState<Product[]>([]);

	React.useEffect(() => {
		ProductService.getProducts().then((products: Product[]) =>
			setProducts(products)
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
			<HomePanel products={products} />
		</Box>
	);
};

export default Home;
