import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const KEY = "cart";

// TODO
// Update any type

interface ShopContextProps {
	cartItems: any[];
	addToCart: (item: any) => void;
	removeFromCart: (itemId: any) => void;
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

	const addToCart = (item: any) => {
		setCartItems((prev: any[]) => [...prev, item]);
	};

	const removeFromCart = (itemId: any) => {
		setCartItems((prev: any[]) =>
			prev.filter((item: any) => item.id !== itemId)
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
