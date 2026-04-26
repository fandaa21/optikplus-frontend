import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAdd = () => {
    addToCart(product);
    navigate("/cart");
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  };

  const renderStars = () => {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= product.rating ? "stars" : "empty-stars"}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="product-card">

      <div
        className="product-image-container"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="discount-badge">
          -{product.discount}%
        </div>

        <div className="product-actions">
          <button className="action-btn">♡</button>
          <button className="action-btn">👁</button>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />

        <button
          className="add-to-cart-btn"
          onClick={handleAdd}
        >
          Add To Cart
        </button>
      </div>

      <div className="product-info">

        <h4 className="product-name">
          {product.name}
        </h4>

        <div className="product-price">

          <span className="current-price">
            {formatRupiah(product.currentPrice)}
          </span>

          <span className="old-price">
            {formatRupiah(product.oldPrice)}
          </span>

        </div>

        <div className="product-rating">
          <div>{renderStars()}</div>

          <span className="reviews">
            ({product.reviews})
          </span>
        </div>

      </div>

    </div>
  );
}

export default ProductCard;