import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/token/token-slice";

export const store = configureStore({
	reducer: {
		token: tokenReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
