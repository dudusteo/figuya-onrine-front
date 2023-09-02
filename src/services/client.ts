import {
	CreateFetcherConfig,
	Fetcher,
	makeClient,
} from "@spree/storefront-api-v2-sdk";
import axios, { AxiosRequestConfig } from "axios";

const axiosFetcher = async (options: AxiosRequestConfig): Promise<any> => {
	const response = await axios(options);
	return response.data;
};

const client = makeClient({
	host: "http://localhost:4000",
	createFetcher: (options: CreateFetcherConfig) => {
		return {
			fetch: async (fetchOptions) => {
				console.log(`${options.host}/${fetchOptions.url}`);
				const axiosOptions: AxiosRequestConfig = {
					url: `${options.host}/${fetchOptions.url}`,
					method: fetchOptions.method,
					headers: fetchOptions.headers,
					params: fetchOptions.params,
				};
				const data = await axiosFetcher(axiosOptions);
				return { data };
			},
		} as Fetcher;
	},
});

export default client;
