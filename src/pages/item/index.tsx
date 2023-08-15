import * as React from "react";

import {
	Box,
	Breadcrumbs,
	Button,
	CssBaseline,
	Link,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";
import ImageProduct from "../../core/shop-item/ImageProduct";
import FigurineService from "../../services/figurineService";
import ShopItem from "../../core/shop-item";

const Item = () => {
	const { itemId } = useParams<{ itemId: string }>();
	const [item, setItem] = React.useState<Figurine>();

	const { addToCart } = React.useContext(ShopContext);

	React.useEffect(() => {
		if (itemId) {
			FigurineService.getFigurineById(parseInt(itemId)).then(
				(data: Figurine) => setItem(data)
			);
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
