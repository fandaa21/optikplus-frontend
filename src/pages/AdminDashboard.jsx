import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Ticket, 
  LogOut, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Filter,
  Phone,
  Mail,
  Banknote
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [promos, setPromos] = useState([]);
  
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", brand: "", price: "", category: "" });

  const [showPromoForm, setShowPromoForm] = useState(false);
  const [editPromoId, setEditPromoId] = useState(null);
  const [promoForm, setPromoForm] = useState({ title: "", code: "", desc: "" });

  // Auth Guard
  useEffect(() => {
    if (!localStorage.getItem("adminLogin")) navigate("/admin-login");
  }, [navigate]);

  // Data Fetching
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products").then(res => res.json()).then(data => setProducts(data));
    fetch("http://127.0.0.1:8000/api/orders").then(res => res.json()).then(data => setOrders(data));
    
    const savedPromos = localStorage.getItem("promos");
    if (savedPromos) setPromos(JSON.parse(savedPromos));
  }, []);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  const [searchTerm, setSearchTerm] = useState("");

  // Product Handlers
  const handleEditProduct = (p) => {
    setEditId(p.id);
    setForm({ 
      name: p.name, 
      brand: p.brand, 
      price: p.price, 
      category: p.category,
      image: p.image || "" 
    });
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    fetch(`http://127.0.0.1:8000/api/products/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          setProducts(products.filter(p => p.id !== id));
        } else {
          alert("Gagal menghapus produk. Pastikan server backend berjalan.");
        }
      })
      .catch(err => alert("Terjadi kesalahan koneksi ke server."));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const url = editId ? `http://127.0.0.1:8000/api/products/${editId}` : "http://127.0.0.1:8000/api/products";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        if (editId) setProducts(products.map(p => p.id === editId ? data : p));
        else setProducts([data, ...products]);
        setShowForm(false);
        setEditId(null);
        setForm({ name: "", brand: "", price: "", category: "", image: "" });
      } else {
        alert("Gagal menyimpan produk. Cek kembali data Anda.");
      }
    })
    .catch(err => alert("Gagal terhubung ke API Backend."));
  };

  // Promo Handlers
  const handleEditPromo = (pr) => {
    setEditPromoId(pr.id);
    setPromoForm({ title: pr.title, code: pr.code, desc: pr.desc });
    setShowPromoForm(true);
  };

  const handleDeletePromo = (id) => {
    if (!confirm("Yakin ingin menghapus promo ini?")) return;
    const updated = promos.filter(p => p.id !== id);
    setPromos(updated);
    localStorage.setItem("promos", JSON.stringify(updated));
  };

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    let updated = [];
    if (editPromoId) {
      updated = promos.map(p => p.id === editPromoId ? { ...p, ...promoForm } : p);
    } else {
      updated = [{ ...promoForm, id: Date.now() }, ...promos];
    }
    setPromos(updated);
    localStorage.setItem("promos", JSON.stringify(updated));
    setShowPromoForm(false);
    setEditPromoId(null);
    setPromoForm({ title: "", code: "", desc: "" });
  };

  const handleStatusChange = (id, status) => {
    fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    .then(res => res.json())
    .then(data => {
      setOrders(orders.map(o => o.id === id ? data : o));
    })
    .catch(err => alert("Gagal mengubah status pesanan."));
  };

  const logout = () => {
    localStorage.removeItem("adminLogin");
    navigate("/admin-login");
  };

  const stats = [
    { label: "Total Revenue", value: formatRupiah(orders.reduce((sum, o) => sum + Number(o.total || 0), 0)), icon: <TrendingUp size={24} />, color: "bg-emerald-50 text-emerald-600" },
    { label: "Active Orders", value: orders.length, icon: <ShoppingCart size={24} />, color: "bg-blue-50 text-blue-600" },
    { label: "Total Products", value: products.length, icon: <Package size={24} />, color: "bg-amber-50 text-amber-600" },
    { label: "Customers", value: new Set(orders.map(o => o.customer_name)).size, icon: <Users size={24} />, color: "bg-purple-50 text-purple-600" },
  ];

  const sidebarItems = [
    { id: "dashboard", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "products", label: "Inventory", icon: <Package size={20} /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart size={20} /> },
    { id: "finance", label: "Finance", icon: <Banknote size={20} /> },
    { id: "promo", label: "Marketing", icon: <Ticket size={20} /> },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-premium-dark text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8">
           <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center font-black text-xl italic shadow-lg shadow-brand/20">O</div>
              <span className="font-display font-black text-xl tracking-tighter">OPTIK<span className="text-brand">ADMIN</span></span>
           </div>
           
           <nav className="space-y-1">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setMenu(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                    menu === item.id ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
           </nav>
        </div>
        
        <div className="mt-auto p-8">
           <button 
             onClick={logout}
             className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition-all"
           >
             <LogOut size={20} />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
           <div>
              <h1 className="text-3xl font-display font-black tracking-tight text-gray-900 capitalize">{menu}</h1>
              <p className="text-gray-500 text-sm font-medium">Welcome back, Administrator.</p>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                   type="text" 
                   placeholder="Search products..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="bg-white border border-gray-100 rounded-2xl py-2.5 pl-12 pr-4 w-64 outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm font-medium"
                 />
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-all">
                 <Filter size={20} />
              </div>
           </div>
        </header>

        {/* Dashboard Content */}
        {menu === "dashboard" && (
          <div className="space-y-10">
             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                     <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                        {stat.icon}
                     </div>
                     <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-display font-black text-gray-900">{stat.value}</h3>
                     </div>
                  </div>
                ))}
             </div>

             {/* Recent Activity / Tables */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                   <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                      <h4 className="font-bold text-gray-900">Recent Orders</h4>
                      <button className="text-brand text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                            <tr>
                               <th className="px-8 py-4">Customer</th>
                               <th className="px-8 py-4">Status</th>
                               <th className="px-8 py-4">Amount</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-50">
                            {orders.slice(0, 5).map(o => (
                              <tr key={o.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                                 <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-xs">{o.customer_name[0]}</div>
                                       <div>
                                          <p className="text-sm font-bold text-gray-900">{o.customer_name}</p>
                                          <p className="text-[10px] text-gray-400">{new Date(o.created_at).toLocaleDateString()}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                      o.status === "Selesai" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                                    }`}>
                                       {o.status}
                                    </span>
                                 </td>
                                 <td className="px-8 py-5 text-sm font-bold text-gray-900">{formatRupiah(o.total)}</td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
                
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                   <h4 className="font-bold text-gray-900 mb-6">Top Products</h4>
                   <div className="space-y-6">
                      {products.slice(0, 4).map(p => (
                        <div key={p.id} className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-gray-50 rounded-xl p-2 shrink-0">
                              <img src={p.image} className="w-full h-full object-contain" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">{p.name}</p>
                              <p className="text-xs text-gray-400 font-medium">{p.brand}</p>
                           </div>
                           <p className="text-sm font-bold text-brand">{formatRupiah(p.price)}</p>
                        </div>
                      ))}
                   </div>
                   <button 
                     onClick={() => setMenu("products")}
                     className="w-full mt-10 py-4 bg-gray-50 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                    >
                      Management <ChevronRight size={14} />
                    </button>
                </div>
             </div>
          </div>
        )}

        {/* Other Menus (Simplified for demonstration, but full implementation logic remains) */}
        {(menu === "products" || menu === "orders" || menu === "promo") && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h4 className="font-bold text-gray-900">Manage {menu}</h4>
                {menu !== "orders" && (
                  <button 
                    onClick={() => menu === "products" ? setShowForm(true) : setShowPromoForm(true)}
                    className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 text-xs"
                  >
                    <Plus size={16} /> Add New
                  </button>
                )}
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                      <tr>
                         {menu === "products" ? (
                           <>
                             <th className="px-8 py-5">Product Info</th>
                             <th className="px-8 py-5">Price</th>
                             <th className="px-8 py-5">Category</th>
                             <th className="px-8 py-5">Actions</th>
                           </>
                         ) : menu === "orders" ? (
                           <>
                             <th className="px-8 py-5">Customer Info</th>
                             <th className="px-8 py-5">Contact Details</th>
                             <th className="px-8 py-5">Shipping Address</th>
                             <th className="px-8 py-5">Status</th>
                             <th className="px-8 py-5">Total</th>
                           </>
                         ) : (
                           <>
                             <th className="px-8 py-5">Promo Details</th>
                             <th className="px-8 py-5">Code</th>
                             <th className="px-8 py-5">Actions</th>
                           </>
                         )}
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {menu === "products" && filteredProducts.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50/50">
                           <td className="px-8 py-5 flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-50 rounded-lg p-2"><img src={p.image} className="w-full h-full object-contain" /></div>
                              <div><p className="text-sm font-bold">{p.name}</p><p className="text-[10px] text-gray-400">{p.brand}</p></div>
                           </td>
                           <td className="px-8 py-5 text-sm font-bold text-brand">{formatRupiah(p.price)}</td>
                           <td className="px-8 py-5"><span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-500">{p.category}</span></td>
                           <td className="px-8 py-5 text-gray-400">
                             <div className="flex gap-3">
                               <button onClick={() => handleEditProduct(p)} className="hover:text-brand transition-colors"><Edit size={18} /></button>
                               <button onClick={() => handleDeleteProduct(p.id)} className="hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                             </div>
                           </td>
                        </tr>
                      ))}
                      {menu === "orders" && orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50/50">
                           <td className="px-8 py-5">
                              <p className="text-sm font-bold">{o.customer_name}</p>
                              <p className="text-[10px] text-gray-400 font-medium">#ORD-{o.id} • {new Date(o.created_at).toLocaleDateString()}</p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                 {o.product_name.split(",").map((p, i) => (
                                   <span key={i} className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{p.trim()}</span>
                                 ))}
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><Phone size={12} className="text-gray-400" /> {o.phone}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1"><Mail size={12} className="text-gray-400" /> {o.email}</p>
                           </td>
                           <td className="px-8 py-5">
                              <p className="text-xs text-gray-600 max-w-[200px] line-clamp-2 italic font-medium">"{o.address}"</p>
                           </td>
                           <td className="px-8 py-5">
                              <select 
                                value={o.status} 
                                onChange={(e) => handleStatusChange(o.id, e.target.value)}
                                className={`bg-gray-50 border-none rounded-lg text-[10px] font-bold uppercase py-1 px-3 outline-none cursor-pointer hover:bg-gray-100 transition-all ${
                                  o.status === "Selesai" ? "text-green-600" : o.status === "Dibatalkan" ? "text-red-600" : "text-blue-600"
                                }`}
                              >
                                 <option value="Diproses">Diproses</option>
                                 <option value="Dikirim">Dikirim</option>
                                 <option value="Selesai">Selesai</option>
                                 <option value="Dibatalkan">Dibatalkan</option>
                              </select>
                           </td>
                           <td className="px-8 py-5 text-sm font-black text-gray-900">{formatRupiah(o.total)}</td>
                        </tr>
                      ))}
                      {menu === "promo" && promos.map(pr => (
                        <tr key={pr.id} className="hover:bg-gray-50/50">
                           <td className="px-8 py-5"><p className="text-sm font-bold">{pr.title}</p><p className="text-xs text-gray-400">{pr.desc}</p></td>
                           <td className="px-8 py-5"><span className="px-3 py-1 bg-brand/5 border border-brand/10 rounded-lg text-xs font-mono font-bold text-brand">{pr.code}</span></td>
                           <td className="px-8 py-5 text-gray-400">
                             <div className="flex gap-3">
                               <button onClick={() => handleEditPromo(pr)} className="hover:text-brand transition-colors"><Edit size={18} /></button>
                               <button onClick={() => handleDeletePromo(pr.id)} className="hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                             </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {menu === "finance" && (
          <div className="space-y-10">
             {/* Finance Summary */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                   <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Pendapatan</p>
                   <h2 className="text-3xl font-display font-black text-gray-900">{formatRupiah(orders.reduce((sum, o) => sum + Number(o.total || 0), 0))}</h2>
                   <div className="mt-4 flex items-center gap-2 text-emerald-500 text-xs font-bold">
                      <TrendingUp size={14} /> +12% from last month
                   </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                   <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Transaksi</p>
                   <h2 className="text-3xl font-display font-black text-gray-900">{orders.length}</h2>
                   <p className="text-gray-400 text-xs mt-4">Semua pesanan yang masuk</p>
                </div>
                <div className="bg-premium-dark p-8 rounded-[2.5rem] shadow-xl shadow-gray-200">
                   <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Rata-rata Pesanan</p>
                   <h2 className="text-3xl font-display font-black text-white">
                      {formatRupiah(orders.length > 0 ? (orders.reduce((sum, o) => sum + Number(o.total || 0), 0) / orders.length) : 0)}
                   </h2>
                   <p className="text-gray-500 text-xs mt-4">Per nilai transaksi</p>
                </div>
             </div>

             {/* Transaction Log */}
             <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50">
                   <h4 className="font-bold text-gray-900">Riwayat Transaksi Keuangan</h4>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                         <tr>
                            <th className="px-8 py-5">Tanggal</th>
                            <th className="px-8 py-5">Deskripsi Pesanan</th>
                            <th className="px-8 py-5">Metode</th>
                            <th className="px-8 py-5 text-right">Jumlah (IDR)</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {[...orders].reverse().map(o => (
                           <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-5 text-sm text-gray-500 font-medium">{new Date(o.created_at).toLocaleDateString("id-ID", { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                              <td className="px-8 py-5">
                                 <p className="text-sm font-bold text-gray-900">Pembelian oleh {o.customer_name}</p>
                                 <p className="text-[10px] text-gray-400">Order ID #ORD-{o.id}</p>
                              </td>
                              <td className="px-8 py-5">
                                 <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest">Bank Transfer</span>
                              </td>
                              <td className="px-8 py-5 text-right font-black text-gray-900">{formatRupiah(o.total)}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-fade-in border border-gray-100">
              <h2 className="text-2xl font-display font-black mb-8">{editId ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={handleProductSubmit} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                    <input type="text" placeholder="e.g. RayBan Aviator" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/20 font-medium" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Brand</label>
                       <input type="text" placeholder="e.g. RayBan" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/20 font-medium" value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price (IDR)</label>
                       <input type="number" placeholder="0" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/20 font-medium" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                    <input type="text" placeholder="e.g. Sunglasses" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/20 font-medium" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                    <input type="text" placeholder="https://..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/20 font-medium" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
                 </div>
                 <div className="flex gap-4 pt-6">
                    <button type="submit" className="flex-1 btn-primary py-4 rounded-2xl font-bold shadow-xl shadow-brand/20">Save Product</button>
                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm({ name: "", brand: "", price: "", category: "", image: "" }); }} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {showPromoForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-fade-in border border-gray-100">
              <h2 className="text-2xl font-display font-black mb-8">{editPromoId ? "Edit Promo" : "Add New Promo"}</h2>
              <form onSubmit={handlePromoSubmit} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Promo Title</label>
                    <input type="text" placeholder="e.g. Flash Sale" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/20 font-medium" value={promoForm.title} onChange={(e) => setPromoForm({...promoForm, title: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Voucher Code</label>
                    <input type="text" placeholder="e.g. PROMO30" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/20 font-mono font-bold uppercase tracking-widest" value={promoForm.code} onChange={(e) => setPromoForm({...promoForm, code: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea placeholder="Promo details..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand/20 font-medium h-32 resize-none" value={promoForm.desc} onChange={(e) => setPromoForm({...promoForm, desc: e.target.value})} required />
                 </div>
                 <div className="flex gap-4 pt-6">
                    <button type="submit" className="flex-1 btn-primary py-4 rounded-2xl font-bold shadow-xl shadow-brand/20">Save Promo</button>
                    <button type="button" onClick={() => { setShowPromoForm(false); setEditPromoId(null); setPromoForm({ title: "", code: "", desc: "" }); }} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
