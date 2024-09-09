import * as React from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";

interface PurchaseSummaryProps {
	cart: IOrder | null;
}

const PurchaseSummary = ({
	cart
}: PurchaseSummaryProps) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [cost, setCost] = React.useState({ itemCost: "0", shipmentCost: "0", totalCost: "0" });
	const { t } = useTranslation();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!cart) {
			return;
		}

		setCost({
			itemCost: cart.data.attributes.display_item_total,
			shipmentCost: cart.data.attributes.display_ship_total,
			totalCost: cart.data.attributes.display_total
		});
		setIsLoading(false);
	}, [cart]);

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
							<Typography>{cost.itemCost}</Typography>
						</Grid>
						<Grid item container justifyContent="space-between">
							<Typography>{t("cart.shipment-cost")}</Typography>
							<Typography>{cost.shipmentCost}</Typography>
						</Grid>
						<Grid item container justifyContent="space-between">
							<Typography>{t("cart.total-cost")}</Typography>
							<Typography>{cost.totalCost}</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container>
					<Grid item xs />
					<Button
						//href="cart/checkout"
						variant="contained"
						onClick={() => {
							navigate("/cart/checkout");
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
