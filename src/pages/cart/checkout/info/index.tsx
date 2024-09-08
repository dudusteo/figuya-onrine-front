import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { IOrder } from '@spree/storefront-api-v2-sdk/dist/*';
import ProductService from '../../../../services/productService';
import { ListItemAvatar } from '@mui/material';
import ReactImage from '../../../../core/react-image';
import { CartProduct } from '../../../../services/cartService';

interface InfoProps {
    cart: IOrder;
}

const Info = ({ cart }: InfoProps) => {
    const { t } = useTranslation();
    const [products, setProducts] = React.useState<CartProduct[]>([]);

    React.useEffect(() => {
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

    return (
        <React.Fragment>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {t('cart.info.total')}
            </Typography>
            <Typography variant="h4" gutterBottom>
                {cart.data.attributes.display_item_total}
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.line_item_id} sx={{ py: 1, px: 0 }}>
                        <ListItemAvatar sx={{ mr: 2 }}>
                            <ReactImage
                                image={product.images[0]} sx={{ width: "3.5rem", height: "5rem" }}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            sx={{ mr: 2 }}
                            primary={product.quantity + "x " + product.attributes.name}
                            secondary={product.attributes.description}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {product.attributes.display_price}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}

export default Info;