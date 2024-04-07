import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Product } from "../../services/productService";

export interface BasketState {
	products: Product[];
}

const initialState: BasketState = {
	products: [],
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addProduct: (state: BasketState, action: PayloadAction<Product>) => {
			const newProducts = [...state.products, action.payload];
			state.products = newProducts;
		},
	},
});

export const { addProduct } = basketSlice.actions;
export const getNumberOfAddedProducts = (state: RootState) => state.basket.products.length;

export default basketSlice.reducer;
