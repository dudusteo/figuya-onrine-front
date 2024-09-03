import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";

export interface BasketState {
	order: IOrder | null;
}

const initialState: BasketState = {
	order: null,
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		updateOrder: (state: BasketState, action: PayloadAction<IOrder>) => {
			const newOrder = action.payload;
			state.order = newOrder;
		},
	},
});

export const { updateOrder } = basketSlice.actions;
export const getNumberOfAddedProducts = (state: RootState) => state.basket.order?.data.attributes.item_count;
export const getCart = (state: RootState) => state.basket.order;

export default basketSlice.reducer;
