import { useEffect, useState } from "react";
import { Package, Download, MapPin, Calendar, CreditCard } from "lucide-react"; // Ikon modern
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import jsPDF from "jspdf";

function Tracking() {
  const [order, setOrder] = useState(null);

  const downloadInvoice = () => {
    const doc = new jsPDF();
    const primaryColor = "#DB4444";
    const secondaryColor = "#475569";

    // --- HEADER ---
    doc.setFillColor(15, 23, 42); // Warna Slate-900 (Gelap)
    doc.rect(0, 0, 210, 40, "F"); // Background header hitam

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("OPTIK PLUS LANGKAWI", 20, 25);

    // --- INFO INVOICE ---
    doc.setTextColor(secondaryColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Diterbitkan untuk:", 20, 55);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Pelanggan Setia Optik Plus", 20, 62); // Bisa diganti order.customer_name jika ada

    doc.setTextColor(secondaryColor);
    doc.setFontSize(10);
    doc.text(`ID Pesanan: #ORD-${order.id}`, 140, 55);
    doc.text(
      `Tanggal: ${new Date(order.created_at).toLocaleDateString("id-ID")}`,
      140,
      62,
    );

    // --- TABEL HEADER ---
    doc.setDrawColor(226, 232, 240); // Warna border abu-abu
    doc.line(20, 75, 190, 75); // Garis atas tabel

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("Deskripsi Produk", 25, 83);
    doc.text("Total", 160, 83);

    doc.line(20, 88, 190, 88); // Garis bawah header tabel

    // --- ISI TABEL ---
    doc.setFont("helvetica", "normal");
    doc.text(`${order.product_name}`, 25, 100);
    doc.text(`Rp ${Number(order.total).toLocaleString("id-ID")}`, 160, 100);

    // --- SUMMARY / TOTAL ---
    doc.setFillColor(248, 250, 252);
    doc.rect(130, 115, 60, 30, "F"); // Box total

    doc.setFont("helvetica", "bold");
    doc.text("TOTAL BAYAR", 135, 125);
    doc.setTextColor(primaryColor);
    doc.setFontSize(14);
    doc.text(`Rp ${Number(order.total).toLocaleString("id-ID")}`, 135, 135);

    // --- FOOTER ---
    doc.setTextColor(secondaryColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Status Pesanan:", 20, 160);
    doc.setTextColor(primaryColor);
    doc.text(`${order.status.toUpperCase()}`, 50, 160);

    doc.setTextColor(secondaryColor);
    doc.setFontSize(9);
    doc.text(
      "Terima kasih telah mempercayakan kesehatan mata Anda kepada kami.",
      105,
      200,
      { align: "center" },
    );
    doc.text("Invoice ini sah dihasilkan secara komputerisasi.", 105, 205, {
      align: "center",
    });

    // Simpan PDF
    doc.save(`Invoice-ORD-${order.id}.pdf`);
  };

  useEffect(() => {
    const latest = JSON.parse(localStorage.getItem("latestOrder"));
    if (!latest) return;

    fetch(`http://127.0.0.1:8000/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id == latest.id);
        setOrder(found);
      });
  }, []);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Package size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold">Memuat detail pesanan...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="tracking-page-container">
      <Navbar />
      <main className="max-w-4xl">
        <header>
          <h1>Status Pesanan</h1>
          <p>Terima kasih, pesanan Anda telah kami terima.</p>
        </header>

        <div className="tracking-main-card">
          {/* Header Hitam */}
          <div className="card-header-black">
            <div>
              <span className="order-id-label">ID Pesanan</span>
              <h2 style={{ margin: 0 }}>#ORD-{order.id}</h2>
            </div>
            <div className="status-badge-modern">
              <span
                className="animate-pulse"
                style={{
                  width: 8,
                  height: 8,
                  background: "#4ade80",
                  borderRadius: "50%",
                }}
              ></span>
              {order.status}
            </div>
          </div>

          {/* Isi Info */}
          <div className="card-body-content">
            <div className="info-group">
              <div className="icon-box">
                <Package size={20} />
              </div>
              <div className="info-text">
                <h4>Produk yang dibeli</h4>
                <p>{order.product_name}</p>
              </div>
            </div>

            <div className="info-group">
              <div className="icon-box">
                <Calendar size={20} />
              </div>
              <div className="info-text">
                <h4>Tanggal Pesanan</h4>
                <p>{new Date(order.created_at).toLocaleDateString("id-ID")}</p>
              </div>
            </div>

            <div className="info-group">
              <div className="icon-box">
                <CreditCard size={20} />
              </div>
              <div className="info-text">
                <h4>Total Pembayaran</h4>
                <p className="price-text">
                  Rp {Number(order.total).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="info-group">
              <div className="icon-box">
                <MapPin size={20} />
              </div>
              <div className="info-text">
                <h4>Lokasi Toko</h4>
                <p>Optik Plus Langkawi, Kedah.</p>
              </div>
            </div>
          </div>

          {/* Tombol Bawah */}
          <div className="action-footer">
            <button className="btn-download" onClick={downloadInvoice}>
              <Download size={18} /> Unduh Faktur (PDF)
            </button>
            <button className="btn-print" onClick={() => window.print()}>
              Pelacakan Cetak
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Tracking;
