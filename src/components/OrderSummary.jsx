import { useNavigate } from "react-router-dom";
import { useState } from "react";

function OrderSummary({ cart }) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const applyCoupon = () => {
    const savedPromos = JSON.parse(localStorage.getItem("promos")) || [];

    const allPromos = [
      ...savedPromos,
      { code: "OPTIK30" },
      { code: "STUDENT15" },
      { code: "FREECOAT" },
    ];

    const found = allPromos.find(
      (item) => item.code.toLowerCase() === coupon.toLowerCase(),
    );

    if (!found) {
      alert("Kode coupon tidak valid");
      return;
    }

    let value = 0;

    if (coupon.toUpperCase() === "OPTIK30") value = subtotal * 0.3;
    else if (coupon.toUpperCase() === "STUDENT15") value = subtotal * 0.15;
    else if (coupon.toUpperCase().includes("25")) value = subtotal * 0.25;
    else value = subtotal * 0.1;

    setDiscount(value);
  };
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.currentPrice * item.qty,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping - discount;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleOrder = () => {
    const orderId = "ORD-" + Date.now();

    const orderData = {
      orderId,
      total,
      status: "Diproses",
    };

    fetch("http://127.0.0.1:8000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: "Customer Website",
        phone: "08123456789",
        address: "Langkawi",
        product_name: cart.map((item) => item.name).join(", "),
        total: total,
        status: "Diproses",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "latestOrder",
          JSON.stringify({
            id: data.id,
            total: data.total,
          }),
        );

        navigate("/tracking");
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal membuat pesanan");
      });
  };

  return (
    <div className="order-summary">
      {cart.map((item) => (
        <div className="summary-item" key={item.id}>
          <div className="summary-product">
            <img src={item.image} alt={item.name} />

            <span>
              {item.name} x{item.qty}
            </span>
          </div>

          <span>{formatRupiah(item.currentPrice * item.qty)}</span>
        </div>
      ))}

      <div className="summary-line">
        <span>Subtotal:</span>
        <span>{formatRupiah(subtotal)}</span>
      </div>
      <div className="summary-line">
        <span>Discount:</span>
        <span>- Rp {discount.toLocaleString("id-ID")}</span>
      </div>

      <div className="summary-line">
        <span>Shipping:</span>
        <span>Free</span>
      </div>

      <div className="summary-line total">
        <span>Total:</span>
        <span>{formatRupiah(total)}</span>
      </div>

      {/* <div className="payment-method">
        <label>
          <input type="radio" name="pay" defaultChecked />
          Bank Transfer
        </label>

        <label>
          <input type="radio" name="pay" />
          Cash on Delivery
        </label>
      </div> */}

      {/* <div className="coupon-box">
        <input
          placeholder="Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />

        <button onClick={applyCoupon}>Apply Coupon</button>
      </div>

      <button className="place-order" onClick={handleOrder}>
        Place Order
      </button> */}
    </div>
  );
}

export default OrderSummary;
