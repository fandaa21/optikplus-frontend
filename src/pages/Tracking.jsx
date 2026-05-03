import { useEffect, useState } from "react";
import { Package, Download, MapPin, Calendar, CreditCard, ChevronRight, CheckCircle2, ArrowLeft, Printer } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import jsPDF from "jspdf";
import { Link, useNavigate } from "react-router-dom";

function Tracking() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const downloadInvoice = () => {
    const doc = new jsPDF();
    const primaryColor = "#DB4444";
    const darkColor = "#1a1a1a";
    const grayColor = "#64748b";

    // --- Header ---
    doc.setFillColor(darkColor);
    doc.rect(0, 0, 210, 50, "F");

    // Branding / Logo
    try {
      doc.addImage("/images/logo.png", "PNG", 20, 10, 30, 30);
    } catch (e) {
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("OPTIK PLUS", 20, 30);
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Premium Eyewear & Lens Specialist", 60, 25);
    doc.text("Jl. Delima, Pekanbaru, Riau", 60, 32);
    doc.text("WA: +62 812-8355-3361", 60, 39);

    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 140, 35);

    // --- Details ---
    doc.setTextColor(darkColor);
    doc.setFontSize(12);
    doc.text("Bill To:", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text("Pelanggan Setia Optik Plus", 20, 78);
    doc.text("Pekanbaru, Indonesia", 20, 84);

    doc.setFont("helvetica", "bold");
    doc.text("Order Info:", 140, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`ID Pesanan: #ORD-${order.id}`, 140, 78);
    doc.text(`Tanggal: ${new Date(order.created_at).toLocaleDateString("id-ID")}`, 140, 84);
    doc.text(`Status: ${order.status.toUpperCase()}`, 140, 90);

    // --- Table ---
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 105, 170, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkColor);
    doc.text("Deskripsi Produk", 25, 112);
    doc.text("Total Harga", 155, 112);

    doc.setFont("helvetica", "normal");
    doc.text(`${order.product_name}`, 25, 125);
    doc.text(`Rp ${Number(order.total).toLocaleString("id-ID")}`, 155, 125);
    doc.line(20, 132, 190, 132);

    // --- Summary ---
    const summaryY = 150;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Subtotal:", 130, summaryY);
    doc.text(`Rp ${Number(order.total).toLocaleString("id-ID")}`, 165, summaryY);

    doc.text("Pengiriman:", 130, summaryY + 8);
    doc.setTextColor(22, 163, 74);
    doc.text("GRATIS", 165, summaryY + 8);

    doc.setFillColor(primaryColor);
    doc.rect(125, summaryY + 15, 70, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("TOTAL BAYAR:", 130, summaryY + 23);
    doc.text(`Rp ${Number(order.total).toLocaleString("id-ID")}`, 160, summaryY + 23);

    // --- Footer ---
    doc.setFontSize(8);
    doc.setTextColor(grayColor);
    doc.text("Catatan:", 20, 250);
    doc.text("1. Produk yang sudah dibeli tidak dapat ditukar/dikembalikan.", 20, 256);
    doc.text("2. Simpan invoice ini sebagai bukti garansi resmi Optik Plus.", 20, 262);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("TERIMA KASIH TELAH BERBELANJA", 105, 280, { align: "center" });

    doc.save(`Invoice-OPTIKPLUS-${order.id}.pdf`);
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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <Navbar />
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300 animate-pulse">
            <Package size={32} />
          </div>
          <h2 className="text-xl font-bold">Memuat detail pesanan...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow section-container max-w-4xl">
        <header className="text-center space-y-4 mb-12">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Pesanan Berhasil!</h1>
          <p className="text-gray-500 text-lg">Terima kasih, pesanan Anda telah kami terima dan sedang diproses.</p>
        </header>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">
          {/* Top Banner */}
          <div className="bg-premium-dark p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">ID Pesanan</span>
              <h2 className="text-2xl md:text-3xl font-display font-black tracking-tighter">#ORD-{order.id}</h2>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-sm">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold tracking-widest uppercase">{order.status}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                <Package size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Produk yang dibeli</h4>
                <p className="text-gray-900 font-bold leading-relaxed">{order.product_name}</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                <Calendar size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tanggal Pesanan</h4>
                <p className="text-gray-900 font-bold">{new Date(order.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                <CreditCard size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Pembayaran</h4>
                <p className="text-2xl font-display font-black text-brand tracking-tighter">
                  Rp {Number(order.total).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lokasi Toko</h4>
                <p className="text-gray-900 font-bold leading-relaxed">Optik Plus Langkawi, Jl. Delima, Pekanbaru.</p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-gray-50 p-8 md:p-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              className="w-full sm:w-auto btn-primary flex items-center gap-2 group"
              onClick={downloadInvoice}
            >
              <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> 
              Unduh Faktur (PDF)
            </button>
            <button 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-all"
              onClick={() => window.print()}
            >
              <Printer size={20} /> Cetak Halaman
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
           <button 
             onClick={() => navigate("/")}
             className="text-gray-500 font-bold hover:text-brand transition-colors flex items-center gap-2 mx-auto"
           >
             <ArrowLeft size={20} /> Kembali ke Beranda
           </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Tracking;
