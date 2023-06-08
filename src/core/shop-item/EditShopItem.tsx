import * as React from "react";

import {
	Box,
	FormControlLabel,
	IconButton,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Figurine, Image } from "../../interfaces";
import FreeSoloCreateOption from "../free-solo-create-option";
import UploadIcon from "@mui/icons-material/Upload";

interface EditShopItemProps {
	item: Figurine;
	setItem: React.Dispatch<React.SetStateAction<Figurine>>;
}

const EditShopItem = ({ item, setItem }: EditShopItemProps) => {
	const { t } = useTranslation();

	const handleName = (newName: string) => {
		setItem((oldItem) => ({ ...oldItem, name: newName }));
	};

	const handlePrice = (newPrice: string) => {
		setItem((oldItem) => ({ ...oldItem, price: newPrice }));
	};

	const handleCondition = (event: React.ChangeEvent<HTMLInputElement>) => {
		setItem((oldItem) => ({
			...oldItem,
			condition: (event.target as HTMLInputElement).value,
		}));
	};

	const handleCharacter = (newCharacter: string) => {
		setItem((oldItem) => ({ ...oldItem, character: newCharacter }));
	};

	const handleOrigin = (newOrigin: string) => {
		setItem((oldItem) => ({ ...oldItem, origin: newOrigin }));
	};

	const handleCompany = (newCompany: string) => {
		setItem((oldItem) => ({ ...oldItem, company: newCompany }));
	};

	const handleType = (newType: string) => {
		setItem((oldItem) => ({ ...oldItem, type: newType }));
	};

	const handleImages = (newImages: Image[]) => {
		setItem((oldItem) => ({ ...oldItem, images: newImages }));
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				m: 4,
			}}
		>
			<IconButton component="label">
				<UploadIcon />
				<input
					hidden
					accept="image/jpeg"
					multiple
					type="file"
					name="images"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (e.target.files) {
							const files = Array.from(e.target.files) as Image[];
							handleImages(files);
						}
					}}
				/>
			</IconButton>
			<TextField
				id="name"
				name="name"
				label={t("item.productName")}
				value={item.name}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					handleName(event.target.value);
				}}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					my: 4,
				}}
			>
				<FreeSoloCreateOption
					value={item.character}
					setValue={handleCharacter}
					id="character"
					options={[{ name: "Hatsune Miku" }]}
					renderInput={(params: object) => (
						<TextField
							{...params}
							label={t("item.character")}
							name="character"
						/>
					)}
				/>

				<FreeSoloCreateOption
					value={item.origin}
					setValue={handleOrigin}
					id="origin"
					options={[{ name: "Vocaloid" }]}
					renderInput={(params) => (
						<TextField
							{...params}
							label={t("item.origin")}
							name="origin"
						/>
					)}
				/>

				<FreeSoloCreateOption
					value={item.company}
					setValue={handleCompany}
					id="company"
					options={[{ name: "SEGA" }]}
					renderInput={(params) => (
						<TextField
							{...params}
							label={t("item.company")}
							name="company"
						/>
					)}
				/>
				<FreeSoloCreateOption
					value={item.type}
					setValue={handleType}
					id="type"
					options={[{ name: "Prize" }]}
					renderInput={(params) => (
						<TextField
							{...params}
							label={t("item.type")}
							name="type"
						/>
					)}
				/>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<RadioGroup
					defaultValue="Used"
					name="condition"
					value={item.condition}
					onChange={handleCondition}
				>
					<FormControlLabel
						value="New"
						control={<Radio />}
						label={t("item.new")}
					/>
					<FormControlLabel
						value="Used"
						control={<Radio />}
						label={t("item.used")}
					/>
					<FormControlLabel
						value="Damaged"
						control={<Radio />}
						label={t("item.damaged")}
					/>
				</RadioGroup>
				<TextField
					value={item.price}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						handlePrice(event.target.value);
					}}
					id="price"
					name="price"
					label={t("item.price")}
				/>
			</Box>
		</Box>
	);
};

export default EditShopItem;
