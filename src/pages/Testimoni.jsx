import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar, FaQuoteLeft } from "react-icons/fa"; // Pastikan install react-icons

function Testimoni() {
  const reviews = [
    {
      id: 1,
      name: "Ninda",
      role: "Customer",
      rating: 5,
      text: "Ringan dan pas di wajah.Dipakai lama tetap nyaman,nggak bikin kepala sakit!",
      image: "/images/image1.jpeg"
    },
    {
      id: 2,
      name: "Afa",
      role: "Customer",
      rating: 5,
      text: "Selain stylish, kacamata ini juga melindungi mata saat beraktivitas di depan layar.Bahan berkualitas dan tahan lama.",
      image: "/images/image2.jpeg"
    },
    {
      id: 3,
      name: "Roni",
      role: "Customer",
      rating: 4,
      text: "Kacamata ini nyaman banget dipakai seharian di luar ruangan.Mata tidak silau dan tetap terlindungi dari sinar matahari.Desainnya juga keren!",
      image: "/images/image3.jpeg"
    }
  ];

  return (
    <>
      <Navbar />
      <section className="testimoni-page">
        <div className="container">
          <nav className="breadcrumb">
            Home / <span>Testimoni</span>
          </nav>

          <header className="testimoni-header">
            <span className="badge">Wall of Love</span>
            <h1>Apa Kata Mereka?</h1>
            <p className="subtitle">
              Kepuasan pelanggan adalah prioritas utama kami. Berikut adalah pengalaman mereka berbelanja di Optik Plus Langkawi.
            </p>
          </header>

          <div className="review-grid">
            {reviews.map((item) => (
              <div className="review-card" key={item.id}>
                <div className="quote-icon"><FaQuoteLeft /></div>
                
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < item.rating ? "star-active" : "star-empty"} />
                  ))}
                </div>

                <p className="review-text">"{item.text}"</p>

                <div className="user-info">
                  <img src={item.image} alt={item.name} />
                  <div className="user-detail">
                    <h3>{item.name}</h3>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Testimoni;