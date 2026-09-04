import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Product listing */}
        <Route path="/" element={<Products />} />

        {/* Product details + EMI selection */}
        <Route path="/product/:slug" element={<ProductDetails />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        {/* Order success */}
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
