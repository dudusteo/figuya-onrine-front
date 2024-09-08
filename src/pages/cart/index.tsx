import * as React from "react";

import { Box, CssBaseline, Stack, Typography } from "@mui/material";

import CartService from "../../services/cartService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";
import {
    getOrderToken,
    setOrderToken,
} from "../../features/token/orderTokenSlice";
import CartProduct from "./CartProduct";
import { getCart, updateOrder } from "../../features/basket/basketSlice";
import { useTranslation } from "react-i18next";
import PurchaseSummary from "./PurchaseSummary";
import ProductService from "../../services/productService";

const Cart = () => {
    const { t } = useTranslation();
    const [products, setProducts] = React.useState<CartProduct[]>([]);
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



    React.useEffect(() => {
        if (!cart) {
            return;
        }

        if (!cart.included) {
            return;
        }

        const lineItems = cart.included.filter((item) => item.type === 'line_item');
        const variantItems = cart.included.filter((item) => item.type === 'variant');
        const filter = { "filter[ids]": variantItems.map((item) => item.relationships.product.data.id).join(',') };

        ProductService.getProducts(filter).then((products) => {
            const cardProducts = products.filter((product) => {
                const variantId = variantItems.find((item) => item.relationships.product.data.id === product.id)?.id;
                return lineItems.some((item) => item.relationships.variant.data.id === variantId);
            }).map((product) => {
                const variantId = variantItems.find((item) => item.relationships.product.data.id === product.id)?.id;
                const lineItem = lineItems.find((item) => item.relationships.variant.data.id === variantId);
                if (!lineItem) {
                    return product as CartProduct;
                }
                return {
                    quantity: lineItem.attributes.quantity,
                    line_item_id: lineItem.id,
                    ...product
                } as CartProduct;
            });
            setProducts(cardProducts);
        });

    }, [cart])

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
                {products.map((product, key) => (
                    <CartProduct
                        cartProduct={product}
                        key={key}
                    />
                ))}
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