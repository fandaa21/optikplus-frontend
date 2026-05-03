import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShoppingCart, Star, Truck, ShieldCheck, ChevronRight, ArrowLeft, Heart, Share2, Clock, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { FlashSaleContext } from "../context/FlashSaleContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { getFlashSalePrice } = useContext(FlashSaleContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const salePrice = getFlashSalePrice(data);
        
        setProduct({
          ...data,
          currentPrice: salePrice ? salePrice.currentPrice : (Number(data.price) || 0),
          oldPrice: salePrice ? salePrice.oldPrice : Math.round((Number(data.price) || 0) * 1.2),
          discount: salePrice ? salePrice.discountPercent : 0,
          isFlashSale: !!salePrice,
          rating: 4.8,
          reviews: 124,
          image: data.image || "/images/kacamata1.png",
          category: data.category || data.gender || "Unisex",
          description: data.description || `${data.name} adalah frame berkualitas premium dengan desain kontemporer yang menggabungkan estetika dan kenyamanan maksimal untuk penggunaan sehari-hari.`,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id, getFlashSalePrice]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Product Not Found</h1>
          <button onClick={() => navigate("/katalog")} className="btn-primary">Back to Catalog</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-grow section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/katalog" className="hover:text-brand transition-colors">Katalog</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-3xl flex items-center justify-center p-12 overflow-hidden group border border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            {/* Thumbs placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`aspect-square rounded-xl border-2 transition-all cursor-pointer ${i === 0 ? "border-brand bg-white" : "border-transparent bg-gray-50 hover:border-gray-200"}`}>
                  <img src={product.image} alt="thumb" className="w-full h-full object-contain p-2 mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-widest">
                  {product.category}
                </span>
                {product.isFlashSale && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                    <Clock size={12} /> Flash Sale
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full transition-all border border-gray-100 ${
                    isInWishlist(product.id) 
                      ? "bg-red-50 text-red-500 border-red-100 shadow-sm shadow-red-100" 
                      : "bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart size={20} className={isInWishlist(product.id) ? "fill-red-500" : ""} />
                </button>
                <button className="p-2.5 rounded-full bg-gray-50 text-gray-400 hover:text-brand hover:bg-blue-50 transition-all border border-gray-100">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} Reviews)</span>
              </div>
              <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                In Stock
              </span>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-display font-extrabold text-brand">
                  {formatRupiah(product.currentPrice)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {formatRupiah(product.oldPrice)}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">S&K berlaku. Harga sudah termasuk pajak.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-900">Deskripsi Produk</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 mb-10">
              <button 
                className="w-full btn-primary py-5 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand/20 transition-all active:scale-95"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={22} />
                Add to Shopping Bag
              </button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
                <Truck className="text-brand shrink-0" size={24} />
                <div>
                  <h5 className="text-sm font-bold">Free Delivery</h5>
                  <p className="text-[11px] text-gray-500 mt-1">Gratis ongkir untuk pengiriman ke seluruh wilayah Langkawi.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
                <ShieldCheck className="text-brand shrink-0" size={24} />
                <div>
                  <h5 className="text-sm font-bold">Safe Packaging</h5>
                  <p className="text-[11px] text-gray-500 mt-1">Kami pastikan kacamata Anda sampai dengan aman dan rapi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="py-20 bg-gray-50 mt-20">
        <div className="section-container">
           <h3 className="text-2xl font-display font-bold mb-10">You May Also Like</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Simple placeholder for related products */}
             <div className="animate-pulse bg-white rounded-2xl h-80"></div>
             <div className="animate-pulse bg-white rounded-2xl h-80"></div>
             <div className="animate-pulse bg-white rounded-2xl h-80"></div>
             <div className="animate-pulse bg-white rounded-2xl h-80"></div>
           </div>
        </div>
      </div>

      <Footer />

      {/* Premium Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${
         showToast ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-90 pointer-events-none"
      }`}>
         <div className="bg-premium-dark text-white p-2 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] border border-white/10 backdrop-blur-xl">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
               <Check size={24} strokeWidth={3} />
            </div>
            <div className="flex-grow pr-4">
               <p className="text-sm font-bold tracking-tight">Berhasil Ditambahkan!</p>
               <p className="text-[10px] text-gray-400 font-medium">Produk telah masuk keranjang belanja.</p>
            </div>
            <Link to="/cart" className="bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
               View Cart
            </Link>
         </div>
      </div>
    </div>
  );
}

export default ProductDetail;
