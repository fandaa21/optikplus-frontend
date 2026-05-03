import { useNavigate, Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ShieldCheck, Truck, ChevronRight, Landmark, Banknote, CreditCard, Lock, MapPin, Phone, User, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout() {
  const { cart, clearCart, discount, setDiscount, coupon, setCoupon } = useContext(CartContext);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState(coupon);
  const [couponStatus, setCouponStatus] = useState(discount > 0 ? "success" : ""); // "success" | "error" | ""

  // Form States
  const [formData, setFormData] = useState({
    firstName: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.currentPrice * item.qty, 0);
  
  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    let discValue = 0;

    if (code === "OPTIK30") {
      discValue = subtotal * 0.3;
      setCouponStatus("success");
      setCoupon(code);
    } else if (code === "STUDENT15") {
      discValue = subtotal * 0.15;
      setCouponStatus("success");
      setCoupon(code);
    } else if (code === "FREECOAT") {
      discValue = 50000; // Contoh nilai diskon tetap untuk coating
      setCouponStatus("success");
      setCoupon(code);
    } else {
      setCouponStatus("error");
      setDiscount(0);
      setCoupon("");
      return;
    }

    setDiscount(discValue);
  };

  const total = subtotal - discount;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleOrder = () => {
    // Validation
    if (!formData.firstName || !formData.address || !formData.phone || !formData.email) {
      alert("Mohon lengkapi semua data pengiriman.");
      return;
    }

    const payload = {
      customer_name: formData.firstName,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      product_name: cart.map((item) => item.name).join(", "),
      total: total,
      status: "Diproses",
    };

    fetch("http://127.0.0.1:8000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("latestOrder", JSON.stringify({
          id: data.id,
          total: data.total,
        }));
        clearCart(); // Kosongkan keranjang
        navigate("/tracking");
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal membuat pesanan. Pastikan server backend Anda menyala.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/cart" className="hover:text-brand transition-colors">Cart</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Checkout</span>
        </nav>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Billing Details</h1>
            <p className="text-gray-500">Selesaikan pembelian Anda dengan mengisi detail pengiriman di bawah ini.</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-bold border border-green-100 shadow-sm">
            <Lock size={16} />
            <span>100% Secure Checkout</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Form Section */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">1</div>
                  <span className="font-bold text-sm">Pengiriman</span>
               </div>
               <div className="h-0.5 flex-grow bg-gray-100"></div>
               <div className="flex items-center gap-3 opacity-40">
                  <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">2</div>
                  <span className="font-bold text-sm">Pembayaran</span>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
               <h3 className="text-xl font-bold flex items-center gap-2">
                  <MapPin size={20} className="text-brand" />
                  Alamat Pengiriman
               </h3>

               <form className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nama Lengkap*</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand/20 outline-none transition-all font-medium" 
                      required 
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Alamat Lengkap*</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Masukkan alamat pengiriman"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand/20 outline-none transition-all font-medium" 
                      required 
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">No. WhatsApp/HP*</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Contoh: 0812..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand/20 outline-none transition-all font-medium" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address*</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@contoh.com"
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand/20 outline-none transition-all font-medium" 
                        required 
                      />
                    </div>
                 </div>

                 <label className="flex items-center gap-3 cursor-pointer group pt-4">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand focus:ring-brand cursor-pointer" />
                    <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">Simpan informasi ini untuk pembelian berikutnya</span>
                 </label>
               </form>
            </div>
          </div>

          {/* Right: Summary Section */}
          <aside className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                     <ShieldCheck size={20} className="text-brand" />
                     Order Summary
                  </h3>

                  {/* Cart Items List */}
                  <div className="space-y-4">
                     {cart.map((item) => (
                       <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                             </div>
                             <div className="space-y-0.5">
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                             </div>
                          </div>
                          <p className="text-sm font-bold">{formatRupiah(item.currentPrice * item.qty)}</p>
                       </div>
                     ))}
                  </div>

                  {/* Coupon Section */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Coupon Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className={`flex-1 bg-gray-50 border rounded-xl px-4 py-2.5 outline-none transition-all text-sm font-bold uppercase tracking-widest ${
                          couponStatus === "success" ? "border-green-500 bg-green-50" : 
                          couponStatus === "error" ? "border-brand bg-red-50" : "border-gray-100"
                        }`}
                      />
                      <button 
                        onClick={applyCoupon}
                        className="bg-premium-dark text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-95"
                      >
                        Apply
                      </button>
                    </div>
                    {couponStatus === "success" && <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest ml-1">Kupon berhasil diterapkan!</p>}
                    {couponStatus === "error" && <p className="text-[10px] font-bold text-brand uppercase tracking-widest ml-1">Kode kupon tidak valid.</p>}
                  </div>

                  {/* Pricing Details */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                     <div className="flex justify-between text-gray-500 text-sm">
                        <span>Subtotal</span>
                        <span className="font-bold text-gray-900">{formatRupiah(subtotal)}</span>
                     </div>
                     {discount > 0 && (
                       <div className="flex justify-between text-green-600 text-sm animate-fade-in">
                          <span>Discount</span>
                          <span className="font-bold">-{formatRupiah(discount)}</span>
                       </div>
                     )}
                     <div className="flex justify-between text-gray-500 text-sm">
                        <span>Shipping</span>
                        <span className="font-bold text-green-600">Free</span>
                     </div>
                     <div className="flex justify-between items-end pt-4 border-t border-dashed border-gray-200">
                        <span className="font-bold text-gray-900 text-lg">Total</span>
                        <span className="text-2xl font-display font-black text-brand">{formatRupiah(total)}</span>
                     </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-4 pt-6">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Metode Pembayaran</h4>
                     <div className="space-y-3">
                        <label className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer hover:border-brand transition-all group">
                           <div className="flex items-center gap-3">
                              <Landmark size={20} className="text-gray-400 group-hover:text-brand" />
                              <span className="text-sm font-bold">Transfer Bank</span>
                           </div>
                           <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-brand focus:ring-brand border-gray-300" />
                        </label>
                        <label className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer hover:border-brand transition-all group">
                           <div className="flex items-center gap-3">
                              <Banknote size={20} className="text-gray-400 group-hover:text-brand" />
                              <span className="text-sm font-bold">Cash on Delivery</span>
                           </div>
                           <input type="radio" name="payment" className="w-5 h-5 text-brand focus:ring-brand border-gray-300" />
                        </label>
                     </div>
                  </div>

                  <button 
                    onClick={handleOrder}
                    className="w-full btn-primary py-4 rounded-xl text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand/20 transition-all active:scale-95"
                  >
                    Place Order Now
                  </button>

                  {/* Trust Badges */}
                  <div className="pt-6 border-t border-gray-100 flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                     <div className="flex items-center gap-1.5">
                        <Truck size={14} className="text-brand" />
                        Free Shipping
                     </div>
                     <div className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-brand" />
                        Safe Payment
                     </div>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;