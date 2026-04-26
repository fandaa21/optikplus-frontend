
function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-container">
        {/* Konten Tengah */}
        <div className="topbar-message">
          <span>Optik Plus Langkawi - </span>
          <a href="/shop" className="shop-now">ShopNow</a>
        </div>

        {/* Konten Kanan */}
        <div className="topbar-language">
          <select className="lang-select">
            <option value="en">English</option>
            <option value="id">Indonesia</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TopBar