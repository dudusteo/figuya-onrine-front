import * as React from "react";

import { Box, Button, CssBaseline, Stack } from "@mui/material";
import { ShopContext } from "../../context/shop-context";

import CartItem from "./CartItem";
import { Figurine } from "../../interfaces";

const Cart = () => {
	const { cartItems } = React.useContext(ShopContext);
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />

			<Stack sx={{ px: 50 }}>
				{cartItems.map((item: Figurine, index: number) => (
					<CartItem item={item} key={index} />
				))}
			</Stack>
			<Button href="cart/checkout" variant="outlined">
				Złóż zamówienie
			</Button>
		</Box>
	);
};

export default Cart;
