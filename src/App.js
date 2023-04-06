import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SearchAppBar from "./core/search-app-bar"
import StickyFooter from "./core/sticky-footer"
import { ShopContextProvider } from "./context/shop-context"

import Shop from "./pages/shop";
import Cart from "./pages/cart";
import Checkout from "./pages/cart/checkout";
import Admin from "./pages/admin";
import Login from "./pages/account/login";
import Register from "./pages/account/register";
import Home from "./pages/home";
import Item from "./pages/item";

const App = () => {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <SearchAppBar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itme" element={<Item />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
        </Routes>
        <StickyFooter />
      </BrowserRouter>
     </ShopContextProvider>
  );
};

export default App;
