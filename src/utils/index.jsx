import { enqueueSnackbar } from "notistack";

export const addServiceSnackbarWrapper = (func) => {
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
