import { useEffect, useState } from "react";
import { Search, Filter, X, ChevronRight, LayoutGrid, SlidersHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Link, useLocation } from "react-router-dom";

function Katalog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState(initialSearch);
  const [brand, setBrand] = useState("All");

  useEffect(() => {
    // Update search state if URL parameter changes
    const newSearch = new URLSearchParams(location.search).get("search") || "";
    setSearch(newSearch);
  }, [location.search]);

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
    const matchSearch = product.name?.toLowerCase().includes(search.toLowerCase()) || 
                      product.brand?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchBrand && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Katalog</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Explore Our Collection</h1>
            <p className="text-gray-500 font-medium">{filteredProducts.length} Products Found</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative group flex-1 sm:w-64 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search frames or brands..."
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-10 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div className="relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <select 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)}
                className="w-full sm:w-48 bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-10 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option value="All">All Brands</option>
                {brands.filter(b => b !== "All").map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filter */}
          <aside className="lg:w-64 shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold uppercase tracking-wider text-xs">
                <LayoutGrid size={16} className="text-brand" />
                Categories
              </div>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all text-left ${
                      category === cat 
                        ? "bg-brand text-white shadow-lg shadow-brand/20 translate-x-1" 
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat === "All" ? "Semua Koleksi" : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-premium-dark rounded-2xl p-6 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <span className="inline-block px-2 py-0.5 bg-brand rounded text-[10px] font-bold uppercase mb-4 tracking-widest">Featured</span>
                <h4 className="text-xl font-display font-bold mb-2">New Arrival</h4>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">Temukan koleksi bingkai premium terbaru kami yang baru saja tiba.</p>
                <button onClick={() => setCategory("All")} className="text-xs font-bold underline underline-offset-4 hover:text-brand transition-colors">See Collection</button>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand/20 rounded-full blur-2xl group-hover:bg-brand/30 transition-colors"></div>
            </div>
          </aside>

          {/* Main Catalog Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      currentPrice: product.price,
                      image: product.image || "/images/kacamata1.png",
                      discount: product.discount || 0,
                      rating: 5,
                      reviews: 42
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl py-20 px-8 text-center border border-dashed border-gray-300">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Oops! No products found</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Kami tidak dapat menemukan kacamata yang sesuai dengan kriteria pencarian Anda.</p>
                <button 
                  onClick={() => {setCategory("All"); setSearch(""); setBrand("All");}}
                  className="btn-primary"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Katalog;