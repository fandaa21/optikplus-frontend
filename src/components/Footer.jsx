import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const openMaps = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=Optik+Plus+Langkawi+Pekanbaru", "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Kolom Brand & Subscribe */}
        <div className="footer-col">
          <h3 className="footer-logo">Optik Plus<span>.</span></h3>
          <h4>Newsletter</h4>
          <p>Dapatkan info promo kacamata terbaru langsung di email Anda.</p>
          <div className="subscribe-input-wrapper">
            <input type="email" placeholder="Email Anda" />
            <button className="send-btn">
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Kolom Support */}
        <div className="footer-col">
          <h3>Support</h3>
          <p onClick={openMaps} className="footer-link">
            Jl. Delima, Kec. Tampan,<br /> 
            Pekanbaru, Riau 28291.
          </p>
          <p>optikplus@gmail.com</p>
          <p>+62 812-8355-3361</p>
        </div>

        {/* Kolom Account */}
        <div className="footer-col">
          <h3>Account</h3>
          <ul>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/login">Login / Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/promo">Promo</Link></li>
          </ul>
        </div>

        {/* Kolom Quick Link */}
        <div className="footer-col">
          <h3>Layanan</h3>
          <ul>
            <li><Link to="/katalog">Katalog Produk</Link></li>
            <li><Link to="/testimoni">Testimoni</Link></li>
            <li><Link to="/estimasi">Lensa</Link></li>
          </ul>
        </div>

        {/* Kolom Social Media */}
        <div className="footer-col social-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com/optikpluslangkawi" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://wa.me/6281283553361" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright 2026 Optik Plus Langkawi. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;