import * as React from "react";
import { Button, Card, Grid, Typography } from "@mui/material";

interface PurchaseSummaryProps {
	totalCost: number;
	shipmentCost: number;
}

const PurchaseSummary = ({ totalCost, shipmentCost }: PurchaseSummaryProps) => {
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
							<Typography>{totalCost}</Typography>
						</Grid>
						<Grid item container justifyContent="space-between">
							<Typography>Wysyłka</Typography>
							<Typography>{shipmentCost}</Typography>
						</Grid>
						<Grid item container justifyContent="space-between">
							<Typography>Cały koszt</Typography>
							<Typography>{totalCost + shipmentCost}</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container>
					<Grid item xs />
					<Button
						// href="cart/checkout"
						variant="contained"
						onClick={() => {
							//set
						}}
					>
						ZAMAWIAM
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default PurchaseSummary;
