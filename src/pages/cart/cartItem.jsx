import * as React from 'react';
import { Button, ButtonBase, Grid, Paper, styled, Typography } from '@mui/material';

import { ShopContext } from '../../context/shop-context';

const Image = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const CartItem = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { removeFromCart } = React.useContext(ShopContext)
    console.log(id);
    return (
        <Paper
            sx={{
                p: 2,
                maxWidth: 500,
                flexGrow: 1,
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 200, height: 200 }}>
                        <Image alt="complex" src={productImage} />
                    </ButtonBase>
                </Grid>
                <Grid item spacing={{ xs: 2, md: 3 }} >
                    <Typography>{productName}</Typography>
                    <Typography>{price}</Typography>
                    <Button variant="outlined" onClick={() => removeFromCart(id)}>Usuń z koszyka</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CartItem;