import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

const Image = styled("img")(({ theme, small }) => ({
	height: "100%",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translateX(-50%) translateY(-50%)",
}));

const STATIC_URL = process.env.REACT_APP_STATIC_URL;

const StaticImage = (props) => {
	const { src, sx, ...rest } = props;
	return (
		<Box
			sx={{
				position: "relative",
				height: "18rem",
				width: "14rem",
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);",
				...sx,
			}}
			{...rest}
		>
			<Image alt="" src={STATIC_URL + src} />
		</Box>
	);
};

export default StaticImage;
