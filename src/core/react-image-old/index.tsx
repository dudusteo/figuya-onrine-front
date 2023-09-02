import { Box, SxProps } from "@mui/material";
import * as React from "react";

interface ReactImageProps extends React.HTMLAttributes<HTMLDivElement> {
	image: string;
	sx?: SxProps;
}

const ReactImageOld = ({ image, sx, ...rest }: ReactImageProps) => {
	return (
		<Box
			sx={{
				height: "27rem",
				width: "21rem",
				mr: "0.5rem",
				position: "relative",
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);",
				...sx,
			}}
			{...rest}
		>
			<img alt={image} src={image} height="100%" />
		</Box>
	);
};

export default ReactImageOld;
