import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt, FaClock, FaCopy, FaCheck } from "react-icons/fa";
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
      { title: "Flash Sale 30%", desc: "Diskon frame pilihan khusus hari ini.", code: "OPTIK30", color: "#DB4444" },
      { title: "Buy 1 Get Coating", desc: "Gratis lapisan anti radiasi blue light.", code: "FREECOAT", color: "#4444DB" },
      { title: "Student Promo", desc: "Harga spesial pelajar & mahasiswa.", code: "STUDENT15", color: "#22C55E" },
    ];
    setPromos(setDefaultPromos);
  }, []);

  return (
    <>
      <Navbar />
      <section className="promo-page">
        <div className="container">
          <div className="breadcrumb">Home / <span>Promo</span></div>
          
          <header className="promo-header">
            <span className="promo-badge">Special Offers</span>
            <h1>Exclusive Rewards & Discounts</h1>
            
            <div className="modern-timer">
              <FaClock className="timer-icon" />
              <span>Ends In:</span>
              <div className="timer-boxes">
                <div className="t-box">{format(time.hours)}</div> :
                <div className="t-box">{format(time.minutes)}</div> :
                <div className="t-box">{format(time.seconds)}</div>
              </div>
            </div>
          </header>

          <div className="promo-grid">
            {promos.map((item, index) => (
              <div className="coupon-card" key={index} style={{"--accent": item.color}}>
                <div className="coupon-left">
                  <FaTicketAlt className="ticket-icon" />
                </div>
                <div className="coupon-main">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  
                  <div className="copy-wrapper" onClick={() => copyToClipboard(item.code)}>
                    <div className="promo-code-box">
                      <span>{item.code}</span>
                      {copiedCode === item.code ? <FaCheck className="c-icon" /> : <FaCopy className="c-icon" />}
                    </div>
                    <small>{copiedCode === item.code ? "Copied!" : "Click to copy"}</small>
                  </div>

                  <button className="promo-btn" onClick={() => navigate("/katalog")}>
                    Use Now
                  </button>
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

export default Promo;