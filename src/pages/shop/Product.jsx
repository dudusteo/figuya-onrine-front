import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography } from "@mui/material";

import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";

const Image = styled("img")(({ theme, small }) => ({
	height: "100%",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translateX(-50%) translateY(-50%)",
}));

const Product = (props) => {
	const { id, productName, origin, company, type, price, productImage } =
		props.data;

	const { t } = useTranslation();
	const { addToCart } = React.useContext(ShopContext);

	const title = productName + " - " + origin + " - " + company;
	const priceTitle = t("price") + " " + price.toFixed(2) + " " + t("unit");

	return (
		<Paper
			variant="outlined"
			sx={{
				p: 2,
				width: "16rem",
				height: "30rem",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box
				sx={{
					position: "relative",
					height: "18rem",
					width: "14rem",
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);",
				}}
			>
				<Image alt="" src={productImage} />
			</Box>
			<Box sx={{ flexGrow: 1, py: 1 }}>
				<Typography variant="subtitle2" sx={{ color: "primary.main" }}>
					{title}
				</Typography>
			</Box>

			<Typography
				variant="h6"
				align="right"
				sx={{ color: "primary.main" }}
			>
				{priceTitle}
			</Typography>
			<Button variant="contained" onClick={() => addToCart(id)}>
				{t("add-to-cart")}
			</Button>
		</Paper>
	);
};

export default Product;
