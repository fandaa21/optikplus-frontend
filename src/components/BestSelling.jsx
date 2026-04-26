import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function BestSelling() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const bestProducts = data
          .slice(4, 8)
          .map((item, index) => {
            const price =
              Number(item.price) || 0;

            const discount =
              [10, 15, 20, 25][
                index % 4
              ];

            const oldPrice =
              Math.round(
                price /
                  (1 - discount / 100)
              );

            return {
              id: item.id,
              name:
                item.name ||
                item.brand +
                  " " +
                  item.model,
              currentPrice: price,
              oldPrice: oldPrice,
              discount: discount,
              rating: 5,
              reviews:
                80 + index * 7,
              image:
                `/images/kacamata${
                  (index % 4) + 1
                }.png`,
            };
          });

        setProducts(bestProducts);
      })
      .catch((err) =>
        console.log(err)
      );
  }, []);

  return (
    <section className="bestselling">

      <div className="bestselling-header">

        <div className="header-left">

          <div className="bestselling-wrapper">
            <div className="red-rect"></div>

            <span className="bestselling-text">
              This Month
            </span>
          </div>

          <h2 className="section-title">
            Best Selling Products
          </h2>

        </div>

      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

    </section>
  );
}

export default BestSelling;