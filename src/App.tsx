import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { ShopContextProvider } from "./context/shop-context";
import SearchAppBar from "./core/search-app-bar";
import StickyFooter from "./core/sticky-footer";

import Shop from "./pages/shop";
import Cart from "./pages/cart";
import Checkout from "./pages/cart/checkout";
import Admin from "./pages/admin";
import Login from "./pages/account/login";
import Register from "./pages/account/register";
import Home from "./pages/home";
import Item from "./pages/item";
import Account from "./pages/account";


const App = () => {
	return (
		<ShopContextProvider>
			<SnackbarProvider maxSnack={10}>
				<BrowserRouter>
					<SearchAppBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/item/:itemId" element={<Item />} />
						<Route path="/shop" element={<Shop />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/cart/checkout" element={<Checkout />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="/account" element={<Account />} />
						<Route path="/account/login" element={<Login />} />
						<Route
							path="/account/register"
							element={<Register />}
						/>
						<Route path="*" element={<div>404</div>} />
					</Routes>
					<StickyFooter />
				</BrowserRouter>
			</SnackbarProvider>
		</ShopContextProvider>
	);
};

export default App;
