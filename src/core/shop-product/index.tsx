import * as React from "react";
import { useDispatch } from "react-redux";

import {
	Box,
	Breadcrumbs,
	Button,
	CssBaseline,
	Link,
	Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import ImageProduct from "./ImageProduct";
import { Product } from "../../services/productService";
import { updateOrder } from "../../features/basket/basketSlice";
import CartService from "../../services/cartService";
import { useAppSelector } from "../../app/hooks";
import { getOrderToken, setOrderToken } from "../../features/token/orderTokenSlice";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";

interface ShopProductProps {
	product: Product;
}

const ShopProduct = ({ product }: ShopProductProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const orderToken = useAppSelector(getOrderToken);

	if (!product) {
		return <div>Loading...</div>;
	}

	const title = product.attributes.name;
	const priceTitle = product.attributes.display_price;

	const addToCart = (product: Product) => {
		if (!orderToken) {
			CartService.create().then((token: IOrder) => {
				dispatch(setOrderToken(token.data.attributes.token));
			});
		}

		if (orderToken) {
			CartService.addItem(orderToken, product.true_id, 1).then((order: IOrder) => {
				dispatch(updateOrder(order));
			});
		}
	};

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

			<Box
				sx={{
					height: "30rem",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						my: 2,
					}}
				>
					<Breadcrumbs separator="-" sx={{ flexGrow: 1 }}>
						<Link underline="hover" href="/">
							Figuya Onrine
						</Link>
						{/* <Link underline="hover" href="/">
							{product.origin}
						</Link> */}
					</Breadcrumbs>
					<Typography>{"Similiar products"}</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<ImageProduct images={product.images}></ImageProduct>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							mx: 4,
						}}
					>
						<Typography variant="h5" sx={{ color: "primary.main" }}>
							{title}
						</Typography>
						{/* <Typography
							variant="subtitle1"
							sx={{ color: "primary.main", flexGrow: 1 }}
						>
							{product.condition}
						</Typography> */}
						<Typography
							variant="h4"
							sx={{
								color: "primary.main",
								fontWeight: "bold",
								my: 1,
							}}
						>
							{priceTitle}
						</Typography>
						<Button
							variant="contained"
							onClick={() => addToCart(product)}
							sx={{ width: "11rem" }}
						>
							{t("add-to-cart")}
						</Button>
						<Box sx={{ flexGrow: 1 }}></Box>
						<Typography
							variant="subtitle1"
							sx={{ color: "primary.main" }}
						>
							{"rest"}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ShopProduct;
