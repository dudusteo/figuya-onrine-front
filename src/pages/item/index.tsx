import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import { useParams } from "react-router-dom";

import ShopItem from "../../core/shop-item";

const Item = () => {
	const { itemId } = useParams<{ itemId: string }>();
	const [item, setItem] = React.useState<Figurine>();

	React.useEffect(() => {
		if (itemId) {
			// FigurineService.getFigurineById(parseInt(itemId)).then(
			// 	(data: Figurine) => setItem(data)
			// );
		}
	}, [itemId]);

	if (!item) {
		return <div>Loading...</div>;
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				m: 4,
			}}
		>
			<CssBaseline />

			<ShopItem item={item}></ShopItem>
		</Box>
	);
};

export default Item;
