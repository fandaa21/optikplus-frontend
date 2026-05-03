import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowRight, Glasses, Sparkles, MapPin, Phone } from "lucide-react";
import hero from "../assets/banner.png";

function HeroBanner() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Katalog Kacamata", path: "/katalog", icon: <Glasses size={18} /> },
    { name: "Lensa Spesialis", path: "/estimasi", icon: <Sparkles size={18} /> },
    { name: "Promo & Voucher", path: "/promo", icon: <Sparkles size={18} /> },
    { name: "Lokasi Toko", path: "/profile", icon: <MapPin size={18} /> },
    { name: "Hubungi Kami", path: "https://wa.me/6281283553361", icon: <Phone size={18} /> },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Menu - Cleaner & Simplified */}
        <aside className="hidden lg:block w-72 border-r border-gray-100 pr-10 pt-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Navigation</h3>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li 
                key={index}
                className="group flex items-center justify-between p-3 rounded-xl cursor-pointer text-[15px] font-semibold text-gray-700 hover:bg-brand hover:text-white transition-all duration-300"
                onClick={() => item.path.startsWith('http') ? window.open(item.path, '_blank') : navigate(item.path)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-brand group-hover:text-white transition-colors">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </li>
            ))}
          </ul>
        </aside>

        {/* Hero Area */}
        <div 
          className="relative flex-1 rounded-[2.5rem] overflow-hidden group cursor-pointer aspect-[21/9] sm:aspect-[2.5/1] shadow-2xl shadow-gray-200"
          onClick={() => navigate("/katalog")}
        >
          {/* Background Image with Overlay */}
          <img 
            src={hero} 
            alt="Hero Banner" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-10 md:px-20 text-white">
            <div className="max-w-xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand rounded-full text-[10px] font-bold uppercase tracking-widest">
                <Sparkles size={12} className="animate-pulse" />
                Featured Collection
              </div>
              
              <h2 className="text-4xl md:text-6xl font-display font-black leading-[1.1] tracking-tighter">
                Kejelasan Visi dalam <span className="text-brand">Gaya.</span>
              </h2>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-sm">
                Temukan koleksi kacamata premium yang dirancang untuk kenyamanan dan estetika modern Anda.
              </p>
              
              <div className="pt-4">
                <button 
                  className="btn-primary py-4 px-10 rounded-2xl flex items-center gap-3 text-lg font-bold shadow-xl shadow-brand/30 group/btn transition-all active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/katalog");
                  }}
                >
                  Lihat Katalog
                  <ArrowRight size={22} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white">
             <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                <Glasses size={20} />
             </div>
             <div>
                <p className="text-xs font-bold text-gray-300">Available Now</p>
                <p className="text-sm font-black italic tracking-tighter">100+ PREMIUM FRAMES</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;