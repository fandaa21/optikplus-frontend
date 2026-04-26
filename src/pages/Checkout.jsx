
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaShieldAlt, FaTruck, FaChevronRight, FaUniversity, FaRegMoneyBillAlt } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderSummary from "../components/OrderSummary";

function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);// Bisa dikirim dari Cart jika ada

  // Menghitung total untuk dikirim ke database
  const subtotal = cart.reduce((sum, item) => sum + item.currentPrice * item.qty, 0);
  const total = subtotal - discount;

  // FUNGSI UTAMA PLACE ORDER
  const handleOrder = () => {
    // Menyiapkan data untuk dikirim ke API Laravel/Node.js Anda
    const payload = {
      customer_name: "Customer Website", // Nantinya bisa diambil dari input form
      phone: "08123456789",
      address: "Langkawi",
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
        // Simpan data order terakhir ke localStorage untuk halaman tracking
        localStorage.setItem("latestOrder", JSON.stringify({
          id: data.id,
          total: data.total,
        }));
        
        // Pindah ke halaman tracking setelah sukses
        navigate("/tracking");
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal membuat pesanan. Pastikan server backend Anda menyala.");
      });
  };

  return (
    <div className="checkout-layout">
      <Navbar />

      <main className="checkout-page">
        <div className="container">
          <nav className="breadcrumb">
            <span className="crumb">Home</span>
            <FaChevronRight className="b-icon" />
            <span className="crumb">Cart</span>
            <FaChevronRight className="b-icon" />
            <span className="crumb active">Checkout</span>
          </nav>

          <header className="checkout-header">
            <div className="header-title">
              <h1>Billing Details</h1>
              <p>Complete your purchase by providing your payment details.</p>
            </div>
            <div className="secure-badge">
              <FaShieldAlt />
              <span>100% Secure Checkout</span>
            </div>
          </header>

          <div className="checkout-grid">
            {/* KIRI: Form Section */}
            <section className="form-section-wrapper">
              <div className="step-indicator">
                <div className="step active">
                  <span className="step-number">1</span>
                  <span className="step-label">Pengiriman</span>
                </div>
                <div className="step-line"></div>
                <div className="step">
                  <span className="step-number">2</span>
                  <span className="step-label">Pembayaran</span>
                </div>
              </div>

              <form className="checkout-form">
                <div className="input-row">
                  <input type="text" placeholder="First Name*" required />
                  <input type="text" placeholder="Last Name*" required />
                </div>
                <input type="text" placeholder="Street Address*" required />
                <input type="text" placeholder="Town/City*" required />
                <input type="tel" placeholder="Phone Number*" required />
                <input type="email" placeholder="Email Address*" required />

                <label className="checkbox-group">
                  <input type="checkbox" />
                  <span>Save this information for faster check-out next time</span>
                </label>
              </form>
            </section>

            {/* KANAN: Sidebar Summary */}
            <aside className="summary-section-wrapper">
              <div className="sticky-summary">
                <div className="summary-card">
                  {/* Kirim discount ke component summary agar angka sinkron */}
                  <OrderSummary cart={cart} discount={discount} />

                  <div className="checkout-action-area">
                    <h3 className="payment-title">Payment Method</h3>
                    <div className="payment-options">
                      <label className="payment-item">
                        <input type="radio" name="payment" defaultChecked />
                        <div className="payment-content">
                          <FaUniversity className="payment-icon" />
                          <span>Bank Transfer</span>
                        </div>
                      </label>
                      <label className="payment-item">
                        <input type="radio" name="payment" />
                        <div className="payment-content">
                          <FaRegMoneyBillAlt className="payment-icon" />
                          <span>Cash on Delivery</span>
                        </div>
                      </label>
                    </div>

                    {/* HUBUNGKAN FUNGSI DI SINI */}
                    <button className="btn-place-order" onClick={handleOrder}>
                      Place Order
                    </button>
                  </div>

                  <div className="checkout-trust-badges">
                    <div className="badge-item">
                      <div className="badge-icon"><FaTruck /></div>
                      <div className="badge-text">
                        <span className="badge-title">Free Shipping</span>
                        <span className="badge-desc">On this order today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;