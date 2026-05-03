import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BestSelling() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const bestProducts = data.slice(4, 8).map((item, index) => {
          const price = Number(item.price) || 0;
          const discount = [10, 15, 20, 25][index % 4];
          const oldPrice = Math.round(price / (1 - discount / 100));
          return {
            id: item.id,
            name: item.name || item.brand + " " + item.model,
            currentPrice: price,
            oldPrice: oldPrice,
            discount: discount,
            rating: 5,
            reviews: 80 + index * 7,
            image: `/images/kacamata${(index % 4) + 1}.png`,
          };
        });
        setProducts(bestProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="section-container">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-brand rounded-md"></div>
            <span className="text-brand font-bold text-sm uppercase tracking-widest">This Month</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Best Selling Products</h2>
        </div>
        
        <button 
          onClick={() => navigate("/katalog")}
          className="btn-primary flex items-center gap-2 group"
        >
          View All
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          [...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-xl aspect-[3/4]"></div>
          ))
        )}
      </div>
    </section>
  );
}

export default BestSelling;