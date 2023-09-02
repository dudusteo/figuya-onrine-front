import { makeClient } from "@spree/storefront-api-v2-sdk";
import createAxiosFetcher from "@spree/axios-fetcher/dist/server/index";

const client = makeClient({
	host: "http://localhost:4000",
	createFetcher: createAxiosFetcher,
});

export interface Product {
	id: string;
	name: string;
	price: number;
}

export class ProductService {
	async getProducts(): Promise<void> {
		return client.products
			.list({
				include: "default_variant",
				page: 1,
			})
			.then((spreeResponse) => {
				console.log(spreeResponse.success());
			});
	}
}
