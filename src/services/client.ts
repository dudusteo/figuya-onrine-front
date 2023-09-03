import {
	CreateFetcherConfig,
	FetchConfig,
	Fetcher,
	makeClient,
} from "@spree/storefront-api-v2-sdk";
import axios, { AxiosRequestConfig } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosFetcher = async (options: AxiosRequestConfig): Promise<any> => {
	const response = await axios(options);
	return response.data;
};

export const queryClient = makeClient({
	host: import.meta.env.VITE_API_URL || "http://localhost:4000",
	createFetcher: (options: CreateFetcherConfig) => {
		return {
			fetch: async (fetchOptions: FetchConfig) => {
				const responseType =
					fetchOptions.responseParsing === "automatic"
						? undefined
						: fetchOptions.responseParsing;

				const axiosOptions: AxiosRequestConfig = {
					url: `${options.host}/${fetchOptions.url}`,
					method: fetchOptions.method,
					headers: fetchOptions.headers,
					params: fetchOptions.params,
					responseType: responseType,
				};
				const data = await axiosFetcher(axiosOptions);
				return { data };
			},
		} as Fetcher;
	},
});

export const bodyClient = makeClient({
	host: import.meta.env.VITE_API_URL || "http://localhost:4000",
	createFetcher: (options: CreateFetcherConfig) => {
		return {
			fetch: async (fetchOptions: FetchConfig) => {
				const responseType =
					fetchOptions.responseParsing === "automatic"
						? undefined
						: fetchOptions.responseParsing;

				const axiosOptions: AxiosRequestConfig = {
					url: `${options.host}/${fetchOptions.url}`,
					method: fetchOptions.method,
					headers: fetchOptions.headers,
					data: fetchOptions.params,
					responseType: responseType,
				};
				const data = await axiosFetcher(axiosOptions);
				return { data };
			},
		} as Fetcher;
	},
});
