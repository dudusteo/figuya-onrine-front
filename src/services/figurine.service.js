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

const getOptions = async () => {
	return new Promise((resolve, reject) => {
		resolve({
			character: [
				{ id: 1, name: "Hatsune Miku" },
				{ id: 2, name: "Rem" },
			],
			origin: [{ id: 1, name: "Vocaloid" }],
			company: [{ id: 1, name: "Sega" }],
			type: [{ id: 1, name: "Prize" }],
		});
	});
};

const FigurineService = {
	addFigurine,
	getFigurines,
	getFiles,
	getOptions,
};

export default FigurineService;
