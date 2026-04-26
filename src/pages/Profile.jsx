import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="profile-page">
        {/* Dekorasi Background */}
        <div className="bg-blob"></div>

        <div className="container">
          <nav className="breadcrumb">
            Home / <span>Profile</span>
          </nav>

          <header className="profile-hero">
            <div className="profile-text">
              <div className="badge-container">
                <span className="badge">Premium Service</span>
                <span className="badge-outline">Since 2017</span>
              </div>
              <h1>
                Professional Eye Care for Your <span>Vision.</span>
              </h1>
              <p>
                Optik Plus Langkawi hadir sebagai solusi kesehatan mata
                terpercaya di Pekanbaru. Kami menggabungkan teknologi modern
                dengan pelayanan personal untuk memastikan Anda mendapatkan
                kenyamanan visual terbaik.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <b>7+</b> <p>Years Exp</p>
                </div>
                <div className="stat-item">
                  <b>100%</b> <p>Quality</p>
                </div>
              </div>
            </div>
            <div className="profile-image-wrapper">
              <div className="image-card">
                <img src="/images/logo.png" alt="Optik Plus Langkawi" />
              </div>
              <div className="floating-card">
                <span>⭐ 4.9 Rating</span>
              </div>
            </div>
          </header>

          <section className="story-section">
            <div className="story-box">
              <div className="section-title">
                <h2>Our Journey</h2>
                <div className="title-line"></div>
              </div>
              <div className="story-content">
                <p>
                  Didirikan oleh <strong>Fahmi dan Isnani</strong>, Optik Plus
                  Langkawi bermula dari mimpi sederhana: menghadirkan akses
                  kacamata berkualitas tanpa harus menguras kantong.
                </p>
                <p>
                  Berlokasi strategis di <strong>Jl. Delima, Tampan</strong>,
                  kami bangga telah melayani ribuan pelanggan baik secara tatap
                  muka maupun melalui platform digital.
                </p>
              </div>
            </div>
          </section>

          <div className="vision-grid">
            <div className="vision-card glass">
              <div className="card-icon-wrap">👁️</div>
              <h3>Vision</h3>
              <p>
                Menjadi kiblat optik terpercaya dengan standar pelayanan
                internasional di Pekanbaru.
              </p>
            </div>
            <div className="vision-card glass">
              <div className="card-icon-wrap">🎯</div>
              <h3>Mission</h3>
              <p>
                Memberdayakan masyarakat melalui edukasi kesehatan mata dan
                produk inovatif yang terjangkau.
              </p>
            </div>
          </div>

          <section className="why-section">
            <div className="section-title center">
              <h2>Why We Are Different</h2>
              <div className="title-line"></div>
            </div>
            <div className="why-grid">
              <div className="why-card">
                <div className="why-number">01</div>
                <h3>Lensa Lengkap</h3>
                <p>
                  Dari Single Vision hingga Progressive dengan proteksi radiasi
                  tinggi.
                </p>
              </div>
              <div className="why-card">
                <div className="why-number">02</div>
                <h3>Fitur Modern</h3>
                <p>
                  Teknologi Photochromic dan Blue Light Filter terbaru untuk
                  mata digital.
                </p>
              </div>
              <div className="why-card">
                <div className="why-number">03</div>
                <h3>Omni-Channel</h3>
                <p>
                  Konsultasi mudah via WhatsApp atau kunjungan langsung ke gerai
                  kami.
                </p>
              </div>
            </div>
          </section>

          <section className="visit-section">
            <div className="visit-cta">
              <div className="visit-info">
                <h2>Ready to improve your vision?</h2>
                <p>
                  Kunjungi toko kami atau hubungi kami untuk konsultasi gratis.
                </p>
                <div className="contact-pills">
                  <span
                    className="location-pill"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/place/?q=place_id:ChIJn02x0-Wo1TERYlGv7fnzyyc",
                        "_blank",
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    📍 Pekanbaru, Riau
                  </span>
                  <span>📱 0812 8355 3361</span>
                </div>
              </div>
              <button
                className="profile-btn-primary"
                onClick={() => navigate("/katalog")}
              >
                See Catalog <i className="arrow-icon">→</i>
              </button>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
