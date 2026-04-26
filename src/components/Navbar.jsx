import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <h2>OPTIK PLUS LANGKAWI</h2>
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/katalog")}>Katalog</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li onClick={() => navigate("/testimoni")}>Testimoni</li>
        <li onClick={() => navigate("/estimasi")}>Estimasi Harga</li>
        <li onClick={() => navigate("/promo")}>Promo</li>
      </ul>

      <div className="nav-right">
        <input type="text" placeholder="What are you looking for?" />

        <span className="wishlist-icon">♡</span>

        <div className="cart-icon-wrapper" onClick={() => navigate("/cart")}>
          <span className="cart-icon">🛒</span>

          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
