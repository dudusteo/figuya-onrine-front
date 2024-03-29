import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import * as React from "react";
import StaticImage from "../static-image";

import PhotoLibrary from "@mui/icons-material/PhotoLibrary";

interface ImageDialogProps {
	images: string[];
	open: boolean;
	onClose: () => void;
}

const ImageDialog = ({ images = [], open, onClose }: ImageDialogProps) => {
	const [selectedImage, setSelectedImage] = React.useState<string>(images[0]);

	const handleListItemClick = (image: string) => {
		setSelectedImage(image);
	};

	const handleOkClick = () => {
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
			<DialogTitle>Select an image</DialogTitle>
			<DialogContent>
				{images.length > 0 ? (
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<List disablePadding>
								{images.map((image, index) => (
									<ListItem
										key={index}
										button
										selected={selectedImage === image}
										onClick={() =>
											handleListItemClick(image)
										}
									>
										<ListItemIcon>
											<PhotoLibrary />
										</ListItemIcon>
										<ListItemText primary={index} />
									</ListItem>
								))}
							</List>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography
								variant="h6"
								component="h3"
								gutterBottom
							>
								Selected image
							</Typography>
							{selectedImage ? (
								<StaticImage src={selectedImage} />
							) : (
								<Typography
									variant="body2"
									color="textSecondary"
								>
									No image selected
								</Typography>
							)}
						</Grid>
					</Grid>
				) : (
					<Typography variant="body2" color="textSecondary">
						No images available
					</Typography>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					onClick={handleOkClick}
					disabled={!selectedImage}
					color="primary"
				>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ImageDialog;
