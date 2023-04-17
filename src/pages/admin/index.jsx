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
import AuthService from "../../services/auth.service";
import FreeSoloCreateOption from "../../core/free-solo-create-option";
import FigurineService from "../../services/figurine.service";
import { useTranslation } from "react-i18next";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const addServiceSnackbarWrapper = (func) => {
	func.then((result) =>
		enqueueSnackbar(result.message, {
			autoHideDuration: 3000,
			variant: "success",
		})
	).catch((error) =>
		enqueueSnackbar(error.response.data.message, {
			autoHideDuration: 3000,
			variant: "error",
		})
	);
};

const Admin = () => {
	const { t } = useTranslation();
	const [showAdminBoard, setShowAdminBoard] = React.useState(false);

	const [options, setOptions] = React.useState({
		character: [],
		origin: [],
		company: [],
		type: [],
	});

	const [figurines, setFigurines] = React.useState([]);

	React.useEffect(() => {
		const user = AuthService.getCurrentUser();

		if (user) {
			setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
			FigurineService.getOptions().then((data) => setOptions(data));
			FigurineService.getFigurines().then((data) => setFigurines(data));
		}
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

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

	return (
		<SnackbarProvider maxSnack={10}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<CssBaseline />
				{showAdminBoard && (
					<>
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
										FigurineService.addCharacterOption(
											value
										)
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
						<Box>
							{figurines.map((figurine) => (
								<div key={figurine.id}>{figurine.name}</div>
							))}
						</Box>
					</>
				)}
			</Box>
		</SnackbarProvider>
	);
};

export default Admin;
