import {
	IProductsResult,
	ProductAttr,
} from "@spree/storefront-api-v2-sdk/dist/*";
import client from "./client";

// export interface Product {
// 	id: string;
// 	name: string;
// 	price: number;
// }

const ProductService = {
	async getProducts(): Promise<ProductAttr[]> {
		return client.products
			.list({
				include: "images",
				page: 1,
			})
			.then((spreeResponse: IProductsResult) => {
				return spreeResponse.success().data;
			});
	},
};

export default ProductService;
