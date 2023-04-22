import * as React from "react";

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";
import { addServiceSnackbarWrapper } from "../../utils";
import { useTranslation } from "react-i18next";

const Table = (props) => {
	const { columns, rows, submit, onSelect, ...rest } = props;
	const { t } = useTranslation();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		let count = 0;

		for (let [key, value] of data.entries()) {
			if (typeof value === "string" && value.length === 0) {
				count++;
				enqueueSnackbar("Empty key: " + key, {
					autoHideDuration: 3000,
					variant: "error",
				});
			}
		}
		if (count === 0) {
			addServiceSnackbarWrapper(submit(data));
		}
	};

	const [selectionModel, setSelectionModel] = React.useState([]);

	const handleSelectionChange = (newSelection) => {
		if (newSelection.length > 1) {
			setSelectionModel([newSelection[newSelection.length - 1]]);
		} else {
			setSelectionModel(newSelection);
		}
	};

	return (
		<Box {...rest}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={20}
				rowsPerPageOptions={[5]}
				checkboxSelection
				autoHeight
				onRowSelectionModelChange={handleSelectionChange}
				rowSelectionModel={selectionModel}
			/>
			<Box sx={{ display: "flex" }}>
				<Box sx={{ flexGrow: 1 }}></Box>
				<Button onClick={handleClickOpen} variant="contained">
					{t("button.add")}
				</Button>
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
				component="form"
				noValidate
				onSubmit={handleSubmit}
			>
				<DialogTitle>Add package</DialogTitle>
				<DialogContent>
					<DialogContentText>Add package</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="Package number"
						name="packageName"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						label="Item cost"
						name="itemCost"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						label="Shipment cost"
						name="shipmentCost"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						label="Additional cost"
						name="additionalCost"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>{t("button.cancel")}</Button>
					<Button onClick={handleClose} type="submit">
						{t("button.add")}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Table;
