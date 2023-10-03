import { IOrder, IOrderResult } from "@spree/storefront-api-v2-sdk";
import { bodyClient } from "./client";

const CartService = {
	async create(bearer_token?: string): Promise<IOrder> {
		const response = bodyClient.cart.create({
			bearer_token: bearer_token,
		});

		return response.then((spreeResponse: IOrderResult) => {
			return spreeResponse.success();
		});
	},

	async show(order_token: string): Promise<IOrder> {
		const response = bodyClient.cart.show({
			order_token: order_token,
		});

		return response.then((spreeResponse: IOrderResult) => {
			return spreeResponse.success();
		});
	},

	async addItem(
		order_token: string,
		variant_id: string,
		quantity: number
	): Promise<IOrder> {
		const response = bodyClient.cart.addItem({
			order_token: order_token,
			variant_id: variant_id,
			quantity: quantity,
		});

		return response.then((spreeResponse: IOrderResult) => {
			return spreeResponse.success();
		});
	},

	async RemoveItem(
		order_token: string,
		line_item_id: string
	): Promise<IOrder> {
		const response = bodyClient.cart.removeItem({
			order_token: order_token,
			id: line_item_id,
		});

		return response.then((spreeResponse: IOrderResult) => {
			return spreeResponse.success();
		});
	},
};

export default CartService;
