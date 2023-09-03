import { BrowserRouter, Route, Routes } from "react-router-dom";

import SearchAppBar from "./core/search-app-bar";
import StickyFooter from "./core/sticky-footer";

import Shop from "./pages/shop";
import Cart from "./pages/cart";
import Checkout from "./pages/cart/checkout";
import Login from "./pages/account/login";
import Register from "./pages/account/register";
import Home from "./pages/home";
import Item from "./pages/item";
import Account from "./pages/account";

const App = () => {
	return (
		<BrowserRouter>
			<SearchAppBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/item/:itemId" element={<Item />} />
				<Route path="/shop" element={<Shop />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/cart/checkout" element={<Checkout />} />
				<Route path="/account" element={<Account />} />
				<Route path="/account/login" element={<Login />} />
				<Route path="/account/register" element={<Register />} />
				<Route path="*" element={<div>404</div>} />
			</Routes>
			<StickyFooter />
		</BrowserRouter>
	);
};

export default App;
