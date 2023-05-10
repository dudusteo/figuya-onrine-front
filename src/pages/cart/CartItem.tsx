import * as React from "react";
import { ButtonBase, Grid, Paper, Typography } from "@mui/material";

import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";
import StaticImage from "../../core/static-image";
import { Figurine } from "../../interfaces";

interface CartItemProps {
	item: Figurine;
}

const CartItem = ({ item }: CartItemProps) => {
	const { removeFromCart } = React.useContext(ShopContext);
	const { t } = useTranslation();

	const title = item.name + " - " + item.origin + " - " + item.company;
	const priceTitle = t("price") + " " + item.price + " " + t("unit");

	return (
		<Paper
			sx={{
				p: 2,
				flexGrow: 1,
			}}
		>
			<Grid container spacing={2}>
				<Grid item>
					<ButtonBase sx={{ width: 200, height: 200 }}>
						<StaticImage src={item.images[0].path} />
					</ButtonBase>
				</Grid>
				<Grid item xs={12} sm container>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs>
							<Typography
								gutterBottom
								variant="subtitle1"
								component="div"
							>
								{title}
							</Typography>
							<Typography variant="body2" gutterBottom>
								{item.condition}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								ID: {item.id}
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								sx={{ cursor: "pointer" }}
								variant="body2"
								onClick={() => removeFromCart(item.id)}
							>
								Usuń
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant="subtitle1" component="div">
							{priceTitle}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default CartItem;
