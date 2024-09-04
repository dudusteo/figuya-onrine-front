import * as React from "react";
import { Box, CssBaseline, TextField, Button, Typography } from "@mui/material";


const Checkout = () => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                padding: "1rem",
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
                Proszę wprowadź swoje dane (*Pola wymagane):
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <TextField label="Imię" required fullWidth sx={{ marginBottom: "1rem" }} />
                <TextField label="Nazwisko" required fullWidth sx={{ marginBottom: "1rem" }} />
                <TextField label="E-mail" type="email" required fullWidth sx={{ marginBottom: "1rem" }} />
                <TextField label="Ulica" required fullWidth sx={{ marginBottom: "1rem" }} />
                <TextField label="Miasto" required fullWidth sx={{ marginBottom: "1rem" }} />
                <TextField label="Kod pocztowy" required fullWidth sx={{ marginBottom: "1rem" }} />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Wybór sposobu wysyłki
                </Button>
            </form>
            <CssBaseline />
        </Box>
    );
};

export default Checkout;
