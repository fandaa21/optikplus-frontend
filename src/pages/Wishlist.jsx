import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow section-container py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold tracking-tight">My Wishlist</h1>
            <p className="text-gray-500 font-medium">You have {wishlist.length} items saved for later.</p>
          </div>
          <Link to="/katalog" className="text-brand font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100">
                <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-8">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Heart size={20} className="fill-red-500" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-brand transition-colors cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                    {product.name}
                  </h3>
                  <p className="text-brand font-black text-xl mb-6">{formatRupiah(product.currentPrice || product.price)}</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-grow btn-primary py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-brand/20"
                    >
                      <ShoppingBag size={18} /> Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="p-3 bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Remove"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] py-24 px-8 text-center border border-dashed border-gray-300">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart size={40} className="text-red-300" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-10 max-w-xs mx-auto font-medium">Save items you like to see them later. Your wishlist is waiting to be filled!</p>
            <button onClick={() => navigate("/katalog")} className="btn-primary px-10 py-4 rounded-2xl shadow-xl shadow-brand/20">
              Discover Products
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Wishlist;
