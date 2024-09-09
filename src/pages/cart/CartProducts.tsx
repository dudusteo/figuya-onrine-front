import { Stack } from '@mui/material'
import React from 'react'
import CartProduct from './CartProduct'
import ProductService from '../../services/productService'
import { IOrder } from '@spree/storefront-api-v2-sdk/dist/*'

interface CartProductsProps {
    cart: IOrder | null,
}

const CartProducts = ({ cart }: CartProductsProps) => {
    const [products, setProducts] = React.useState<CartProduct[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

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
            setIsLoading(false);
        });

    }, [cart])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Stack spacing={2} sx={{ my: 2 }}>
            {products.map((product, key) => (
                <CartProduct
                    cartProduct={product}
                    key={key}
                />
            ))}
        </Stack>
    )
}

export default CartProducts