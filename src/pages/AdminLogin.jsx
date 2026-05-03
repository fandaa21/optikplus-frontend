import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      if (email === "admin@optik.com" && password === "admin123") {
        localStorage.setItem("adminLogin", "true");
        navigate("/admin");
      } else {
        setError("Email atau password yang Anda masukkan salah.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand/5 rounded-full blur-3xl"></div>
      </div>

      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 font-bold hover:text-brand transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Site
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-premium-dark p-10 text-center space-y-4">
             <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-brand/40">
                <Lock size={32} className="text-white" />
             </div>
             <div>
                <h1 className="text-2xl font-display font-black text-white tracking-tight">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm font-medium">Masuk untuk mengelola pesanan & produk</p>
             </div>
          </div>

          {/* Form */}
          <form className="p-10 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl font-bold flex items-center gap-3 animate-shake">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@optik.com"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-5 rounded-2xl text-lg font-bold shadow-xl shadow-brand/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign In <ShieldCheck size={22} /></>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-medium">Protected by Enterprise-grade Security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;