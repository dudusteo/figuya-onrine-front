import axiosInstance from "../axiosInstance";

const addFigurine = async (formData: FormData): Promise<string> => {
	return axiosInstance
		.post("/figurine/add", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getFigurine = async (id: number): Promise<Figurine> => {
	return axiosInstance
		.get("/figurine/get", {
			params: { id },
		})
		.then((response) => response.data);
};

const getAllFigurines = async (): Promise<Figurine[]> => {
	return axiosInstance
		.get("/figurine/all", {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data as Figurine[]);
};

const removeFigurine = async (id: number): Promise<string> => {
	return axiosInstance
		.delete("/figurine/remove", {
			params: { id },
		})
		.then((response) => response.data);
};

const getFigurinesByPackage = async (
	packageId: number
): Promise<Figurine[]> => {
	return axiosInstance
		.get("/figurine/all/package/get", {
			params: { packageId },
		})
		.then((response) => response.data);
};

const FigurineService = {
	addFigurine,
	getFigurine,
	getAllFigurines,
	removeFigurine,
	getFigurinesByPackage,
};

export default FigurineService;
