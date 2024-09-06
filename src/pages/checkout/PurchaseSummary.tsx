import * as React from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PurchaseSummaryProps {
	itemCost: string;
	shipmentCost: string;
	totalCost: string;
}

const PurchaseSummary = ({
	itemCost,
	shipmentCost,
	totalCost,
}: PurchaseSummaryProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<Card>
			<Typography variant="h4" sx={{ p: 2 }}>
				{t("cart.purchase-summary")}
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
							<Typography>{t("cart.item-cost")}</Typography>
							<Typography>{itemCost}</Typography>
						</Grid>
						<Grid item container justifyContent="space-between">
							<Typography>{t("cart.shipment-cost")}</Typography>
							<Typography>{shipmentCost}</Typography>
						</Grid>
						<Grid item container justifyContent="space-between">
							<Typography>{t("cart.total-cost")}</Typography>
							<Typography>{totalCost}</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container>
					<Grid item xs />
					<Button
						// href="cart/checkout"
						variant="contained"
						onClick={() => {
							navigate("/checkout/checkout");
						}}
					>
						{t("cart.checkout")}
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default PurchaseSummary;
