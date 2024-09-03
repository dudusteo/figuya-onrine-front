import { Box, SxProps } from "@mui/material";
import * as React from "react";

interface ReactImageProps extends React.HTMLAttributes<HTMLDivElement> {
	image: string;
	sx?: SxProps;
}

const ReactImage = ({ image, sx, ...rest }: ReactImageProps) => {
	return (
		<Box
			sx={{
				position: "relative",
				overflow: "hidden",
				...sx,
			}}
			{...rest}
		>
			<img
				alt={image}
				src={image}
				style={{
					height: "100%",
					width: "100%",
					objectFit: "cover",
				}}
			/>
		</Box>
	);
};

export default ReactImage;
