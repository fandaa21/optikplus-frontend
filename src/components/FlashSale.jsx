import { useState, useEffect, useRef, useContext } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { FlashSaleContext } from "../context/FlashSaleContext";

function FlashSale() {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const { timeLeft, getFlashSalePrice, isFlashSaleActive } = useContext(FlashSaleContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Only show products that have a flash sale price
        const saleItems = data.map(item => {
          const salePrice = getFlashSalePrice(item);
          if (salePrice) {
            return {
              ...item,
              ...salePrice,
              rating: 5,
              reviews: 20 + Math.floor(Math.random() * 50),
              image: item.image || "/images/kacamata1.png",
            };
          }
          return null;
        }).filter(item => item !== null);
        
        setProducts(saleItems);
      })
      .catch((err) => console.log(err));
  }, [getFlashSalePrice]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (products.length === 0 || !isFlashSaleActive()) return null;

  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-brand rounded-md"></div>
            <span className="text-brand font-bold text-sm uppercase tracking-widest">Today's</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Flash Sales</h2>
            
            <div className="flex items-center gap-4">
              <Clock className="text-brand hidden sm:block" size={24} />
              <div className="flex items-center gap-3">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds }
                ].map((unit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{unit.label}</span>
                      <span className="text-2xl md:text-3xl font-display font-extrabold tabular-nums leading-none">
                        {formatNumber(unit.value)}
                      </span>
                    </div>
                    {idx < 3 && <span className="text-brand text-2xl font-bold mt-4">:</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-brand hover:text-white transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll("right")} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-brand hover:text-white transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] md:min-w-[300px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FlashSale;