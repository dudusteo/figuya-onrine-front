import * as React from "react";

import { Box, CssBaseline, Stack } from "@mui/material";
import { ShopContext } from "../../context/shop-context";

import CartItem from "./cartItem";

const Cart = () => {
    const { cartItems, getDataFromId } = React.useContext(ShopContext);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
        }}>
            <CssBaseline />

            <Stack sx={{ px: 50 }}>
                {cartItems.map((item) =>
                    <CartItem data={getDataFromId(item.id)} key={item.id} />
                )}
            </Stack>

        </Box >
    );
}

export default Cart;


