import * as React from "react";

import { Box, CssBaseline, Typography } from "@mui/material";

import CartService from "../../services/cartService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";
import {
    getOrderToken,
    setOrderToken,
} from "../../features/token/orderTokenSlice";
import { getCart, updateOrder } from "../../features/basket/basketSlice";
import { useTranslation } from "react-i18next";
import PurchaseSummary from "./PurchaseSummary";
import CartProducts from "./CartProducts";

const Cart = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    const { t } = useTranslation();

    const orderToken = useAppSelector(getOrderToken);
    const cart = useAppSelector(getCart);
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

    if (!cart) {
        return <div>Permission denied</div>
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
            <CartProducts
                cart={cart}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            >
            </CartProducts>

            <PurchaseSummary
                cart={cart}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default Cart;