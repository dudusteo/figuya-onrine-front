import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import { useParams } from "react-router-dom";

import ShopProduct from "../../core/shop-product";
import type { Product } from "../../services/productService";
import ProductService from "../../services/productService";

const Product = () => {
	const { productId } = useParams<{ productId: string }>();
	const [product, setProduct] = React.useState<Product>();

	React.useEffect(() => {
		if (productId) {
			ProductService.getProduct(productId).then((product: Product) =>
				setProduct(product)
			);
		}
	}, [productId]);

	if (!product) {
		return <div>Loading...</div>;
	}

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

			<ShopProduct product={product} ></ShopProduct>
		</Box>
	);
};

export default Product;
