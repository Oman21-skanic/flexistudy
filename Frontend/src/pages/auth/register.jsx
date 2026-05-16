import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { useApp } from '../../App';
import { api } from '../../lib/apiClient';

const Register = () => {
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [tingkatanKelas, setTingkatanKelas] = useState("Siswa SMK");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { speak } = useApp();

  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    if (!email || !password || !namaDepan) return alert("Harap isi semua kolom wajib");
    
    setLoading(true);
    try {
      await api.registerRequest({
        name: `${namaDepan} ${namaBelakang}`.trim(),
        email,
        password,
        role: 'student',
        kelas: tingkatanKelas
      });

      speak("Kode OTP telah dikirim ke email anda. Silakan periksa kotak masuk atau spam.");
      setStep(2);
    } catch (err) {
      speak("Gagal meminta kode verifikasi. Silakan periksa kembali email anda.");
      alert("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return alert("Harap masukkan kode OTP");

    setLoading(true);
    try {
      await api.registerVerify(email, otp);
      speak("Verifikasi berhasil! Selamat datang di FlexiStudy.");
      alert("Verifikasi berhasil! Selamat bergabung.");
      navigate("/dashboard");
    } catch (err) {
      speak("Kode OTP salah atau sudah kedaluwarsa.");
      alert("Verifikasi gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="panel">
        <div className="panel-label">Register</div>
        <div className="card">
          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
          </div>

          {step === 1 ? (
            <>
              <div className="card-title">Buat Akun Baru</div>
              <div className="card-sub">Selesaikan daftar akun mu yuk!</div>
              
              <div className="row2">
                <div className="field">
                  <label>Nama Depan</label>
                  <input 
                    type="text" className="finput" placeholder="Nama Depan"
                    value={namaDepan} onChange={(e) => setNamaDepan(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Nama Belakang</label>
                  <input 
                    type="text" className="finput" placeholder="Nama Belakang"
                    value={namaBelakang} onChange={(e) => setNamaBelakang(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="field">
                <label>Alamat Email</label>
                <input 
                  type='email' placeholder='Masukan alamat email'
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className='finput'
                />
              </div>
              
              <div className="field">
                <label>Password</label>
                <input 
                  type="password" className="finput" placeholder="Masukan Password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button type="button" onClick={handleRegisterRequest} className="btn-full" disabled={loading}>
                {loading ? "Mengirim OTP..." : "Daftar & Kirim OTP →"}
              </button>
            </>
          ) : (
            <>
              <div className="card-title">Verifikasi Email</div>
              <div className="card-sub">Masukkan 6 digit kode OTP yang dikirim ke {email}</div>
              
              <div className="field">
                <label>Kode OTP</label>
                <input 
                  type="text" className="finput" placeholder="000000"
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
                />
              </div>
              
              <button type="button" onClick={handleVerifyOTP} className="btn-full" disabled={loading}>
                {loading ? "Memverifikasi..." : "Verifikasi Sekarang →"}
              </button>
              
              <div className="switch" onClick={() => setStep(1)} style={{ cursor: 'pointer', marginTop: '16px' }}>
                Kembali ke pendaftaran
              </div>
            </>
          )}
          
          <div className="switch" onClick={() => speak("Masuk ke akun yang sudah ada")}>
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
