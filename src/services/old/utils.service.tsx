import axiosInstance from "../axiosInstance";

const getNextAutoIncrementId = async (tableName: string) => {
	return axiosInstance
		.get("/utils/autoincrement/get", {
			params: {
				table: tableName,
			},
		})
		.then((response) => response.data);
};

const UtilsService = {
	getNextAutoIncrementId,
};

export default UtilsService;
