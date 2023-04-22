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
	return axios
		.get(API_URL + "/figurine/option/get", {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getPackageOptions = async () => {
	return axios
		.get(API_URL + "/figurine/option/package/get", {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const addCharacterOption = async (value) => {
	return axios
		.post(API_URL + "/figurine/option/character/add", {
			name: value,
		})
		.then((response) => response.data);
};

const addOriginOption = async (value) => {
	return axios
		.post(API_URL + "/figurine/option/origin/add", {
			name: value,
		})
		.then((response) => response.data);
};

const addCompanyOption = async (value) => {
	return axios
		.post(API_URL + "/figurine/option/company/add", {
			name: value,
		})
		.then((response) => response.data);
};

const addTypeOption = async (value) => {
	return axios
		.post(API_URL + "/figurine/option/type/add", {
			name: value,
		})
		.then((response) => response.data);
};

const addPackageOption = async (formData) => {
	return axios
		.post(API_URL + "/figurine/option/package/add", formData, {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getFigurinesByPackage = async (packageName) => {
	return axios
		.get(API_URL + "/figurine/get/package", {
			params: { packageName: packageName },
		})
		.then((response) => response.data);
};

const FigurineService = {
	addFigurine,
	getFigurines,
	getFiles,
	addCharacterOption,
	addOriginOption,
	addCompanyOption,
	addTypeOption,
	getOptions,
	getPackageOptions,
	addPackageOption,
	getFigurinesByPackage,
};

export default FigurineService;
