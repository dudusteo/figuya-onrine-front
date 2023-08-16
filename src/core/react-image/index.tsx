import { Box, SxProps } from "@mui/material";
import * as React from "react";

const STATIC_URL = import.meta.env.VITE_STATIC_URL;

interface ReactImageProps extends React.HTMLAttributes<HTMLDivElement> {
	image: Image;
	sx?: SxProps;
}

const ReactImage = ({ image, sx, ...rest }: ReactImageProps) => {
	const [imageData, setImageData] = React.useState<string | undefined>(
		undefined
	);

	React.useEffect(() => {
		const reader = new FileReader();

		if (image && !image.path) {
			reader.onload = () => {
				setImageData(reader.result as string);
			};

			reader.readAsDataURL(image);
		} else {
			setImageData(STATIC_URL + image.path);
		}
	}, [image]);

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
			<img alt={imageData} src={imageData} height="100%" />
		</Box>
	);
};

export default ReactImage;
