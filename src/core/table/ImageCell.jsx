import * as React from "react";

const STATIC_URL = process.env.REACT_APP_STATIC_URL;

const ImageCell = ({ value }) => {
	const [image, setImage] = React.useState("");

	React.useEffect(() => {
		const reader = new FileReader();

		if (value?.[0] && !value?.[0]?.path) {
			reader.readAsDataURL(value[0]);
			reader.onload = () => {
				setImage(reader.result);
			};
		}
	}, [value]);

	const path = STATIC_URL + value?.[0]?.path;

	return <img width="52px" alt={path} src={image || path} />;
};

export default ImageCell;
