import { Stack } from '@mui/material'
import React from 'react'
import { CartProduct, LoadingCartProduct } from './CartProduct'
import ProductService from '../../services/productService'
import { IOrder } from '@spree/storefront-api-v2-sdk/dist/*'
import CartService, { CartProduct as CartProductType } from '../../services/cartService'
import { updateOrder } from '../../features/basket/basketSlice'
import { useAppDispatch } from '../../app/hooks'

interface CartProductsProps {
    cart: IOrder,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const CartProducts = ({ cart, isLoading, setIsLoading }: CartProductsProps) => {
    const [products, setProducts] = React.useState<CartProductType[]>([]);
    const [itemCount, setItemCount] = React.useState((cart.included ?? []).filter((item) => item.type === 'variant').length);
    const dispatch = useAppDispatch();
    const orderToken = cart.data.attributes.token;

    React.useEffect(() => {
        if (!cart.included) {
            return;
        }

        const lineItems = cart.included.filter((item) => item.type === 'line_item');
        const variantItems = cart.included.filter((item) => item.type === 'variant');
        const filter = { "filter[ids]": variantItems.map((item) => item.relationships.product.data.id).join(',') };

        if (lineItems.length === 0) {
            setProducts([]);
            setIsLoading(false);
            return;
        }

        setItemCount(variantItems.length);

        ProductService.getProducts(filter).then((products) => {
            const cardProducts = products.filter((product) => {
                const variantId = variantItems.find((item) => item.relationships.product.data.id === product.id)?.id;
                return lineItems.some((item) => item.relationships.variant.data.id === variantId);
            }).map((product) => {
                const variantId = variantItems.find((item) => item.relationships.product.data.id === product.id)?.id;
                const lineItem = lineItems.find((item) => item.relationships.variant.data.id === variantId);
                if (!lineItem) {
                    return product as CartProductType;
                }
                return {
                    quantity: lineItem.attributes.quantity,
                    line_item_id: lineItem.id,
                    ...product
                } as CartProductType;
            });
            setProducts(cardProducts);
            setIsLoading(false);
        });

    }, [cart, setIsLoading]);

    const handleRemoveItem = (cartProduct: CartProductType) => {
        setIsLoading(true);
        CartService.RemoveItem(orderToken, cartProduct.line_item_id).then((order) => {
            dispatch(updateOrder(order));
            setIsLoading(false);
        });
    };

    return (
        <Stack spacing={2} sx={{ my: 2 }}>
            {isLoading ? Array.from({ length: itemCount }).map((_, index) => (
                <LoadingCartProduct key={index} />
            )) :
                products.map((product, key) => (
                    <CartProduct
                        cartProduct={product}
                        handleRemoveItem={handleRemoveItem}
                        key={key}
                    />
                ))}
        </Stack>
    )
}

export default CartProducts