import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { Grid } from "@mui/material";
import { PRODUCTS } from "../../products";
import Product from "./product";

const Shop = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <CssBaseline />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 12, md: 16 }}>
                {PRODUCTS.map((product) =>
                    <Grid item xs={2} sm={4} md={4} key={product.id} >
                        <Product data={product} />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default Shop;


