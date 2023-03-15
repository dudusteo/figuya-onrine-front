import * as React from "react";

import { Box, CssBaseline, Stack } from "@mui/material";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";

import CartItem from "./cartItem";

const Cart = () => {
    const { cartItems } = React.useContext(ShopContext);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
        }}>
            <CssBaseline />

            <Stack >
                {cartItems.map((item) =>
                    <CartItem data={PRODUCTS[item.id - 1]} key={item.id} />
                )}
            </Stack>

        </Box >
    );
}

export default Cart;


