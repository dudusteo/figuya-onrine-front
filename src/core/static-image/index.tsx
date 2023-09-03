import { Box, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

const Image = styled("img")({
	height: "100%",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translateX(-50%) translateY(-50%)",
});

interface StaticImageProps extends React.HTMLAttributes<HTMLDivElement> {
	src: string;
	sx?: SxProps;
}

const StaticImage = ({ src, sx, ...rest }: StaticImageProps) => {
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
			<Image alt={src} src={src} />
		</Box>
	);
};

export default StaticImage;
