import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Estimasi() {
  // Update state harga awal ke Rupiah
  const [framePrice, setFramePrice] = useState(250000);
  const [lensPrice, setLensPrice] = useState(150000);
  const [blueLight, setBlueLight] = useState(false);
  const [photo, setPhoto] = useState(false);

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Daftar frame dengan harga Rupiah
  const frames = [
    { name: "Classic Round", price: 250000, desc: "Premium Acetate" },
    { name: "Retro Brown", price: 450000, desc: "Vintage Look" },
    { name: "Kids Flex", price: 300000, desc: "Durabilitas Tinggi" },
    { name: "Metal Premium", price: 750000, desc: "Titanium Ringan" }
  ];

  // Helper untuk format mata uang
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const addon = (blueLight ? 100000 : 0) + (photo ? 150000 : 0);
  const total = framePrice + lensPrice + addon;

  const primaryColor = "#DB4444";

  const handleOrder = () => {
    const selectedFrame =
      frames.find((item) => item.price === framePrice) || frames[0];

    const lensName =
      lensPrice === 150000
        ? "Standard Lens"
        : lensPrice === 300000
        ? "Thin Lens"
        : "Premium Lens";

    const addons = [];
    if (blueLight) addons.push("Blue Light Filter");
    if (photo) addons.push("Photochromic");

    addToCart({
      id: Date.now(),
      name: `${selectedFrame.name} + ${lensName}`,
      currentPrice: total,
      qty: 1,
      image: "/images/kacamata1.png",
      addon: addons.join(", "),
      category: "Custom Order",
    });

    navigate("/cart");
  };

  return (
    <>
      <style>{`
        .estimasi-page {
          background-color: #fcfcfc;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, sans-serif;
          padding: 40px 20px;
          color: #1a1a1a;
        }
        .container { max-width: 1000px; margin: 0 auto; }
        .header-title { margin-bottom: 40px; border-left: 5px solid ${primaryColor}; padding-left: 20px; }
        .header-title h1 { font-size: 2rem; font-weight: 900; text-transform: uppercase; margin: 0; }
        .main-layout { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }
        @media (max-width: 850px) { .main-layout { grid-template-columns: 1fr; } }
        .card { background: #ffffff; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eee; margin-bottom: 25px; }
        .section-label { display: block; font-weight: 800; font-size: 1rem; margin-bottom: 20px; color: #333; text-transform: uppercase; }
        .frame-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
        .frame-card { padding: 15px; border: 1.5px solid #eee; border-radius: 8px; cursor: pointer; transition: all 0.2s; position: relative; }
        .frame-card.active { border-color: ${primaryColor}; background: rgba(219, 68, 68, 0.03); }
        .frame-card.active::after { content: '✓'; position: absolute; top: 10px; right: 10px; background: ${primaryColor}; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }
        .custom-select { width: 100%; padding: 12px; border-radius: 6px; border: 1px solid #ddd; background: #fff; font-weight: 500; }
        .addon-option { display: flex; align-items: center; padding: 15px; border: 1px solid #f0f0f0; border-radius: 8px; margin-top: 10px; cursor: pointer; }
        .addon-option input { width: 20px; height: 20px; margin-right: 12px; accent-color: ${primaryColor}; }
        .summary-box { background: #ffffff; border-radius: 12px; padding: 30px; position: sticky; top: 30px; border: 1px solid #eee; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; color: #666; font-size: 0.9rem; }
        .summary-total { border-top: 2px dashed #eee; padding-top: 20px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
        .total-amount { font-size: 1.5rem; font-weight: 900; color: ${primaryColor}; }
        .order-button { width: 100%; background: ${primaryColor}; color: white; border: none; padding: 18px; border-radius: 6px; font-weight: 700; text-transform: uppercase; margin-top: 25px; cursor: pointer; }
      `}</style>

      <Navbar />

      <section className="estimasi-page">
        <div className="container">
          <div className="header-title">
            <h1>Estimasi Biaya</h1>
            <p style={{ color: "#666", marginTop: "5px" }}>
              Konfigurasikan pilihan kacamata Anda di bawah ini.
            </p>
          </div>

          <div className="main-layout">
            <div className="config-side">
              <div className="card">
                <span className="section-label">Pilih Frame</span>
                <div className="frame-grid">
                  {frames.map((f, i) => (
                    <div
                      key={i}
                      className={`frame-card ${framePrice === f.price ? "active" : ""}`}
                      onClick={() => setFramePrice(f.price)}
                    >
                      <div style={{ fontWeight: "700" }}>{f.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "#888" }}>{f.desc}</div>
                      <div style={{ marginTop: "10px", color: primaryColor, fontWeight: "800" }}>
                        {formatRupiah(f.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <span className="section-label">Lensa & Add-ons</span>
                <div style={{ marginBottom: "25px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: "bold", marginBottom: "8px", display: "block", color: "#888" }}>
                    TIPE LENSA
                  </label>
                  <select
                    className="custom-select"
                    onChange={(e) => setLensPrice(Number(e.target.value))}
                  >
                    <option value="150000">Standard Lens (+{formatRupiah(150000)})</option>
                    <option value="300000">Thin Lens (+{formatRupiah(300000)})</option>
                    <option value="500000">Premium Lens (+{formatRupiah(500000)})</option>
                  </select>
                </div>

                <label className="addon-option">
                  <input type="checkbox" checked={blueLight} onChange={() => setBlueLight(!blueLight)} />
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.9rem" }}>Blue Light Filter</div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>Blokir sinar biru dari layar gadget</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontWeight: "800", color: primaryColor }}>
                    +{formatRupiah(100000)}
                  </div>
                </label>

                <label className="addon-option">
                  <input type="checkbox" checked={photo} onChange={() => setPhoto(!photo)} />
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "0.9rem" }}>Photochromic</div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>Adaptasi cahaya (gelap saat di luar)</div>
                  </div>
                  <div style={{ marginLeft: "auto", fontWeight: "800", color: primaryColor }}>
                    +{formatRupiah(150000)}
                  </div>
                </label>
              </div>
            </div>

            <div className="summary-side">
              <div className="summary-box">
                <h3 style={{ margin: "0 0 20px 0", fontSize: "1.1rem", fontWeight: "800", textTransform: "uppercase" }}>
                  Ringkasan Pesanan
                </h3>

                <div className="summary-row">
                  <span>Pilihan Frame</span>
                  <span style={{ fontWeight: "600", color: "#333" }}>{formatRupiah(framePrice)}</span>
                </div>

                <div className="summary-row">
                  <span>Tipe Lensa</span>
                  <span style={{ fontWeight: "600", color: "#333" }}>{formatRupiah(lensPrice)}</span>
                </div>

                <div className="summary-row">
                  <span>Add-ons</span>
                  <span style={{ fontWeight: "600", color: "#333" }}>{formatRupiah(addon)}</span>
                </div>

                <div className="summary-total">
                  <span style={{ fontWeight: "700" }}>ESTIMASI TOTAL</span>
                  <span className="total-amount">{formatRupiah(total)}</span>
                </div>

                <button className="order-button" onClick={handleOrder}>
                  Lanjutkan Pesanan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Estimasi;