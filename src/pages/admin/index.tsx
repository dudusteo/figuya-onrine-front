import * as React from "react";

import {
	Box,
	CssBaseline,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import ShopItem from "../../core/shop-item";
import { Figurine } from "../../interfaces";
import EditShopItem from "../../core/shop-item/EditShopItem";

const emptyFigurine: Figurine = {
	id: 0,
	name: "placeholderName",
	character: "placeholderCharacter",
	origin: "placeholderOrigin",
	company: "placeholderCompany",
	type: "placeholderType",
	condition: "placeholderCondition",
	price: 0,
	images: [],
};

const Admin = () => {
	const [figurine, setFigurine] = React.useState<Figurine>(emptyFigurine);
	const [preview, setPreview] = React.useState<boolean>(false);

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newPreview: boolean | null
	) => {
		if (newPreview !== null) {
			setPreview(newPreview);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			<ToggleButtonGroup
				value={preview}
				exclusive
				onChange={handleChange}
				aria-label="text alignment"
			>
				<ToggleButton value={false}>Edit</ToggleButton>
				<ToggleButton value={true}>Preview</ToggleButton>
			</ToggleButtonGroup>
			{!preview && (
				<EditShopItem
					item={figurine}
					setItem={setFigurine}
				></EditShopItem>
			)}
			{preview && <ShopItem item={figurine}></ShopItem>}
		</Box>
	);
};

export default Admin;
