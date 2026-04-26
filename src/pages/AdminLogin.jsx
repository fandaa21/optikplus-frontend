import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@optik.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("adminLogin", "true");
      navigate("/admin");
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    <section className="admin-login-page">

      <form
        className="admin-login-form"
        onSubmit={handleLogin}
      >
        <h1>Admin Login</h1>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

      </form>

    </section>
  );
}

export default AdminLogin;