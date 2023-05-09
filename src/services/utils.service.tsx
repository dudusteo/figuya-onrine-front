import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getNextAutoIncrementId = async (tableName: string) => {
	return axios
		.get(API_URL + "/utils/autoincrement/get", {
			params: {
				table: tableName,
			},
			headers: {
				...authHeader(),
			},
		})
		.then((response) => response.data);
};

const UtilsService = {
	getNextAutoIncrementId,
};

export default UtilsService;
