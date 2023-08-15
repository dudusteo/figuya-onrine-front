import * as React from "react";

const STATIC_URL = import.meta.env.VITE_STATIC_URL;

interface ReactImageProps {
	image: Image;
}

const ReactImage = ({ image }: ReactImageProps) => {
	const [imageData, setImageData] = React.useState<string>(
		STATIC_URL + image.path
	);

	console.log(image);

	React.useEffect(() => {
		const reader = new FileReader();

		if (image && !image.path) {
			reader.onload = () => {
				setImageData(reader.result as string);
			};

			reader.readAsDataURL(image);
		}
	}, [image]);

	return <img alt={imageData} src={imageData} />;
};

export default ReactImage;
