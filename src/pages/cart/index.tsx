import * as React from "react";

import { Box, Button, CssBaseline, Stack, Typography } from "@mui/material";
import { ShopContext } from "../../context/shop-context";

import CartItem from "./CartItem";
import { Figurine } from "../../interfaces";
import PurchaseSummary from "./PurchaseSummary";

const Cart = () => {
	const { cartItems } = React.useContext(ShopContext);
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
			<PurchaseSummary />
		</Box>
	);
};

export default Cart;
