import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"

const KEY = "cart";

export const ShopContext = React.createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useLocalStorage(KEY, [])

    const addToCart = (itemId) => {
        setCartItems((prev) => [...prev, { id: itemId }]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const contextValue = { cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
