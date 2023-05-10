import * as React from "react";

import { Box, Button, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";

import {
	DataGrid,
	GridActionsCellItem,
	GridColDef,
	GridRowId,
	GridRowModes,
	GridRowModesModel,
	GridRowParams,
	GridRowSelectionModel,
	GridToolbarContainer,
	MuiBaseEvent,
	MuiEvent,
} from "@mui/x-data-grid";

import UtilsService from "../../services/utils.service";

interface EditToolbarProps {
	setRows: React.Dispatch<React.SetStateAction<Row[]>>;
	setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
	emptyRow: EmptyRow;
	tableName: string;
}

const EditToolbar = ({
	setRows,
	setRowModesModel,
	emptyRow,
	tableName,
}: EditToolbarProps) => {
	const handleClick = () => {
		UtilsService.getNextAutoIncrementId(tableName).then((id: GridRowId) => {
			setRows((prevRows: Row[]) => [
				...prevRows,
				{ id, ...emptyRow, isNew: true },
			]);
			setRowModesModel((oldModel: GridRowModesModel) => ({
				...oldModel,
				[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
			}));
		});
	};

	return (
		<GridToolbarContainer>
			<Button
				color="primary"
				startIcon={<AddIcon />}
				onClick={handleClick}
			>
				Add record
			</Button>
		</GridToolbarContainer>
	);
};

interface Row {
	id: GridRowId;
	mode?: boolean;
	isNew?: boolean;
	images?: FileList;
}

interface EmptyRow {
	mode?: boolean;
	isNew?: boolean;
	images?: FileList;
}

interface TableProps {
	addRow: (row: Row) => void;
	deleteRow: (id: number) => void;
	columns: GridColDef[];
	rows: any[];
	tableName: string;
	onSelect?: (id: number) => void;
}

const Table = ({
	addRow,
	deleteRow,
	columns: initialColumns,
	rows: initialRows,
	onSelect,
	tableName,
	...rest
}: TableProps) => {
	const [columns, setColumns] = React.useState(initialColumns);
	const [rows, setRows] = React.useState<Row[]>(initialRows);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
		{}
	);
	const [selectionModel, setSelectionModel] =
		React.useState<GridRowSelectionModel>([]);
	const [emptyRow, setEmptyRow] = React.useState<EmptyRow>();

	React.useEffect(() => {
		const emptyRow: any = initialColumns.reduce(
			(accumulator: any, column: any) => {
				if (column.field === "images") {
					return { ...accumulator, [column.field]: [] };
				} else if (column.field === "soldAt") {
					return { ...accumulator, [column.field]: null };
				}
				return { ...accumulator, [column.field]: "" };
			},
			{}
		);
		delete emptyRow.id;
		setEmptyRow(emptyRow);
	}, [initialColumns]);

	React.useEffect(() => {
		setRows(initialRows);
	}, [initialRows]);

	React.useEffect(() => {
		const newColumn = {
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 120,
			cellClassName: "actions",
			getActions: ({ id }: GridRowParams) => {
				const isInEditMode =
					rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						emptyRow?.images ? (
							<IconButton component="label">
								<UploadIcon />
								<input
									hidden
									accept="image/jpeg"
									multiple
									type="file"
									name="images"
									onChange={(e) => {
										if (e.target.files) {
											handleImages(id, e.target.files);
										}
									}}
								/>
							</IconButton>
						) : (
							<></>
						),
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							onClick={handleCancelClick(id)}
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						onClick={handleEditClick(id)}
					/>,

					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
					/>,
				];
			},
		};

		setColumns([...initialColumns, newColumn]);
	}, [initialColumns, rowModesModel, rows]);

	React.useEffect(() => {
		if (selectionModel && selectionModel?.length > 0) {
			onSelect &&
				onSelect(Number(rows[(selectionModel[0] as number) - 1].id));
		} else {
			onSelect && onSelect(0);
		}
	}, [rows, onSelect, selectionModel]);

	const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
		if (newSelection.length > 1) {
			setSelectionModel([newSelection[newSelection.length - 1]]);
		} else {
			setSelectionModel(newSelection);
		}
	};

	const handleImages = (id: GridRowId, images: FileList) => {
		setRows(
			rows.map((row: Row) =>
				row.id === id ? { ...row, images: images } : row
			)
		);
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View },
		});
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.id === id);
		//delete if thats new row
		if (editedRow && editedRow.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.Edit },
		});
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		setRows(rows.filter((row) => row.id !== id));
		deleteRow(id as number);
	};

	const processRowUpdate = (newRow: any, oldRow: any) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		addRow(updatedRow);
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const handleRowEditStart = (
		params: GridRowParams,
		event: MuiEvent<React.KeyboardEvent | React.MouseEvent>
	) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStop = (
		params: GridRowParams,
		event: MuiEvent<MuiBaseEvent>
	) => {
		event.defaultMuiPrevented = true;
	};

	return (
		<Box {...rest}>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				checkboxSelection
				disableRowSelectionOnClick
				autoHeight
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStart={handleRowEditStart}
				onRowEditStop={handleRowEditStop}
				onRowSelectionModelChange={handleSelectionChange}
				rowSelectionModel={selectionModel}
				processRowUpdate={processRowUpdate}
				slots={{
					toolbar: EditToolbar,
				}}
				slotProps={{
					toolbar: { setRows, setRowModesModel, emptyRow, tableName },
				}}
			/>
		</Box>
	);
};

export default Table;
