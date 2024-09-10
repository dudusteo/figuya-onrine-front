import * as React from "react";
import { Grid, Paper, Typography, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactImage from "../../core/react-image";
import type { CartProduct as CartProductType } from "../../services/cartService";

interface CartProductProps {
	cartProduct: CartProductType;
	handleRemoveItem: (cartProduct: CartProductType) => void;
}

const CartProduct = ({ cartProduct, handleRemoveItem }: CartProductProps) => {
	const { t } = useTranslation();

	const title = cartProduct.attributes.name;
	const priceTitle = cartProduct.attributes.display_price;

	return (
		<Paper
			sx={{
				p: 2,
				flexGrow: 1,
			}}
		>
			<Grid container spacing={2}>
				<Grid item>
					<ReactImage
						sx={{ height: "13.5rem", width: "10.5rem" }}
						image={cartProduct.images[0]}
					/>
				</Grid>

				<Grid item sm container direction="column">
					<Grid item xs>
						<Typography variant="h5" sx={{ color: "primary.main" }}>
							{title}
						</Typography>
					</Grid>

					<Grid item sx={{ display: "flex", justifyContent: "right" }}>
						<Typography
							sx={{ cursor: "pointer" }}
							variant="body2"
							onClick={() => handleRemoveItem(cartProduct)}
						>
							{t("cart.remove")}
						</Typography>
					</Grid>

					<Grid item sx={{ display: "flex", justifyContent: "right" }}>
						<Typography
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

const LoadingCartProduct = () => {
	return (
		<Paper
			sx={{
				p: 2,
				flexGrow: 1,
			}}
		>
			<Grid container spacing={2}>
				<Grid item>
					<Skeleton variant="rectangular" width={168} height={216} />
				</Grid>

				<Grid item sm container direction="column">
					<Grid item xs>
						<Typography variant="h5" sx={{ color: "primary.main" }} >
							<Skeleton width="10rem" />
						</Typography>
					</Grid>

					<Grid item sx={{ display: "flex", justifyContent: "right" }}>
						<Typography
							sx={{ cursor: "pointer" }}
							variant="body2"
						>
							<Skeleton width="4rem" />
						</Typography>
					</Grid>
					<Grid item sx={{ display: "flex", justifyContent: "right" }}>
						<Typography
							align="right"
							variant="h4"
							sx={{
								color: "primary.main",
								fontWeight: "bold",
								my: 1,
							}}
						>
							<Skeleton width="6rem" />
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export { CartProduct, LoadingCartProduct };