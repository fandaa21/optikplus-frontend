import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import FlashSaleProvider from "./context/FlashSaleContext";

import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        <FlashSaleProvider>
          <App />
        </FlashSaleProvider>
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>
);