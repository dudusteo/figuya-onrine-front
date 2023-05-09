import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const addPackage = async (formData: FormData) => {
	return axios
		.post(API_URL + "/package/add", formData, {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getAllPackages = async () => {
	return axios
		.get(API_URL + "/package/all", {
			headers: {
				...authHeader(),
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const PackageService = {
	addPackage,
	getAllPackages,
};

export default PackageService;
