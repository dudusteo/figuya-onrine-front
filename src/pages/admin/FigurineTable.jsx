import * as React from "react";

import {
	Box,
	Button,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";

import FigurineService from "../../services/figurine.service";
import { enqueueSnackbar } from "notistack";
import { addServiceSnackbarWrapper } from "../../utils";
import FreeSoloCreateOption from "../../core/free-solo-create-option";
import { useTranslation } from "react-i18next";
import Table from "../../core/table";
import ImageCell from "../../core/table/ImageCell";

const FigurineTable = (props) => {
	const { currentPackage, ...rest } = props;
	const { t } = useTranslation();
	const [options, setOptions] = React.useState({
		character: [],
		origin: [],
		company: [],
		type: [],
	});

	const [figurines, setFigurines] = React.useState([]);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		FigurineService.getOptions().then((data) => setOptions(data));
		FigurineService.getFigurinesByPackage(currentPackage).then((data) =>
			setFigurines(data)
		);
	}, [currentPackage]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		data.append("packageName", currentPackage);

		let count = 0;

		for (let [key, value] of data.entries()) {
			if (
				(typeof value === "string" && value.length === 0) ||
				(key === "images" && value.size === 0)
			) {
				count++;
				enqueueSnackbar("Puste pole: " + key, {
					autoHideDuration: 3000,
					variant: "error",
				});
			}
		}
		if (count === 0) {
			addServiceSnackbarWrapper(FigurineService.addFigurine(data));
		}
	};

	const columns = [
		{ field: "id", headerName: "ID", width: 80 },
		{
			field: "images",
			headerName: "Image",
			width: 150,
			renderCell: (params) => <ImageCell value={params.value} />,
		},
		{
			field: "name",
			headerName: t("item.productName"),
			flex: 1,
			editable: true,
		},
		{
			field: "condition",
			headerName: t("item.condition"),
			flex: 1,
			editable: true,
		},
		{
			field: "price",
			headerName: t("item.price"),
			flex: 1,
			editable: true,
		},
		{
			field: "character",
			headerName: t("item.character"),
			flex: 1,
			editable: true,
		},
		{
			field: "origin",
			headerName: t("item.origin"),
			flex: 1,
			editable: true,
		},
		{
			field: "company",
			headerName: t("item.company"),
			flex: 1,
			editable: true,
		},
		{ field: "type", headerName: t("item.type"), flex: 1, editable: true },
	];

	return (
		<Box {...rest}>
			<Table
				rows={figurines}
				columns={columns}
				addRow={FigurineService.addFigurine}
				deleteRow={FigurineService.removeFigurine}
				uploadImage={setOpen}
			/>

			<Box
				component="form"
				onSubmit={handleSubmit}
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
				/>

				<FreeSoloCreateOption
					addOption={(value) =>
						addServiceSnackbarWrapper(
							FigurineService.addCharacterOption(value)
						)
					}
					id="character"
					options={options.character}
					renderInput={(params) => (
						<TextField
							{...params}
							label={t("item.character")}
							name="character"
						/>
					)}
				/>
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
				/>

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

				<TextField id="price" name="price" label={t("item.price")} />
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
		</Box>
	);
};

export default FigurineTable;
