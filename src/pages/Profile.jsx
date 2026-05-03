import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight, Award, Clock, Star, Eye, Target, Sparkles, MapPin, Phone, ArrowRight } from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gray-50 overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
           <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand/5 rounded-full blur-3xl"></div>
           
           <div className="section-container relative z-10">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
                <Link to="/" className="hover:text-brand transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-gray-900 font-medium">Profile</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                      <Award size={12} /> Premium Service
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Since 2017
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-display font-extrabold text-gray-900 leading-tight tracking-tight">
                    Professional Eye Care for Your <span className="text-brand">Vision.</span>
                  </h1>
                  
                  <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                    Optik Plus Langkawi hadir sebagai solusi kesehatan mata terpercaya di Pekanbaru. Kami menggabungkan teknologi modern dengan pelayanan personal untuk memastikan Anda mendapatkan kenyamanan visual terbaik.
                  </p>
                  
                  <div className="flex gap-12 pt-4">
                    <div>
                      <p className="text-4xl font-display font-extrabold text-gray-900">7+</p>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Years Exp</p>
                    </div>
                    <div>
                      <p className="text-4xl font-display font-extrabold text-gray-900">100%</p>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Quality</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-[4/5] bg-white rounded-3xl shadow-2xl p-4 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-gray-100">
                    <img src="/images/logo.png" alt="Optik Plus Langkawi" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 animate-bounce-slow">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                      <Star size={24} className="fill-current" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">4.9 Rating</p>
                      <p className="text-xs text-gray-500 font-medium">Customer Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* Journey Section */}
        <section className="py-24 section-container">
           <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-block p-4 bg-brand/10 rounded-2xl text-brand mb-4">
                 <Sparkles size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Our Journey</h2>
              <div className="w-20 h-1 bg-brand mx-auto rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-lg italic">
                "Didirikan oleh <span className="text-gray-900 font-bold">Fahmi dan Isnani</span>, Optik Plus Langkawi bermula dari mimpi sederhana: menghadirkan akses kacamata berkualitas tanpa harus menguras kantong."
              </p>
              <p className="text-gray-600 leading-relaxed">
                Berlokasi strategis di <strong>Jl. Delima, Tampan</strong>, kami bangga telah melayani ribuan pelanggan baik secara tatap muka maupun melalui platform digital. Setiap pasang kacamata yang kami buat adalah komitmen kami terhadap kualitas.
              </p>
           </div>
        </section>

        {/* Vision Mission */}
        <section className="py-24 bg-gray-50">
           <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                 <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-brand mb-8 group-hover:bg-brand group-hover:text-white transition-all">
                    <Eye size={32} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">Vision</h3>
                 <p className="text-gray-500 leading-relaxed">Menjadi kiblat optik terpercaya dengan standar pelayanan internasional di Pekanbaru, memberikan kejelasan pandangan bagi setiap individu.</p>
              </div>
              <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                 <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-brand mb-8 group-hover:bg-brand group-hover:text-white transition-all">
                    <Target size={32} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">Mission</h3>
                 <p className="text-gray-500 leading-relaxed">Memberdayakan masyarakat melalui edukasi kesehatan mata yang mendalam dan menyediakan produk inovatif yang tetap terjangkau oleh semua kalangan.</p>
              </div>
           </div>
        </section>

        {/* Features */}
        <section className="py-24 section-container">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Why We Are Different</h2>
              <div className="w-20 h-1 bg-brand mx-auto rounded-full"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { num: "01", title: "Lensa Lengkap", desc: "Dari Single Vision hingga Progressive dengan proteksi radiasi tinggi." },
                { num: "02", title: "Fitur Modern", desc: "Teknologi Photochromic dan Blue Light Filter terbaru untuk mata digital." },
                { num: "03", title: "Omni-Channel", desc: "Konsultasi mudah via WhatsApp atau kunjungan langsung ke gerai kami." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4">
                   <span className="text-6xl font-display font-black text-gray-100">{item.num}</span>
                   <h4 className="text-xl font-bold">{item.title}</h4>
                   <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 section-container mb-24">
           <div className="bg-premium-dark rounded-3xl p-12 md:p-20 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-all"></div>
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                 <div className="max-w-xl space-y-6 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">Ready to improve your vision?</h2>
                    <p className="text-gray-400 text-lg">Kunjungi toko kami atau hubungi kami untuk konsultasi gratis dengan tenaga ahli kami.</p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                       <div 
                         className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white/20 transition-all"
                         onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Optik+Plus+Langkawi+Pekanbaru", "_blank")}
                       >
                          <MapPin size={16} className="text-brand" />
                          <span>Pekanbaru, Riau</span>
                       </div>
                       <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                          <Phone size={16} className="text-brand" />
                          <span>0812 8355 3361</span>
                       </div>
                    </div>
                 </div>
                 <button 
                   onClick={() => navigate("/katalog")}
                   className="btn-primary py-5 px-10 rounded-2xl flex items-center gap-3 text-lg font-bold shadow-2xl shadow-brand/40 group/btn active:scale-95 transition-all whitespace-nowrap"
                 >
                    See Catalog
                    <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
