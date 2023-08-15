import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

interface AdminResponse extends Array<Figurine> {
	error?: string;
}

const createFigurine = async (figurine: Figurine) => {
	try {
		const response: AxiosResponse<AdminResponse> = await axiosInstance.post(
			"/admin/figurine",
			figurine
		);

		return;
	} catch (error) {
		const axiosError = error as AxiosError<AdminResponse>;
		throw new Error(axiosError.response?.data?.error);
	}
};

const AdminService = { createFigurine };

export default AdminService;
