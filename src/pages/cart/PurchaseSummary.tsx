import * as React from "react";
import {
	Box,
	Button,
	ButtonBase,
	Card,
	Grid,
	Paper,
	Typography,
} from "@mui/material";

interface PurchaseSummaryProps {}

const PurchaseSummary = ({}: PurchaseSummaryProps) => {
	return (
		<Card>
			<Typography variant="h4" sx={{ p: 2 }}>
				Podsumowanie
			</Typography>

			<Grid
				container
				sx={{ bgcolor: "primary.light", p: 2 }}
				direction="column"
			>
				<Grid item container>
					<Grid item xs={6} />
					<Grid item container direction="column" xs={6}>
						<Grid item container justifyContent="space-between">
							<Typography>Wartość przedmiotów</Typography>
							<Typography>130,00 zł</Typography>
						</Grid>
						<Grid item container justifyContent="space-between">
							<Typography>Wysyłka</Typography>
							<Typography>13,00 zł</Typography>
						</Grid>
						<Grid item container justifyContent="space-between">
							<Typography>Cały koszt</Typography>
							<Typography>143,00 zł</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container>
					<Grid item xs />
					<Button href="cart/checkout" variant="contained">
						ZAMAWIAM
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default PurchaseSummary;
