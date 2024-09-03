import * as React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReactImage from "../../core/react-image";
import { Product } from "../../services/productService";
import CartService from "../../services/cartService";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	getOrderToken,
	setOrderToken,
} from "../../features/token/orderTokenSlice";
import { updateOrder } from "../../features/basket/basketSlice";

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const orderToken = useAppSelector(getOrderToken);
	const dispatch = useAppDispatch();

	const title = product.attributes.name;
	const priceTitle = product.attributes.display_price;

	const handleNavigation = () => {
		navigate(`/shop/product/${product.id}`);
	};

	const handleAddItem = () => {
		if (!orderToken) {
			CartService.create().then((token: IOrder) => {
				dispatch(setOrderToken(token.data.attributes.token));
			});
		}

		if (orderToken) {
			CartService.addItem(orderToken, product.id, 1).then((order: IOrder) => {
				dispatch(updateOrder(order));
			});
		}
	};

	return (
		<Paper
			variant="outlined"
			sx={{
				p: 2,
				height: "30rem",
				width: "100%",
			}}
		>
			<Box sx={{
				height: "70%",
				display: "flex",
				justifyContent: "center",
			}}>
				<ReactImage
					sx={{
						aspectRatio: "14/18",
						height: "100%",
						cursor: "pointer",
					}}
					onClick={handleNavigation}
					image={product.images[0]}
				/>
			</Box>
			<Box sx={{
				height: "30%",
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
			}}>
				<Box sx={{ py: 1 }}>
					<Typography
						variant="subtitle2"
						sx={{ color: "primary.main", cursor: "pointer" }}
						onClick={handleNavigation}
					>
						{title}
					</Typography>
				</Box>

				<Typography
					variant="h6"
					align="right"
					sx={{ color: "primary.main" }}
				>
					{priceTitle}
				</Typography>

				<Button
					variant="contained"
					onClick={(e) => {
						e.stopPropagation();
						handleAddItem();
					}}
				>
					{t("add-to-cart")}
				</Button>
			</Box>
		</Paper>
	);
};

export default ProductCard;
