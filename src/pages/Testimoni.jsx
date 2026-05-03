import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star, Quote, ChevronRight, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Testimoni() {
  const navigate = useNavigate();
  const reviews = [
    {
      id: 1,
      name: "Ninda",
      role: "Customer",
      rating: 5,
      text: "Ringan dan pas di wajah. Dipakai lama tetap nyaman, nggak bikin kepala sakit! Pelayanan di Optik Plus juga sangat ramah.",
      image: "/images/image1.jpeg"
    },
    {
      id: 2,
      name: "Afa",
      role: "Customer",
      rating: 5,
      text: "Selain stylish, kacamata ini juga melindungi mata saat beraktivitas di depan layar. Bahan berkualitas dan tahan lama. Recommended banget!",
      image: "/images/image2.jpeg"
    },
    {
      id: 3,
      name: "Roni",
      role: "Customer",
      rating: 5,
      text: "Kacamata ini nyaman banget dipakai seharian di luar ruangan. Mata tidak silau dan tetap terlindungi dari sinar matahari. Desainnya juga keren!",
      image: "/images/image3.jpeg"
    },
    {
      id: 4,
      name: "Siska",
      role: "Customer",
      rating: 5,
      text: "Proses pengerjaan lensanya cepat sekali. Frame-nya banyak pilihan yang trendy. Sudah jadi langganan tetap di sini.",
      image: "/images/image1.jpeg"
    },
    {
      id: 5,
      name: "Budi",
      role: "Customer",
      rating: 4,
      text: "Harga sangat bersahabat dengan kualitas yang juara. Lensa anti radiasinya benar-benar membantu saat kerja di depan laptop.",
      image: "/images/image2.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Testimoni</span>
        </nav>

        {/* Header Section */}
        <header className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 text-brand rounded-full text-xs font-bold uppercase tracking-widest">
            <Heart size={14} className="fill-current" />
            Wall of Love
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-gray-900 leading-tight">
            Apa Kata <span className="text-brand">Mereka?</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Kepuasan pelanggan adalah prioritas utama kami. Berikut adalah pengalaman tulus mereka setelah mempercayakan kesehatan mata kepada Optik Plus Langkawi.
          </p>
        </header>

        {/* Testimonials Grid (Masonry-like with columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.map((item) => (
            <div 
              key={item.id} 
              className="break-inside-avoid bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-gray-50 rounded-2xl text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                  <Quote size={24} className="fill-current" />
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 italic">
                "{item.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center p-12 bg-premium-dark rounded-3xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl"></div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 relative z-10">Ingin Merasakan Kenyamanan yang Sama?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto relative z-10">Temukan bingkai impian Anda hari ini dan jadilah bagian dari pelanggan puas kami.</p>
          <button 
            onClick={() => navigate("/katalog")}
            className="btn-primary relative z-10"
          >
            Lihat Koleksi Kacamata
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Testimoni;