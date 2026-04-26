import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [editPromoId, setEditPromoId] = useState(null);
  const [showPromoForm, setShowPromoForm] = useState(false);

  const [promoForm, setPromoForm] = useState({
    title: "",
    code: "",
    desc: "",
  });
  const handlePromoChange = (e) => {
    setPromoForm({
      ...promoForm,
      [e.target.name]: e.target.value,
    });
  };
  const handlePromoSubmit = (e) => {
    e.preventDefault();

    let updatedPromos = [];

    if (editPromoId) {
      updatedPromos = promos.map((item) =>
        item.id === editPromoId
          ? {
              ...item,
              title: promoForm.title,
              code: promoForm.code,
              desc: promoForm.desc,
            }
          : item,
      );
    } else {
      const newPromo = {
        id: Date.now(),
        title: promoForm.title,
        code: promoForm.code,
        desc: promoForm.desc,
      };

      updatedPromos = [newPromo, ...promos];
    }

    setPromos(updatedPromos);

    localStorage.setItem("promos", JSON.stringify(updatedPromos));

    setShowPromoForm(false);
    setEditPromoId(null);

    setPromoForm({
      title: "",
      code: "",
      desc: "",
    });
  };
  const handleEditPromo = (item) => {
    setEditPromoId(item.id);

    setPromoForm({
      title: item.title,
      code: item.code,
      desc: item.desc,
    });

    setShowPromoForm(true);
  };
  const handleDeletePromo = (id) => {
    const updatedPromos = promos.filter((item) => item.id !== id);

    setPromos(updatedPromos);

    localStorage.setItem("promos", JSON.stringify(updatedPromos));
  };
  useEffect(() => {
    const savedPromos = localStorage.getItem("promos");

    if (savedPromos) {
      setPromos(JSON.parse(savedPromos));
    } else {
      const defaultPromos = [
        {
          id: 1,
          title: "Flash Sale 30%",
          desc: "Get discount for selected frames",
          code: "OPTIK30",
        },
        {
          id: 2,
          title: "Buy 1 Get Lens Coating",
          desc: "Free blue light coating",
          code: "FREECOAT",
        },
        {
          id: 3,
          title: "Student Promo 15%",
          desc: "Special price for students",
          code: "STUDENT15",
        },
      ];

      setPromos(defaultPromos);

      localStorage.setItem("promos", JSON.stringify(defaultPromos));
    }
  }, []);
  const handleAddPromo = (e) => {
    e.preventDefault();

    const newPromo = {
      id: Date.now(),
      title: promoForm.title,
      code: promoForm.code,
      desc: promoForm.desc,
    };

    const updatedPromos = [newPromo, ...promos];

    setPromos(updatedPromos);

    localStorage.setItem("promos", JSON.stringify(updatedPromos));

    setPromoForm({
      title: "",
      code: "",
      desc: "",
    });

    setShowPromoForm(false);
  };
  const [promos, setPromos] = useState([
    {
      id: 1,
      title: "Flash Sale 30%",
      code: "OPTIK30",
      desc: "Get discount for selected frames",
    },
    {
      id: 2,
      title: "Student Promo 15%",
      code: "STUDENT15",
      desc: "Show student card",
    },
  ]);
  const handleStatusChange = (id, status) => {
    fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(orders.map((item) => (item.id === id ? data : item)));
      });
  };
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  const navigate = useNavigate();

  const [menu, setMenu] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    const login = localStorage.getItem("adminLogin");

    if (!login) {
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (item) => {
    setShowForm(true);
    setEditId(item.id);

    setForm({
      name: item.name,
      brand: item.brand,
      price: item.price,
      category: item.category,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editId
      ? `http://127.0.0.1:8000/api/products/${editId}`
      : "http://127.0.0.1:8000/api/products";

    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editId) {
          setProducts(
            products.map((item) => (item.id === editId ? data : item)),
          );
        } else {
          setProducts([data, ...products]);
        }

        setShowForm(false);
        setEditId(null);

        setForm({
          name: "",
          brand: "",
          price: "",
          category: "",
        });
      });
  };

  const handleDelete = (id) => {
    if (!confirm("Yakin hapus produk?")) return;

    fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((item) => item.id !== id));
    });
  };

  return (
    <section className="admin-page">
      <aside className="admin-sidebar">
        <h2>OPTIK ADMIN</h2>

        <ul>
          <li onClick={() => setMenu("dashboard")}>Dashboard</li>
          <li onClick={() => setMenu("products")}>Produk</li>
          <li onClick={() => setMenu("orders")}>Pesanan</li>
          <li onClick={() => setMenu("promo")}>Promo</li>
          <li
            onClick={() => {
              localStorage.removeItem("adminLogin");
              navigate("/admin-login");
            }}
          >
            Logout
          </li>
        </ul>
      </aside>

      <main className="admin-content">
        {showPromoForm && (
          <div className="admin-modal">
            <form className="admin-form" onSubmit={handlePromoSubmit}>
              <h2>{editPromoId ? "Edit Promo" : "Tambah Promo"}</h2>

              <input
                type="text"
                name="title"
                placeholder="Judul Promo"
                value={promoForm.title}
                onChange={handlePromoChange}
                required
              />

              <input
                type="text"
                name="code"
                placeholder="Kode Voucher"
                value={promoForm.code}
                onChange={handlePromoChange}
                required
              />

              <textarea
                name="desc"
                placeholder="Deskripsi Promo"
                value={promoForm.desc}
                onChange={handlePromoChange}
                required
              />

              <div className="form-actions">
                <button type="submit">Simpan</button>

                <button type="button" onClick={() => setShowPromoForm(false)}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}
        {menu === "dashboard" && (
          <>
            <div className="admin-header">
              <h1>Dashboard</h1>

              <button onClick={() => setShowForm(true)}>+ Tambah Produk</button>
            </div>

            {(() => {
              const totalOrders = orders.length;

              const totalCustomers = new Set(
                orders.map((item) => item.customer_name),
              ).size;

              const totalRevenue = orders.reduce(
                (sum, item) => sum + Number(item.total || 0),
                0,
              );

              const formatRupiah = (number) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(number);

              return (
                <div className="admin-cards">
                  <div className="admin-card">
                    <h3>{products.length}</h3>
                    <p>Total Produk</p>
                  </div>

                  <div className="admin-card">
                    <h3>{totalOrders}</h3>
                    <p>Total Order</p>
                  </div>

                  <div className="admin-card">
                    <h3>{totalCustomers}</h3>
                    <p>Pelanggan</p>
                  </div>

                  <div className="admin-card">
                    <h3>{formatRupiah(totalRevenue)}</h3>
                    <p>Pendapatan</p>
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {menu === "products" && (
          <>
            <div className="admin-header">
              <h1>Manajemen Produk</h1>

              <button onClick={() => setShowForm(true)}>+ Tambah Produk</button>
              {showForm && (
                <div className="admin-modal">
                  <form className="admin-form" onSubmit={handleSubmit}>
                    <h2>{editId ? "Edit Produk" : "Tambah Produk"}</h2>

                    <input
                      type="text"
                      name="name"
                      placeholder="Nama Produk"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="text"
                      name="brand"
                      placeholder="Brand"
                      value={form.brand}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="number"
                      name="price"
                      placeholder="Harga"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="text"
                      name="category"
                      placeholder="Kategori"
                      value={form.category}
                      onChange={handleChange}
                      required
                    />

                    <div className="form-actions">
                      <button type="submit">Simpan</button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditId(null);
                        }}
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="admin-table-box">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Brand</th>
                    <th>Harga</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>Rp {Number(item.price).toLocaleString("id-ID")}</td>
                      <td>{item.category}</td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {menu === "orders" && (
          <>
            <div className="admin-header">
              <h1>Manajemen Pesanan</h1>
            </div>

            <div className="admin-table-box">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Produk</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>

                      <td>{item.customer_name}</td>

                      <td>{item.product_name}</td>

                      <td>Rp {Number(item.total).toLocaleString("id-ID")}</td>

                      <td>
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value)
                          }
                          className="status-select"
                        >
                          <option value="Diproses">Diproses</option>
                          <option value="Dikirim">Dikirim</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Dibatalkan">Dibatalkan</option>
                        </select>
                      </td>

                      <td>
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {menu === "promo" && (
          <>
            <div className="admin-header">
              <h1>Manajemen Promo</h1>

              <button onClick={() => setShowPromoForm(true)}>
                + Tambah Promo
              </button>
            </div>

            <div className="admin-table-box">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Judul</th>
                    <th>Kode</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {promos.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.code}</td>
                      <td>{item.desc}</td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEditPromo(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDeletePromo(item.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </section>
  );
}

export default AdminDashboard;
