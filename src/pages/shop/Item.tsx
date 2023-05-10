import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography } from "@mui/material";

import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Figurine } from "../../interfaces";

const Image = styled("img")(({ theme }) => ({
	height: "100%",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translateX(-50%) translateY(-50%)",
}));

const STATIC_URL = process.env.REACT_APP_STATIC_URL;

interface ItemProps {
	item: Figurine;
}

const Item = ({ item }: ItemProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { addToCart } = React.useContext(ShopContext);

	const title = item.name + " - " + item.origin + " - " + item.company;
	const priceTitle = t("price") + " " + item.price + " " + t("unit");

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
			onClick={() => navigate(`/item/${item.id}`)}
		>
			<Box
				sx={{
					position: "relative",
					height: "18rem",
					width: "14rem",
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);",
				}}
			>
				<Image alt="" src={STATIC_URL + item.images[0]?.path} />
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
			<Button
				variant="contained"
				onClick={(e) => {
					e.stopPropagation();
					addToCart(item);
				}}
			>
				{t("add-to-cart")}
			</Button>
		</Paper>
	);
};

export default Item;
