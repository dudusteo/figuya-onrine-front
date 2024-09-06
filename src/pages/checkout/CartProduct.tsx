import * as React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import CartService from "../../services/checkoutService";
import Product from "../product";
import ReactImage from "../../core/react-image";
import ProductService from "../../services/productService";
import { useAppDispatch } from "../../app/hooks";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";
import { updateOrder } from "../../features/basket/basketSlice";

interface CartProductProps {
	productId: string;
	lineItemId: string;
	orderToken: string;
}

const CartProduct = ({
	productId,
	lineItemId,
	orderToken,
}: CartProductProps) => {
	const { t } = useTranslation();
	const [product, setProduct] = React.useState<Product | null>(null);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		ProductService.getProduct(productId).then((product: Product) => {
			setProduct(product);
		});
	}, [orderToken, productId]);

	if (!product) {
		return null;
	}

	const title = product.attributes.name;
	const priceTitle = product.attributes.display_price;

	const handleRemoveItem = () => {
		CartService.RemoveItem(orderToken, lineItemId).then((order: IOrder) => {
			dispatch(updateOrder(order));
		});
	};

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
						image={product.images[0]}
					/>
				</Grid>

				<Grid item sm container direction="column">
					<Grid item xs>
						<Typography variant="h5" sx={{ color: "primary.main" }}>
							{title}
						</Typography>
					</Grid>

					<Grid item>
						<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
							<Typography
								sx={{ cursor: "pointer" }}
								variant="body2"
								onClick={() => handleRemoveItem()}
							>
								{t("cart.remove")}
							</Typography>
						</Box>
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

export default CartProduct;
