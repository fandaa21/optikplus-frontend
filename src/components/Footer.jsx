import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const openMaps = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=Optik+Plus+Langkawi+Pekanbaru", "_blank");
  };

  return (
    <footer className="bg-premium-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Newsletter */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold tracking-tighter">
            OPTIK<span className="text-brand">PLUS</span>
          </h2>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-gray-400 text-sm">Dapatkan info promo kacamata terbaru langsung di email Anda.</p>
            <div className="flex bg-white/10 rounded-lg overflow-hidden border border-white/20 focus-within:border-brand transition-colors">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-transparent border-none focus:ring-0 text-sm px-4 py-3 flex-1 text-white placeholder:text-gray-500"
              />
              <button className="bg-brand px-4 text-white hover:bg-brand-hover transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">Hubungi Kami</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3 cursor-pointer hover:text-white transition-colors" onClick={openMaps}>
              <MapPin size={20} className="text-brand shrink-0" />
              <span>Jl. Delima, Kec. Tampan,<br />Pekanbaru, Riau 28291.</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-brand shrink-0" />
              <span>optikplus@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-brand shrink-0" />
              <span>+62 812-8355-3361</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">Tautan Cepat</h4>
          <ul className="grid grid-cols-1 gap-3 text-gray-400 text-sm">
            <li><Link to="/katalog" className="hover:text-white transition-colors">Katalog Produk</Link></li>
            <li><Link to="/testimoni" className="hover:text-white transition-colors">Testimoni</Link></li>
            <li><Link to="/estimasi" className="hover:text-white transition-colors">Lensa & Estimasi</Link></li>
            <li><Link to="/promo" className="hover:text-white transition-colors">Promo Spesial</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors">Akun Saya</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">Ikuti Kami</h4>
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF size={20} />, url: "https://facebook.com" },
              { icon: <FaInstagram size={20} />, url: "https://instagram.com/optikpluslangkawi" },
              { icon: <FaWhatsapp size={20} />, url: "https://wa.me/6281283553361" },
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:scale-110 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic mt-8">
            Optik Terpercaya di Pekanbaru sejak 2010.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">© 2026 Optik Plus Langkawi. All rights reserved.</p>
        <div className="flex gap-6 text-gray-500 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;