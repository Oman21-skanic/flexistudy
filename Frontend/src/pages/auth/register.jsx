import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { useApp } from '../../App';
import { api } from '../../lib/apiClient';

const Register = () => {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tingkatanKelas, setTingkatanKelas] = useState("Siswa SMK");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !namaDepan) return alert("Harap isi semua kolom wajib");
    
    setLoading(true);
    try {
      await api.register({
        name: `${namaDepan} ${namaBelakang}`.trim(),
        email,
        password,
        role: 'student',
        kelas: tingkatanKelas
      });

      alert("Pendaftaran berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      alert("Gagal daftar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ FIX: Hapus div auth-container duplikat
    <div className="auth-container fade-in">
      <div className="panel">
        <div className="panel-label">Register</div>
        <div className="card">
          <div className="step-indicator">
            <div className="step-dot active"></div>
            <div className="step-dot active"></div>
            <div className="step-dot"></div>
          </div>

          <div className="card-title">Buat Akun Baru</div>
          <div className="card-sub">Selesaikan daftar akun mu yuk!</div>
          
          <div className="row2">
            <div className="field">
              <label>Nama Depan</label>
              <input 
                type="text"
                className="finput"
                placeholder="Nama Depan"
                value={namaDepan}
                onChange={(e) => setNamaDepan(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Nama Belakang</label>
              <input 
                type="text" 
                className="finput"  
                placeholder="Nama Belakang"
                value={namaBelakang}
                onChange={(e) => setNamaBelakang(e.target.value)}
              />
            </div>
          </div>
          
          <div className="field">
            <label>Alamat Email</label>
            <input 
              type='email'
              placeholder='Masukan alamat email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='finput'
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
            <div className="strength">
              <div className="strength-bar">
                <div className="sb fill"></div>
                <div className="sb fill"></div>
                <div className="sb fill"></div>
                <div className="sb"></div>
              </div>
              <div className="strength-lbl">Kekuatan: Kuat</div>
            </div>
          </div>
          
          <button type="button" onClick={handleRegister} className="btn-full" disabled={loading}>
            {loading ? "Mendaftar..." : "Daftar Sekarang →"}
          </button>
          
          <div className="switch">
            Sudah punya akun? <Link to="/login"><span>Masuk</span></Link>
          </div>
          
          <div className="terms">
            Dengan mendaftar, kamu menyetujui <span>Syarat Layanan</span> dan <span>Kebijakan Privasi</span> kami.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
