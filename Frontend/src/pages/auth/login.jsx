import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../App';
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, speak } = useApp(); 
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Email dan password wajib diisi");
    
    setLoading(true);
    setError("");

    try {
      const res = await login(email, password);
      if (res.user.role === 'admin') {
        speak(`Selamat datang admin ${res.user.name}`);
        navigate("/admin");
      } else {
        speak(`Selamat datang ${res.user.name}. Mari lanjutkan belajarmu.`);
        navigate("/dashboard");
      }
    } catch (err) {
      speak("Gagal masuk. Periksa kembali email dan kata sandi anda.");
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
          
          <div className="forgot">
            <Link to="/forgot-password" style={{ color: 'inherit', textDecoration: 'none' }}>Lupa password?</Link>
          </div>
          
          <button onClick={handleLogin} className="btn-full" disabled={loading}>
            {loading ? "Memuat..." : "Masuk ke FlexiStudy"}
          </button>

          <div className="switch" onClick={() => speak("Daftar akun baru")}>
            Belum punya akun? <Link to="/register"><span>Daftar gratis</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;