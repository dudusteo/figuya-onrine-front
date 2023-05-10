import * as React from "react";

import StaticImage from "../../core/static-image";
import { Box, ImageList, ImageListItem } from "@mui/material";
import ImageDialog from "./ImageDialog";
import { Image } from "../../interfaces";

interface ImageProductProps {
	images: Image[];
}

const ImageProduct = ({ images }: ImageProductProps) => {
	const [openDialog, setOpenDialog] = React.useState(false);
	const [main, setMain] = React.useState<Image>();
	const [rest, setRest] = React.useState<Image[]>([]);

	React.useEffect(() => {
		if (images) {
			setMain(images[0]);
			setRest(images);
		}
	}, [images]);

	if (!main) {
		return <div>Loading...</div>;
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			<StaticImage
				sx={{
					height: "27rem",
					width: "21rem",
					mr: "0.5rem",
				}}
				alt=""
				src={main.path}
				onClick={() => setOpenDialog(true)}
			/>
			<ImageList
				variant="masonry"
				cols={1}
				gap={8}
				sx={{ my: "0px", height: "27rem" }}
			>
				{rest.map((image, index) => (
					<ImageListItem key={index} onClick={() => setMain(image)}>
						<StaticImage
							sx={{
								height: "5rem",
								width: "5rem",
							}}
							alt=""
							src={image.path}
						/>
					</ImageListItem>
				))}
			</ImageList>
			<ImageDialog
				images={images}
				onClose={() => setOpenDialog(false)}
				open={openDialog}
			/>
		</Box>
	);
};

export default ImageProduct;
