import * as React from "react";

import {
	Box,
	Button,
	CssBaseline,
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

	const handleCharacter = (newCharacter: string) => {
		setItem((oldItem) => ({ ...oldItem, character: newCharacter }));
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
			<CssBaseline />
			<>
				<Box
					component="form"
					//onSubmit={handleSubmit}
					noValidate
					sx={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<TextField
						id="name"
						name="name"
						label={t("item.productName")}
						value={item.name}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							handleName(event.target.value);
						}}
					/>

					<FreeSoloCreateOption
						// addOption={(value) =>
						// 	addServiceSnackbarWrapper(
						// 		FigurineService.addCharacterOption(value)
						// 	)
						// }
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
					{/*
					<FreeSoloCreateOption
						addOption={(value) =>
							addServiceSnackbarWrapper(
								FigurineService.addOriginOption(value)
							)
						}
						id="origin"
						options={options.origin}
						renderInput={(params) => (
							<TextField
								{...params}
								label={t("item.origin")}
								name="origin"
							/>
						)}
					/>
					<FreeSoloCreateOption
						addOption={(value) =>
							addServiceSnackbarWrapper(
								FigurineService.addCompanyOption(value)
							)
						}
						id="company"
						options={options.company}
						renderInput={(params) => (
							<TextField
								{...params}
								label={t("item.company")}
								name="company"
							/>
						)}
					/>
					<FreeSoloCreateOption
						addOption={(value) =>
							addServiceSnackbarWrapper(
								FigurineService.addTypeOption(value)
							)
						}
						id="type"
						options={options.type}
						renderInput={(params) => (
							<TextField
								{...params}
								label={t("item.type")}
								name="type"
							/>
						)}
					/> */}

					<RadioGroup defaultValue="Used" name="condition">
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
						id="price"
						name="price"
						label={t("item.price")}
					/>
					<Button variant="contained" component="label">
						{t("button.upload")}
						<input
							hidden
							accept="image/jpeg"
							multiple
							type="file"
							name="images"
						/>
					</Button>
					<Button variant="contained" type="submit">
						{t("button.add")}
					</Button>
				</Box>
			</>
		</Box>
	);
};

export default EditShopItem;
