import {
	CreateFetcherConfig,
	FetchConfig,
	Fetcher,
	makeClient,
} from "@spree/storefront-api-v2-sdk";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosFetcher = async (options: AxiosRequestConfig): Promise<any> => {
	const response: AxiosResponse = await axios(options);
	return response.data;
};

const createFetcher = (options: CreateFetcherConfig, useBody: boolean) => {
	return {
		fetch: async (fetchOptions: FetchConfig): Promise<{ data: any }> => {
			const responseType =
				fetchOptions.responseParsing === "automatic"
					? undefined
					: fetchOptions.responseParsing;

			const axiosOptions: AxiosRequestConfig = {
				url: `${options.host}/${fetchOptions.url}`,
				method: fetchOptions.method,
				headers: fetchOptions.headers,
				...(useBody ? { data: fetchOptions.params } : { params: fetchOptions.params }),
				responseType: responseType,
			};

			const data = await axiosFetcher(axiosOptions);
			if (!data) {
				throw new Error("No data returned from API");
			}
			return { data };
		},
	} as Fetcher;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const queryClient = makeClient({
	host: API_URL,
	createFetcher: (options: CreateFetcherConfig) => createFetcher(options, false),
});

export const bodyClient = makeClient({
	host: API_URL,
	createFetcher: (options: CreateFetcherConfig) => createFetcher(options, true),
});