import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { IOrder } from '@spree/storefront-api-v2-sdk/dist/*';
import ProductService, { Product } from '../../../services/productService';

interface InfoProps {
    cart: IOrder;
}

interface CardProduct extends Product {
    quantity: number;
    lineItemId: string;
}

const Info = ({ cart }: InfoProps) => {
    const { t } = useTranslation();
    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        let relationType = [];
        if (Array.isArray(cart.data.relationships.variants.data)) {
            relationType = cart.data.relationships.variants.data;
        }
        else
            relationType.push(cart.data.relationships.variants.data);

        const filter = { "filter[ids]": relationType.map((item) => item.id).join(',') };
        ProductService.getProducts(filter).then((products) => {
            setProducts(products);
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
                    <ListItem key={product.attributes.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            sx={{ mr: 2 }}
                            primary={product.attributes.name}
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