import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import { Figurine } from "../interfaces";

interface FigurinesResponse extends Array<Figurine> {
	error?: string;
}

interface FigurineResponse extends Figurine {
	error?: string;
}

const getAllFigurines = async () => {
	try {
		const response: AxiosResponse<FigurinesResponse> =
			await axiosInstance.get("/figurine");

		return response.data as Figurine[];
	} catch (error) {
		const axiosError = error as AxiosError<FigurinesResponse>;
		throw new Error(axiosError.response?.data?.error);
	}
};

const getFigurineById = async (itemId: number) => {
	try {
		const response: AxiosResponse<FigurineResponse> =
			await axiosInstance.get("/figurine");

		return response.data as Figurine;
	} catch (error) {
		const axiosError = error as AxiosError<FigurineResponse>;
		throw new Error(axiosError.response?.data?.error);
	}
};

const FigurineService = {
	getAllFigurines,
	getFigurineById,
};

export default FigurineService;
