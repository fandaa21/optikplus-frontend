import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    <section className="section-container">
      {/* Middle Banner */}
      <div className="mb-20 rounded-2xl overflow-hidden relative group cursor-pointer aspect-[21/9]">
        <img src="/images/banner.png" alt="Optik Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6">
          <h3 className="text-white text-2xl md:text-4xl font-display font-bold mb-4">Enhance Your Vision</h3>
          <p className="text-white/80 text-sm md:text-base max-w-lg mb-6">Experience clarity like never before with our premium lens collection.</p>
          <button onClick={() => navigate("/estimasi")} className="btn-primary">Get Consultation</button>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-5 h-10 bg-brand rounded-md"></div>
          <span className="text-brand font-bold text-sm uppercase tracking-widest">Our Products</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold">Explore Our Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

      <div className="flex justify-center">
        <button 
          className="btn-primary flex items-center gap-2 group"
          onClick={() => navigate("/katalog")}
        >
          View All Products
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

export default ExploreProducts;
