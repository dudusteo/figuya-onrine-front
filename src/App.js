import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SearchAppBar from "./core/search-app-bar";
import StickyFooter from "./core/sticky-footer";
import { ShopContextProvider } from "./context/shop-context";

import Shop from "./pages/shop";
import Cart from "./pages/cart";

const App = () => {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <SearchAppBar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <StickyFooter />
      </BrowserRouter>
    </ShopContextProvider>
  );
};

export default App;
