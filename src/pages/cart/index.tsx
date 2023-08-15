import * as React from "react";

import { Box, Button, CssBaseline, Stack, Typography } from "@mui/material";
import { ShopContext } from "../../context/shop-context";

import CartItem from "./CartItem";
import PurchaseSummary from "./PurchaseSummary";

const Cart = () => {
	const { cartItems } = React.useContext(ShopContext);
	const [totalCost, setTotalCost] = React.useState<number>(0);

	React.useEffect(() => {
		setTotalCost(() =>
			cartItems.reduce(
				(sum: number, item: Figurine) => sum + parseFloat(item.price),
				0 as number
			)
		);
	}, [cartItems]);

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
				{cartItems.map((item: Figurine, index: number) => (
					<CartItem item={item} key={index} />
				))}
			</Stack>
			<PurchaseSummary totalCost={totalCost} shipmentCost={13.0} />
		</Box>
	);
};

export default Cart;
