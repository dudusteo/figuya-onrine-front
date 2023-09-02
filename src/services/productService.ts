import {
	IProductsResult,
	ProductAttr,
	RelationType,
} from "@spree/storefront-api-v2-sdk";
import client from "./client";

export interface Product extends ProductAttr {
	images: string[];
}

const ProductService = {
	async getProducts(): Promise<Product[]> {
		return client.products
			.list({
				include: "images",
				page: 1,
			})
			.then((spreeResponse: IProductsResult) => {
				const products: Product[] = spreeResponse
					.success()
					.data.map((productAttr: ProductAttr) => {
						const images: string[] = [];

						if (
							Array.isArray(
								productAttr.relationships?.images.data
							)
						) {
							const imagesData = productAttr.relationships.images
								.data as RelationType[];
							imagesData.forEach((image: RelationType) => {
								spreeResponse
									.success()
									.included?.find(
										(included) =>
											included.id === image.id &&
											included.type === image.type &&
											images.push(
												included.attributes.original_url
											)
									);
							});
						}

						return {
							...productAttr,
							images: images,
						};
					});
				return products;
			});
	},
};

export default ProductService;
