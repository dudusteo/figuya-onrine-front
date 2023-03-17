import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import SignIn from "../../../core/sign-in"

const Login = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
        }}>
            <CssBaseline />
            <SignIn />
        </Box >
    );
}

export default Login;


