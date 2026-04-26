import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";
import Katalog from "./pages/Katalog";
import Profile from "./pages/Profile";
import Testimoni from "./pages/Testimoni";
import Estimasi from "./pages/Estimasi";
import Promo from "./pages/Promo";
import ProductDetail from "./pages/ProductDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/katalog" element={<Katalog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/testimoni" element={<Testimoni />} />
        <Route path="/estimasi" element={<Estimasi />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
