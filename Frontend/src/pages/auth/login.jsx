import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../App';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useApp(); 
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Email dan password wajib diisi");
    
    setLoading(true);
    setError("");

    try {
      const res = await login(email, password);
      if (res.user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Gagal Login: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="panel">
        <div className="panel-label">Login</div>
        <div className="card">
          <div className="card-illo">🎓</div>
          <div className="card-title">Selamat Datang!</div>
          <div className="card-sub">Masuk untuk melanjutkan perjalanan belajarmu</div>
          
          <div className="field">
            <label>Alamat Email</label>
            <input
              type="email"
              className="finput"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="field">
            <label>Password</label>
            <input 
              type="password" 
              className="finput" 
              placeholder="Masukan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="forgot">Lupa password?</div>
          
          <button onClick={handleLogin} className="btn-full" disabled={loading}>
            {loading ? "Memuat..." : "Masuk ke FlexiStudy"}
          </button>

          <div className="switch">
            Belum punya akun? <Link to="/register"><span>Daftar gratis</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;