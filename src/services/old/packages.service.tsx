import axiosInstance from "../axiosInstance";

const addPackage = async (formData: FormData) => {
	return axiosInstance
		.post("/package/add", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => response.data);
};

const getAllPackages = async () => {
	return axiosInstance
		.get("/package/all", {
			headers: {
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
