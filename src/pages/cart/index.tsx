import * as React from "react";

import { Box, CssBaseline, Stack, Typography } from "@mui/material";

import PurchaseSummary from "./PurchaseSummary";
import CartService from "../../services/cartService";
import { useAppSelector } from "../../app/hooks";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";
import CartProduct from "./CartProduct";
import { getOrderToken } from "../../features/token/orderTokenSlice";

const Cart = () => {
	const [cartProducts, setCardProducts] = React.useState<IOrder | null>(null);
	const orderToken = useAppSelector(getOrderToken);

	React.useEffect(() => {
		console.log("cart");
		if (orderToken) {
			CartService.show(orderToken).then((cart: IOrder) => {
				setCardProducts(cart);
			});
		}
	}, [orderToken]);

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
				Zawartość koszyka
			</Typography>

			<Stack spacing={2} sx={{ my: 2 }}>
				{/* {cartProducts &&
					cartProducts.included.map((item: Figurine, index: number) => (
						<CartProduct item={item} key={index} />
					))} */}
			</Stack>

			<PurchaseSummary totalCost={0} shipmentCost={13.0} />
		</Box>
	);
};

export default Cart;
