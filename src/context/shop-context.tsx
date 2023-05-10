import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Figurine } from "../interfaces";

const KEY = "cart";

interface ShopContextProps {
	cartItems: Figurine[];
	addToCart: (item: Figurine) => void;
	removeFromCart: (itemId: number) => void;
}

export const ShopContext = React.createContext<ShopContextProps>({
	cartItems: [],
	addToCart: () => {},
	removeFromCart: () => {},
});

interface ShopContextProviderProps {
	children: React.ReactNode;
}

export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
	const [cartItems, setCartItems] = useLocalStorage(KEY, []);

	const addToCart = (item: Figurine) => {
		setCartItems((prev: Figurine[]) => [...prev, item]);
	};

	const removeFromCart = (itemId: number) => {
		setCartItems((prev: Figurine[]) =>
			prev.filter((item: Figurine) => item.id !== itemId)
		);
	};

	const contextValue = {
		cartItems,
		addToCart,
		removeFromCart,
	};

	return (
		<ShopContext.Provider value={contextValue}>
			{children}
		</ShopContext.Provider>
	);
};
