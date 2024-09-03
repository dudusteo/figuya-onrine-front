import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getCookie } from "./utils";

export interface OrderTokenState {
	value: string | null;
}

const initialState: OrderTokenState = {
	value: getCookie("order_token"),
};

export const orderTokenSlice = createSlice({
	name: "order_token",
	initialState,
	reducers: {
		setOrderToken: (
			state: OrderTokenState,
			action: PayloadAction<string>
		) => {
			document.cookie = `order_token=${action.payload}; path=/; SameSite=Strict;`;
			state.value = action.payload;
		},
		clearOrderToken: (state: OrderTokenState) => {
			document.cookie = `order_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;`;
			state.value = "";
		},
	},
});

export const { setOrderToken, clearOrderToken } = orderTokenSlice.actions;
export const getOrderToken = (state: RootState) => state.orderToken.value;

export default orderTokenSlice.reducer;
