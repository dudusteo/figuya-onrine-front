import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import CheckoutForm from "../../../core/checkout-form"

const Checkout = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
        }}>
            <CssBaseline />

            <CheckoutForm />

        </Box >
    );
}

export default Checkout;


