import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaTicketAlt,
  FaShoppingCart,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

function Cart() {
  const { cart, removeItem, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

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
        confirmButtonColor: "#1e293b",
      });
      setDiscount(0);
    }
  };

  const brandColor = "#DB4444";

  return (
    <>
      <style>{`
        .cart-page {
          padding: 60px 20px;
          background-color: #fcfcfc;
          min-height: 80vh;
        }
        .breadcrumb {
          font-size: 14px;
          color: #888;
          margin-bottom: 20px;
        }
        .breadcrumb span { color: #333; font-weight: 600; }
        
        .page-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 40px;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: -1px;
        }

        .cart-container {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 992px) {
          .cart-container { grid-template-columns: 1fr; }
        }

        /* Empty State */
        .cart-empty-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 20px;
          border: 1px dashed #ddd;
        }
        .empty-icon { font-size: 4rem; margin-bottom: 20px; opacity: 0.3; }

        /* Cart Items */
        .cart-items-list { display: flex; flex-direction: column; gap: 20px; }
        
        .cart-item-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid #eee;
          transition: 0.3s;
        }
        .cart-item-card:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.05); }

        .item-info { display: flex; align-items: center; gap: 20px; }
        .item-img-wrapper {
          width: 100px;
          height: 100px;
          background: #f5f5f5;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-img-wrapper img { width: 80%; object-fit: contain; }
        .item-details h3 { font-size: 1.1rem; margin-bottom: 5px; color: #333; }
        .item-price-unit { color: ${brandColor}; font-weight: 700; }

        .item-actions { display: flex; align-items: center; gap: 40px; }
        .qty-selector {
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-radius: 30px;
          padding: 5px 15px;
          gap: 15px;
        }
        .qty-selector button {
          border: none;
          background: none;
          cursor: pointer;
          color: #555;
          transition: 0.2s;
        }
        .qty-selector button:hover:not(:disabled) { color: ${brandColor}; }
        .qty-selector span { font-weight: 700; min-width: 20px; text-align: center; }

        .item-subtotal { font-weight: 800; color: #1a1a1a; min-width: 120px; text-align: right; }
        
        .delete-btn {
          background: #fff5f5;
          color: #ff4d4d;
          border: none;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
        }
        .delete-btn:hover { background: #ff4d4d; color: white; }

        /* Summary Section */
        .summary-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          border: 1px solid #eee;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
        }
        .summary-card h3 { margin-bottom: 25px; font-weight: 800; border-bottom: 2px solid #f5f5f5; padding-bottom: 15px; }

        .coupon-section { display: flex; gap: 10px; margin-bottom: 25px; }
        .input-group {
          flex: 1;
          display: flex;
          align-items: center;
          background: #f9f9f9;
          padding: 0 15px;
          border-radius: 10px;
          border: 1px solid #eee;
        }
        .input-group input {
          border: none;
          background: none;
          padding: 12px 10px;
          width: 100%;
          outline: none;
          font-weight: 600;
        }
        .input-icon { color: #888; }
        
        .apply-btn {
          background: #1e293b;
          color: white;
          border: none;
          padding: 0 20px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .summary-details { display: flex; flex-direction: column; gap: 15px; }
        .summary-line { display: flex; justify-content: space-between; color: #666; font-weight: 500; }
        .summary-line.total {
          font-size: 1.4rem;
          color: #1a1a1a;
          font-weight: 900;
          margin-top: 10px;
          padding-top: 20px;
          border-top: 2px dashed #eee;
        }
        .free { color: #22c55e; font-weight: 700; }
        .discount span:last-child { color: #22c55e; }

        .checkout-btn {
          width: 100%;
          background: ${brandColor};
          color: white;
          border: none;
          padding: 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          margin-top: 30px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 10px 20px rgba(219, 68, 68, 0.2);
        }
        .checkout-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(219, 68, 68, 0.3); }
        .checkout-btn:disabled { background: #ccc; cursor: not-allowed; box-shadow: none; }

        .continue-shopping-btn {
          background: none;
          border: 2px solid #eee;
          padding: 12px 25px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 700;
          color: #555;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
          width: fit-content;
          margin-top: 20px;
        }
        .continue-shopping-btn:hover { border-color: ${brandColor}; color: ${brandColor}; }

        /* Tombol Mulai Belanja Custom */
        .start-shopping-btn {
          background: ${brandColor};
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 8px 20px rgba(219, 68, 68, 0.2);
          margin-top: 25px;
        }
        .start-shopping-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 25px rgba(219, 68, 68, 0.3);
        }
      `}</style>

      <Navbar />
      <section className="cart-page container">
        <nav className="breadcrumb">
          Home / <span>Cart</span>
        </nav>

        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-container">
          <div className="cart-main">
            {cart.length === 0 ? (
              <div className="cart-empty-state">
                <div className="empty-icon"><FaShoppingCart /></div>
                <h2 style={{fontWeight: 800}}>Keranjangmu Kosong</h2>
                <p style={{color: '#777'}}>Sepertinya kamu belum memilih kacamata favoritmu.</p>
                <button
                  className="start-shopping-btn"
                  onClick={() => navigate("/katalog")}
                >
                  Mulai Belanja Sekarang
                </button>
              </div>
            ) : (
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div className="cart-item-card" key={item.id}>
                    <div className="item-info">
                      <div className="item-img-wrapper">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p className="item-price-unit">
                          {formatRupiah(item.currentPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="item-actions">
                      <div className="qty-selector">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          disabled={item.qty <= 1}
                        >
                          <FaMinus />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => increaseQty(item.id)}>
                          <FaPlus />
                        </button>
                      </div>
                      <p className="item-subtotal">
                        {formatRupiah(item.currentPrice * item.qty)}
                      </p>
                      <button
                        className="delete-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  className="continue-shopping-btn"
                  onClick={() => navigate("/katalog")}
                >
                  <FaArrowLeft />
                  <span>Continue Shopping</span>
                </button>
              </div>
            )}
          </div>

          <aside className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="coupon-section">
                <div className="input-group">
                  <FaTicketAlt className="input-icon" />
                  <input
                    placeholder="Coupon Code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                <button className="apply-btn" onClick={applyCoupon}>
                  Apply
                </button>
              </div>

              <div className="summary-details">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="summary-line discount">
                  <span>Discount</span>
                  <span>- {formatRupiah(discount)}</span>
                </div>
                <div className="summary-line shipping">
                  <span>Shipping</span>
                  <span className="free">Free</span>
                </div>
                <div className="summary-line total">
                  <span>Total</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              <button
                className="checkout-btn"
                disabled={cart.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;