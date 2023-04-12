import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const addFigurine = async (formData) => {
	return axios
		.post(API_URL + "/figurine/add", formData, {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getFigurines = async () => {
	return axios
		.get(API_URL + "/figurine/get", {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getFiles = async () => {
	return axios.post(API_URL + "/files").then((response) => response.data);
};

const FigurineService = {
	addFigurine,
	getFigurines,
	getFiles,
};

export default FigurineService;
