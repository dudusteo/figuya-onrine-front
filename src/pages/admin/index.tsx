import * as React from "react";

import {
	Box,
	Button,
	CssBaseline,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import ShopItem from "../../core/shop-item";
import EditShopItem from "../../core/shop-item/EditShopItem";
import AdminService from "../../services/adminService";

const emptyFigurine: Figurine = {
	id: 0,
	name: "placeholderName",
	character: "placeholderCharacter",
	origin: "placeholderOrigin",
	company: "placeholderCompany",
	type: "placeholderType",
	condition: "Used",
	price: "0.00",
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

	const handleSubmit = () => {
		console.log(figurine);
		AdminService.createFigurine(figurine).then((status: number) => {
			console.log("AdminService.createFigurine status: " + status);
		});
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
			<Button sx={{ p: 1 }} variant="contained" onClick={handleSubmit}>
				{"Submit"}
			</Button>
			{!preview && <EditShopItem item={figurine} setItem={setFigurine} />}
			{preview && <ShopItem item={figurine} />}
		</Box>
	);
};

export default Admin;
