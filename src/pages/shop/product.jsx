import * as React from 'react';
import Image from 'mui-image'
import { Box, Button, Typography } from '@mui/material';

import { ShopContext } from '../../context/shop-context';

const Product = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { addToCart } = React.useContext(ShopContext)

    return (
        <Box sx={{ height: "50%" }}>
            <Image alt="" src={productImage} duration={0} fit="scale-down" />
            <Typography>{productName}</Typography>
            <Typography>{price}</Typography>
            <Button variant="outlined" onClick={() => addToCart(id)}>Dodaj do koszyka</Button>
        </Box>
    );
}

export default Product;