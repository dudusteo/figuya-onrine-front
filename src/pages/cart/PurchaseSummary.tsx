import * as React from "react";
import { Button, Card, Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";

interface PurchaseSummaryProps {
	cart: IOrder;
	isLoading: boolean;
}

const PurchaseSummary = ({
	cart, isLoading
}: PurchaseSummaryProps) => {
	const [displayItemCost, setDisplayItemCost] = React.useState(cart.data.attributes.display_item_total);
	const { t } = useTranslation();
	const navigate = useNavigate();

	React.useEffect(() => {
		setDisplayItemCost(cart.data.attributes.display_item_total);
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
							{isLoading ? (
								<Skeleton variant="text" width={100} />
							) : (
								<Typography>{displayItemCost}</Typography>
							)}
						</Grid>
					</Grid>
				</Grid>
				<Grid item container>
					<Grid item xs />
					<Button
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