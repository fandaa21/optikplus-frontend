import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Ticket,
  ShoppingCart,
  ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

function Cart() {
  const { cart, removeItem, increaseQty, decreaseQty, discount, setDiscount, coupon, setCoupon } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.currentPrice * item.qty, 0);
  const total = subtotal - discount;

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const applyCoupon = () => {
    const code = coupon.toUpperCase().trim();
    const discounts = { OPTIK30: 0.3, STUDENT15: 0.15, RAMADHAN25: 0.25 };

    if (discounts[code]) {
      setDiscount(subtotal * discounts[code]);
      Swal.fire({
        icon: "success",
        title: "Kupon Berhasil!",
        text: `Diskon sebesar ${discounts[code] * 100}% telah dipasang.`,
        confirmButtonColor: "#DB4444",
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Kode kupon tidak valid atau sudah kadaluwarsa.",
        confirmButtonColor: "#1a1a1a",
      });
      setDiscount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-display font-bold mb-10 tracking-tight">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <ShoppingCart size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Keranjangmu Kosong</h2>
                <p className="text-gray-500 mb-8">Sepertinya kamu belum memilih kacamata favoritmu.</p>
                <button
                  className="btn-primary"
                  onClick={() => navigate("/katalog")}
                >
                  Mulai Belanja Sekarang
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 group transition-all hover:shadow-md"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl flex items-center justify-center p-4 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">{item.name}</h3>
                        <p className="text-brand font-bold">{formatRupiah(item.currentPrice)}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.qty <= 1}
                          className="text-gray-500 hover:text-brand disabled:opacity-30 transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold w-6 text-center">{item.qty}</span>
                        <button 
                          onClick={() => increaseQty(item.id)}
                          className="text-gray-500 hover:text-brand transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Subtotal & Delete */}
                      <div className="flex items-center gap-6">
                        <p className="font-display font-bold text-lg min-w-[120px] text-right">
                          {formatRupiah(item.currentPrice * item.qty)}
                        </p>
                        <button
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="flex items-center gap-2 text-gray-600 font-semibold hover:text-brand transition-colors mt-8"
                  onClick={() => navigate("/katalog")}
                >
                  <ArrowLeft size={20} />
                  Back to Shopping
                </button>
              </>
            )}
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold mb-8 pb-4 border-bottom border-gray-100">Order Summary</h3>

              {/* Coupon Section */}
              <div className="space-y-4 mb-8">
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-brand transition-colors">
                    <Ticket size={20} className="text-gray-400 mr-2" />
                    <input
                      placeholder="Coupon Code"
                      className="bg-transparent border-none focus:ring-0 text-sm font-semibold w-full"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={applyCoupon}
                    className="bg-premium-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Details */}
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-900">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Discount</span>
                  <span className="text-green-600">- {formatRupiah(discount)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                
                <div className="pt-6 mt-6 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-900 font-bold text-lg">Total</span>
                    <span className="text-2xl font-display font-extrabold text-brand">
                      {formatRupiah(total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full btn-primary py-4 rounded-xl mt-10 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand/20"
                disabled={cart.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
              
              <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;