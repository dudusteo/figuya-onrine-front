import * as React from "react";
import {
	Box,
	Button,
	ButtonBase,
	Grid,
	Paper,
	Typography,
} from "@mui/material";

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
					<StaticImage
						sx={{ height: "13.5rem", width: "10.5rem" }}
						src={item.images[0].path}
					/>
				</Grid>

				<Grid item sm container direction="column">
					<Grid item xs>
						<Typography variant="h5" sx={{ color: "primary.main" }}>
							{title}
						</Typography>
					</Grid>

					<Grid item>
						<Typography
							align="right"
							sx={{ cursor: "pointer" }}
							variant="body2"
							onClick={() => removeFromCart(item.id)}
						>
							Usuń
						</Typography>
						<Typography
							align="right"
							variant="h4"
							sx={{
								color: "primary.main",
								fontWeight: "bold",
								my: 1,
							}}
						>
							{priceTitle}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default CartItem;
