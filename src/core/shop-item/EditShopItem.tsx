import * as React from "react";

import {
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Figurine } from "../../interfaces";
import FreeSoloCreateOption from "../free-solo-create-option";

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

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				m: 4,
			}}
		>
			<TextField
				id="name"
				name="name"
				label={t("item.productName")}
				value={item.name}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					handleName(event.target.value);
				}}
			/>

			<FreeSoloCreateOption
				// addOption={(value) =>
				// 	addServiceSnackbarWrapper(
				// 		FigurineService.addCharacterOption(value)
				// 	)
				// }
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
				// addOption={(value) =>
				// 	addServiceSnackbarWrapper(
				// 		FigurineService.addOriginOption(value)
				// 	)
				// }
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
				// addOption={(value) =>
				// 	addServiceSnackbarWrapper(
				// 		FigurineService.addCompanyOption(value)
				// 	)
				// }
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
				// addOption={(value) =>
				// 	addServiceSnackbarWrapper(
				// 		FigurineService.addTypeOption(value)
				// 	)
				// }
				value={item.type}
				setValue={handleType}
				id="type"
				options={[{ name: "Prize" }]}
				renderInput={(params) => (
					<TextField {...params} label={t("item.type")} name="type" />
				)}
			/>

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
	);
};

export default EditShopItem;
