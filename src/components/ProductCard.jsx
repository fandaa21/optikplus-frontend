import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-brand text-white text-[10px] font-bold px-2.5 py-1 rounded-md z-10">
            -{product.discount}%
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleWishlist}
            className={`p-2 bg-white rounded-full shadow-md transition-colors ${
              isInWishlist(product.id) ? "text-red-500" : "text-gray-400 hover:text-brand"
            }`}
          >
            <Heart size={16} className={isInWishlist(product.id) ? "fill-red-500" : ""} />
          </button>
          <button 
            className="p-2 bg-white rounded-full shadow-md hover:bg-brand hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            <Eye size={16} />
          </button>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />

        <button
          className="absolute bottom-0 left-0 w-full bg-premium-dark text-white py-3 font-semibold text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
          onClick={handleAdd}
        >
          <ShoppingCart size={16} />
          Add To Cart
        </button>
      </div>

      {/* Info Container */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 truncate group-hover:text-brand transition-colors">
          {product.name}
        </h4>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-brand font-bold text-base">
            {formatRupiah(product.currentPrice)}
          </span>
          {product.oldPrice > product.currentPrice && (
            <span className="text-gray-400 text-xs line-through">
              {formatRupiah(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-500">
            ({product.reviews})
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;