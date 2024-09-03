import * as React from "react";

import { Box, ImageList, ImageListItem } from "@mui/material";
import ImageDialog from "./ImageDialog";
import ReactImage from "../react-image";

interface ImageProductProps {
	images: string[];
}

const ImageProduct = ({ images }: ImageProductProps) => {
	const [openDialog, setOpenDialog] = React.useState(false);
	const [main, setMain] = React.useState<string | null>(null);
	const [rest, setRest] = React.useState<string[]>([]);

	React.useEffect(() => {
		if (images) {
			setMain(images[0]);
			setRest(images);
		}
	}, [images]);

	if (main === null) {
		return <div>Loading...</div>;
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			<ReactImage image={main} sx={{ height: "30rem" }} onClick={() => setOpenDialog(true)} />

			<ImageList
				variant="masonry"
				cols={1}
				gap={8}
				sx={{ my: "0px", height: "27rem" }}
			>
				{rest.map((image, index) => (
					<ImageListItem key={index} onClick={() => setMain(image)}>
						<ReactImage
							sx={{
								height: "5rem",
								width: "5rem",
							}}
							image={image}
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
