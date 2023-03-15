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
    const { id, productName, origin, company, type, price, productImage } = props.data;
    const { removeFromCart } = React.useContext(ShopContext)

    return (
        <Paper
            sx={{
                p: 2,
                flexGrow: 1,
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 200, height: 200 }}>
                        <Image alt="complex" src={productImage} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {productName} - {company} {type}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {origin}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ID: {id}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2" onClick={() => removeFromCart(id)}>
                                Usuń
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            {price} PLN
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CartItem;