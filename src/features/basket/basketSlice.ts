import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";
import { getCookie } from "../token/utils";

export interface BasketState {
	order: IOrder | null;
}

const getOrder = (order: string): IOrder | null => {
	const json = getCookie(order);

	if (json) {
		return JSON.parse(json) as IOrder;
	}

	return null;
}

const initialState: BasketState = {
	order: getOrder("basket"),
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		updateOrder: (state: BasketState, action: PayloadAction<IOrder>) => {
			const newOrder = action.payload;
			document.cookie = `basket=${JSON.stringify(newOrder)}; path=/; SameSite=Strict;`;
			state.order = newOrder;
		},
	},
});

export const { updateOrder } = basketSlice.actions;
export const getNumberOfAddedProducts = (state: RootState) => state.basket.order?.data.attributes.item_count;
export const getCart = (state: RootState) => state.basket.order;

export default basketSlice.reducer;
