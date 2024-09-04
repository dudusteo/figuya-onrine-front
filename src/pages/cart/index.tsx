import * as React from "react";

import { Box, CssBaseline, Stack, Typography } from "@mui/material";

import PurchaseSummary from "./PurchaseSummary";
import CartService from "../../services/cartService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IOrder, RelationType } from "@spree/storefront-api-v2-sdk/dist/*";
import {
	getOrderToken,
	setOrderToken,
} from "../../features/token/orderTokenSlice";
import CartProduct from "./CartProduct";
import { getCart, updateOrder } from "../../features/basket/basketSlice";
import { useTranslation } from "react-i18next";

const Cart = () => {
	const { t } = useTranslation();
	const orderToken = useAppSelector(getOrderToken);
	const cart = useAppSelector(getCart)
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (!orderToken) {
			CartService.create().then((token: IOrder) => {
				dispatch(setOrderToken(token.data.attributes.token));
			});
		}

		if (orderToken) {
			CartService.show(orderToken).then((cart: IOrder) => {
				dispatch(updateOrder(cart));
			});
		}
	}, [orderToken, dispatch]);

	if (!cart || !orderToken) {
		return <div>Loading...</div>;
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				px: 10,
				py: 2,
			}}
		>
			<CssBaseline />

			<Typography
				variant="h4"
				sx={{
					color: "primary.main",
					fontWeight: "bold",
				}}
			>
				{t("cart.cart-content")}
			</Typography>

			<Stack spacing={2} sx={{ my: 2 }}>
				{Array.isArray(cart?.data.relationships.variants.data) &&
					Array.isArray(cart?.data.relationships.line_items.data) &&
					cart.data.relationships.variants.data.map(
						(product: RelationType, key: number) => (
							<CartProduct
								productId={product.id}
								lineItemId={
									// @ts-ignore
									cart.data.relationships.line_items.data[key].id
								}
								orderToken={orderToken}
								key={key}
							/>
						)
					)}
			</Stack>

			<PurchaseSummary
				itemCost={cart.data.attributes.display_item_total}
				shipmentCost={cart.data.attributes.display_ship_total}
				totalCost={cart.data.attributes.display_total}
			/>
		</Box>
	);
};

export default Cart;
