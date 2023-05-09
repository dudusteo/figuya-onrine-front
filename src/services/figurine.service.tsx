import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const addFigurine = async (formData: FormData) => {
	return axios
		.post(API_URL + "/figurine/add", formData, {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getFigurine = async (id: number) => {
	return axios
		.get(API_URL + "/figurine/get", {
			params: { id },
			headers: {
				...authHeader(),
			},
		})
		.then((response) => response.data);
};

const getAllFigurines = async () => {
	return axios
		.get(API_URL + "/figurine/all", {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const removeFigurine = async (id: number) => {
	return axios
		.delete(API_URL + "/figurine/remove", {
			params: { id },
			headers: {
				...authHeader(),
			},
		})
		.then((response) => response.data);
};

const getOptions = async () => {
	return axios
		.get(API_URL + "/figurine/option/get", {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getFigurinesByPackage = async (packageId: number) => {
	return axios
		.get(API_URL + "/figurine/all/package/get", {
			params: { packageId },
		})
		.then((response) => response.data);
};

const FigurineService = {
	addFigurine,
	getFigurine,
	getAllFigurines,
	removeFigurine,
	getOptions,
	getFigurinesByPackage,
};

export default FigurineService;
