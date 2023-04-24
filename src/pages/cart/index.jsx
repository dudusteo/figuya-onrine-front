import * as React from "react";

import { Box, Button, CssBaseline, Stack } from "@mui/material";
import { ShopContext } from "../../context/shop-context";

import CartItem from "./CartItem";

const Cart = () => {
	const { cartItems, getDataFromId } = React.useContext(ShopContext);
	console.log(cartItems);
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
				{cartItems.map((item) => (
					<CartItem data={getDataFromId(item.id)} key={item.id} />
				))}
			</Stack>
			<Button href="cart/checkout" variant="outlined">
				Złóż zamówienie
			</Button>
		</Box>
	);
};

export default Cart;
