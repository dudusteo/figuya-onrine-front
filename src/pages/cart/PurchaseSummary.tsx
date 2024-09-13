import * as React from "react";
import { Button, Card, Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IOrder, RelationType } from "@spree/storefront-api-v2-sdk/dist/*";
import { useAppSelector } from "../../app/hooks";
import { getBearerToken } from "../../features/token/bearerTokenSlice";
import CartService from "../../services/cartService";

interface PurchaseSummaryProps {
	cart: IOrder;
	isLoading: boolean;
}

const PurchaseSummary = ({
	cart, isLoading
}: PurchaseSummaryProps) => {
	const [displayItemTotal, setDisplayItemTotal] = React.useState(cart.data.attributes.display_item_total);
	const { t } = useTranslation();
	const navigate = useNavigate();

	const bearerToken = useAppSelector(getBearerToken);

	React.useEffect(() => {
		setDisplayItemTotal(cart.data.attributes.display_item_total);
	}, [cart]);

	const handleProceed = () => {
		let relationType: RelationType;
		if (Array.isArray(cart.data.relationships.user.data))
			relationType = cart.data.relationships.user.data[0];
		else
			relationType = cart.data.relationships.user.data;

		if (relationType === null) {

			if (bearerToken) {
				console.warn("associate customer");
				CartService.associateCustomer(cart.data.attributes.token, bearerToken).then(() => {
					navigate("/cart/checkout");
				});
			} else {
				console.warn("Should log in first");
			}

			return;
		}

		if (bearerToken) {
			console.warn("already logged in and associated");
			navigate("/cart/checkout");
		} else {
			navigate("/account/login");
		}
	}

	return (
		<Card>
			<Grid
				container
				sx={{ bgcolor: "primary.light", p: 2 }}
				direction="column"
			>
				<Grid item container>
					<Grid item xs={6} />
					<Grid item container direction="column" xs={6}>
						<Grid item container justifyContent="space-between">
							<Typography>{t("cart.item-total")}</Typography>
							{isLoading ? (
								<Skeleton variant="text" width={100} />
							) : (
								<Typography>{displayItemTotal}</Typography>
							)}
						</Grid>
					</Grid>
				</Grid>
				<Grid item container>
					<Grid item xs />
					<Button
						variant="contained"
						onClick={() => handleProceed()}
					>
						{t("cart.place-order")}
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default PurchaseSummary;