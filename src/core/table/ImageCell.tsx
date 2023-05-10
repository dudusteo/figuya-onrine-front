import * as React from "react";
import { Image } from "../../interfaces";

const STATIC_URL = process.env.REACT_APP_STATIC_URL;

interface ImageCellProps {
	images: Image[];
}

const ImageCell = ({ images }: ImageCellProps) => {
	const [image, setImage] = React.useState<string>(
		STATIC_URL + images[0].path
	);

	React.useEffect(() => {
		const reader = new FileReader();

		if (images[0] && !images[0].path) {
			fetch(`${STATIC_URL}${images[0].path}`)
				.then((response) => response.blob())
				.then((blob) => {
					reader.readAsDataURL(blob);
					reader.onload = () => {
						setImage(reader.result as string);
					};
				});
		}
	}, [images]);

	return <img width="52px" alt={image} src={image} />;
};

export default ImageCell;
