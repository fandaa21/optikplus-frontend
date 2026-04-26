import hero from "../assets/banner.png";
import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Kacamata",
      path: "/katalog",
    },
    {
      name: "Lensa",
      path: "/estimasi",
    },
    {
      name: "Promo",
      path: "/promo",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <section className="hero-section">

      <div className="sidebar">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() =>
                handleMenuClick(item.path)
              }
              style={{
                cursor: "pointer",
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="hero-banner"
        onClick={() => navigate("/promo")}
        style={{ cursor: "pointer" }}
      >
        <img
          src={hero}
          alt="banner"
        />
      </div>

    </section>
  );
}

export default HeroBanner;