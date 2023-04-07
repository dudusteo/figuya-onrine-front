import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../../products";

const Image = styled("img")(({ theme, small }) => ({
	height: "100%",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translateX(-50%) translateY(-50%)",
}));

const Item = (props) => {
	const { itemId } = useParams();
	const { productImage } = PRODUCTS[0];
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				m: 4,
			}}
		>
			<CssBaseline />
			<Box
				sx={{
					position: "relative",
					height: "24rem",
					width: "18em",
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);",
				}}
			>
				<Image alt="" src={productImage}></Image>
			</Box>
			{itemId}
		</Box>
	);
};

export default Item;
