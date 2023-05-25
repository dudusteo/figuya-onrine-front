import axios from "axios";
import authHeader from "./auth-header";
import { Options } from "../interfaces";

const API_URL = process.env.REACT_APP_API_URL;

const getOptions = async (): Promise<Options> => {
	return new Promise((resolve, reject) => {
		resolve({
			character: [
				{
					id: 1,
					name: "Hatsune Miku",
				},
			],
			origin: [
				{
					id: 1,
					name: "Hatsune Miku",
				},
			],
			company: [
				{
					id: 1,
					name: "Hatsune Miku",
				},
			],
			type: [
				{
					id: 1,
					name: "Hatsune Miku",
				},
			],
		});
	});

	// return axios
	// 	.get(API_URL + "/figurine/option/get", {
	// 		headers: {
	// 			...authHeader(),
	// 			"Content-Type": "multipart/form-data",
	// 		},
	// 	})
	// 	.then((response) => response.data);
};

const OptionService = {
	getOptions,
};

export default OptionService;
