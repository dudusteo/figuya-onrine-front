import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getCookie } from "./utils";

export interface TokenState {
	value: string | null;
}

const initialState: TokenState = {
	value: getCookie("bearer_token"),
};

export const bearerTokenSlice = createSlice({
	name: "bearer_token",
	initialState,
	reducers: {
		setBearerToken: (state: TokenState, action: PayloadAction<string>) => {
			document.cookie = `bearer_token=${action.payload}; path=/; SameSite=Strict;`;
			state.value = action.payload;
		},
		clearBearerToken: (state: TokenState) => {
			document.cookie = `bearer_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;`;
			state.value = "";
		},
	},
});

export const { setBearerToken, clearBearerToken } = bearerTokenSlice.actions;
export const getBearerToken = (state: RootState) => state.bearerToken.value;

export default bearerTokenSlice.reducer;
