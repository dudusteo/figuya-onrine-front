import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import { Figurine } from "../interfaces";

interface FigurineResponse extends Array<Figurine> {
	error?: string;
}

const getAllFigurines = async () => {
	try {
		const response: AxiosResponse<FigurineResponse> =
			await axiosInstance.get("/figurine");

		return response.data as Figurine[];
	} catch (error) {
		const axiosError = error as AxiosError<FigurineResponse>;
		throw new Error(axiosError.response?.data?.error || "Login failed");
	}
};

const FigurineService = {
	getAllFigurines,
};

export default FigurineService;
