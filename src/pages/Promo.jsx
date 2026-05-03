import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Ticket, Clock, Copy, Check, ChevronRight, Sparkles, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Promo() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState("");
  const [time, setTime] = useState({ hours: 2, minutes: 14, seconds: 55 });
  const [promos, setPromos] = useState([]);

  const format = (num) => String(num).padStart(2, "0");

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else return { hours: 0, minutes: 0, seconds: 0 };
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const setDefaultPromos = [
      { 
        title: "Flash Sale 30%", 
        desc: "Diskon frame pilihan khusus hari ini untuk koleksi kacamata pria & wanita.", 
        code: "OPTIK30", 
        color: "bg-brand",
        expiry: "Berakhir dlm 2 jam"
      },
      { 
        title: "Free Coating", 
        desc: "Gratis lapisan anti radiasi blue light setiap pembelian kacamata lengkap.", 
        code: "FREECOAT", 
        color: "bg-blue-600",
        expiry: "Berlaku s/d Akhir Bulan"
      },
      { 
        title: "Student Promo", 
        desc: "Potongan harga spesial untuk pelajar & mahasiswa (dengan menunjukkan KTM).", 
        code: "STUDENT15", 
        color: "bg-green-600",
        expiry: "Promo Selamanya"
      },
    ];
    setPromos(setDefaultPromos);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Promo</span>
        </nav>

        {/* Header Section */}
        <header className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 text-brand rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            Exclusive Rewards
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-gray-900">
            Penawaran <span className="text-brand">Terbaik</span> Hari Ini
          </h1>
          
          <div className="flex items-center justify-center gap-8 py-6 px-8 bg-white rounded-3xl shadow-sm border border-gray-100 w-fit mx-auto">
            <div className="flex items-center gap-3 text-brand">
              <Clock size={24} className="animate-pulse" />
              <span className="font-bold uppercase tracking-widest text-sm">Ends In:</span>
            </div>
            <div className="flex gap-4">
              {[
                { label: "HRS", val: time.hours },
                { label: "MIN", val: time.minutes },
                { label: "SEC", val: time.seconds }
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl font-display font-black tabular-nums">{format(t.val)}</span>
                  <span className="text-[10px] font-bold text-gray-400">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {promos.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row overflow-hidden border border-gray-100"
            >
              {/* Left Side (Color Panel) */}
              <div className={`${item.color} md:w-48 flex items-center justify-center p-8 text-white relative`}>
                <div className="flex flex-col items-center text-center gap-2">
                  <Ticket size={48} className="rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                  <span className="text-2xl font-display font-black tracking-tighter">DISCOUNT</span>
                </div>
                {/* Perforated edge effect */}
                <div className="hidden md:block absolute top-0 right-0 h-full w-4 flex flex-col justify-around py-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white rounded-full -mr-1"></div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-brand uppercase tracking-wider bg-brand/5 px-2 py-1 rounded">
                      <Zap size={10} className="fill-current" />
                      Limited
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{item.desc}</p>
                </div>

                <div className="space-y-6">
                  {/* Coupon Box */}
                  <div className="flex items-center justify-between bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-1.5 focus-within:border-brand transition-colors group/code">
                    <span className="px-4 font-display font-black text-xl tracking-widest text-gray-800 uppercase">{item.code}</span>
                    <button 
                      onClick={() => copyToClipboard(item.code)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                        copiedCode === item.code ? "bg-green-500 text-white" : "bg-premium-dark text-white hover:bg-black"
                      }`}
                    >
                      {copiedCode === item.code ? (
                        <><Check size={16} /> Copied</>
                      ) : (
                        <><Copy size={16} /> Copy Code</>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                    <span>* {item.expiry}</span>
                    <Link to="/katalog" className="text-brand hover:underline underline-offset-4 flex items-center gap-1">
                      Syarat & Ketentuan <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 p-12 rounded-3xl bg-gray-100 border border-gray-200 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
           <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand flex-shrink-0">
             <Sparkles size={32} />
           </div>
           <div className="flex-grow">
             <h4 className="text-xl font-bold mb-2">Punya Kode Promo Lain?</h4>
             <p className="text-gray-500 text-sm">Gunakan kode promo Anda di halaman pembayaran (Checkout) untuk mendapatkan potongan harga langsung.</p>
           </div>
           <button 
             onClick={() => navigate("/cart")}
             className="btn-primary whitespace-nowrap"
           >
             Gunakan Promo Sekarang
           </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Promo;