import * as React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import ReactImage from "../../core/react-image";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { CartProduct } from "../../services/cartService";
import CartService from "../../services/cartService";
import { getOrderToken } from "../../features/token/orderTokenSlice";
import { updateOrder } from "../../features/basket/basketSlice";

interface CartProductProps {
	cartProduct: CartProduct;
}

const CartProduct = ({ cartProduct }: CartProductProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const orderToken = useAppSelector(getOrderToken);

	if (!cartProduct || !orderToken) {
		return null;
	}

	const title = cartProduct.attributes.name;
	const priceTitle = cartProduct.attributes.display_price;

	const handleRemoveItem = () => {
		CartService.RemoveItem(orderToken, cartProduct.line_item_id).then((order) => {
			dispatch(updateOrder(order));
		});
	};

	return (
		<Paper
			sx={{
				p: 2,
				flexGrow: 1,
			}}
		>
			<Grid container spacing={2}>
				<Grid item>
					<ReactImage
						sx={{ height: "13.5rem", width: "10.5rem" }}
						image={cartProduct.images[0]}
					/>
				</Grid>

				<Grid item sm container direction="column">
					<Grid item xs>
						<Typography variant="h5" sx={{ color: "primary.main" }}>
							{title}
						</Typography>
					</Grid>

					<Grid item>
						<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
							<Typography
								sx={{ cursor: "pointer" }}
								variant="body2"
								onClick={() => handleRemoveItem()}
							>
								{t("cart.remove")}
							</Typography>
						</Box>
						<Typography
							align="right"
							variant="h4"
							sx={{
								color: "primary.main",
								fontWeight: "bold",
								my: 1,
							}}
						>
							{priceTitle}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default CartProduct;
