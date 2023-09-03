import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
	value: string | null;
}

function getCookie(key: string) {
	function escape(s: string) {
		return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
	}
	const match = document.cookie.match(
		RegExp("(?:^|;\\s*)" + escape(key) + "=([^;]*)")
	);
	return match ? match[1] : null;
}

const initialState: TokenState = {
	value: getCookie("access_token"),
};

const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		setToken: (state: TokenState, action: PayloadAction<string>) => {
			document.cookie = `access_token=${action.payload}; path=/; SameSite=Strict;`;
			state.value = action.payload;
		},
		clearToken: (state: TokenState) => {
			document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;`;
			state.value = "";
		},
	},
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
