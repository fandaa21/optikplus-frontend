import { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa"; // Pastikan install react-icons
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Katalog() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const brands = ["All", ...new Set(products.map((item) => item.brand))];
  const categories = ["All", "Pria", "Wanita", "Anak", "Unisex"];

  const filteredProducts = products.filter((product) => {
    const matchCategory = category === "All" || product.category === category;
    const matchBrand = brand === "All" || product.brand === brand;
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchBrand && matchSearch;
  });

  return (
    <>
      <Navbar />
      <section className="catalog-page">
        <div className="container">
          <header className="catalog-header">
            <div className="title-section">
              <h1>Explore Our Collection</h1>
              <p>{filteredProducts.length} Products Found</p>
            </div>

            <div className="catalog-controls">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search frames or brands..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && <FaTimes className="clear-icon" onClick={() => setSearch("")} />}
              </div>

              <div className="select-wrapper">
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                  <option value="All">All Brands</option>
                  {brands.filter(b => b !== "All").map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </header>

          <div className="katalog-layout">
            <aside className="filter-sidebar">
              <div className="sidebar-group">
                <h3><FaFilter className="icon" /> Categories</h3>
                <div className="filter-buttons">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={category === cat ? "active" : ""}
                      onClick={() => setCategory(cat)}
                    >
                      {cat === "All" ? "Semua Koleksi" : cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="promo-banner-sidebar">
                <h4>New Arrival</h4>
                <p>Check out our latest premium frames.</p>
              </div>
            </aside>

            <main className="catalog-main">
              {filteredProducts.length > 0 ? (
                <div className="catalog-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        ...product,
                        currentPrice: product.price,
                        image: product.image || "/images/kacamata1.png"
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-catalog">
                  <img src="/images/not-found.svg" alt="Not Found" />
                  <p>Oops! No products match your criteria.</p>
                  <button onClick={() => {setCategory("All"); setSearch(""); setBrand("All");}}>Reset Filter</button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Katalog;