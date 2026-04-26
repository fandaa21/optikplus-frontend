// Tambahkan FaShoppingCart ke dalam daftar import
import { FaStar, FaRegStar, FaTruck, FaShieldAlt, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          ...data,

          currentPrice: Number(data.price) || 0,

          oldPrice: Math.round((Number(data.price) || 0) * 1.2),

          rating: 5,

          reviews: 95,

          image: data.image || "/images/kacamata1.png",

          category: data.category || data.gender || "Unisex",

          description:
            data.description ||
            `${data.name} adalah frame berkualitas dengan desain modern dan nyaman digunakan setiap hari.`,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const renderStars = () => {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i}>{i <= product.rating ? "★" : "☆"}</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="detail-page">
          <h2>Loading product...</h2>
        </section>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <section className="detail-page">
          <h1>Product Not Found</h1>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="detail-page">
        <div className="breadcrumb">
          Home / Katalog / <span>{product.name}</span>
        </div>

        <div className="detail-grid">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="detail-info">
            <h1>{product.name}</h1>

            <div className="detail-rating">
              {renderStars()}

              <span>({product.reviews})</span>
            </div>

            <div className="detail-price">
              <span className="current">
                {formatRupiah(product.currentPrice)}
              </span>

              <span className="old">{formatRupiah(product.oldPrice)}</span>
            </div>

            <p className="detail-category">Category: {product.category}</p>

            <p className="detail-desc">{product.description}</p>

            <button className="detail-add-cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart className="btn-icon" />
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
