import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography } from "@mui/material";

import { ShopContext } from "../../context/shop-context";

const Image = styled("img")(({ theme, small }) => ({
	height: "100%",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translateX(-50%) translateY(-50%)",
}));

const Product = (props) => {
	const { id, productName, price, productImage } = props.data;
	const { addToCart } = React.useContext(ShopContext);

	return (
		<Paper variant="outlined" sx={{ p: 2 }}>
			<Box
				sx={{
					position: "relative",
					height: "300px",
					width: "220px",
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);",
				}}
			>
				<Image alt="" src={productImage} />
			</Box>
			<Typography>{productName}</Typography>
			<Typography>{price}</Typography>
			<Button variant="outlined" onClick={() => addToCart(id)}>
				Dodaj do koszyka
			</Button>
		</Paper>
	);
};

export default Product;
