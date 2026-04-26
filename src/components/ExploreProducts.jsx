import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function ExploreProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const exploreItems = data.slice(8, 16).map((item, index) => {
          const price = Number(item.price) || 0;

          const discount = [10, 15, 20, 25, 30][index % 5];

          const oldPrice = Math.round(price / (1 - discount / 100));

          return {
            id: item.id,
            name: item.name || item.brand + " " + item.model,
            currentPrice: price,
            oldPrice: oldPrice,
            discount: discount,
            rating: index % 2 === 0 ? 5 : 4,
            reviews: 60 + index * 9,
            image: `/images/kacamata${(index % 4) + 1}.png`,
          };
        });

        setProducts(exploreItems);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="explore-products">
      <div className="explore-banner">
        <img src="/images/banner.png" alt="Optik Banner" />
      </div>

      <div className="explore-header">
        <div className="header-left">
          <div className="explore-wrapper">
            <div className="red-rect"></div>

            <span className="explore-text">Our Products</span>
          </div>

          <h2 className="section-title">Explore Our Products</h2>
        </div>
      </div>

      <div className="explore-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className="explore-container">
        <button className="explore-btn" onClick={() => navigate("/katalog")}>
          <span>View All Products</span>
          <svg
            className="arrow-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default ExploreProducts;
