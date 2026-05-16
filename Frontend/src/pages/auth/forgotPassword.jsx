import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { useApp } from '../../App';
import { api } from '../../lib/apiClient';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email Request, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { speak } = useApp();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) return alert("Harap masukkan email anda");

    setLoading(true);
    try {
      await api.forgotPassword(email);
      speak("Kode OTP untuk reset password telah dikirim ke email anda.");
      setStep(2);
    } catch (err) {
      speak("Email tidak ditemukan atau terjadi kesalahan.");
      alert("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return alert("Harap isi semua kolom");

    setLoading(true);
    try {
      await api.resetPassword(email, otp, newPassword);
      speak("Password berhasil diatur ulang. Silakan login dengan password baru anda.");
      alert("Password berhasil diubah!");
      navigate("/login");
    } catch (err) {
      speak("Kode OTP salah atau sudah kedaluwarsa.");
      alert("Gagal reset: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="panel">
        <div className="panel-label">Reset Password</div>
        <div className="card">
          {step === 1 ? (
            <>
              <div className="card-title">Lupa Password?</div>
              <div className="card-sub">Jangan khawatir! Masukkan email anda untuk menerima kode OTP.</div>
              
              <div className="field">
                <label>Alamat Email</label>
                <input 
                  type='email' placeholder='Masukan alamat email'
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className='finput'
                />
              </div>
              
              <button type="button" onClick={handleRequestOTP} className="btn-full" disabled={loading}>
                {loading ? "Mengirim OTP..." : "Kirim Kode OTP →"}
              </button>
            </>
          ) : (
            <>
              <div className="card-title">Atur Ulang Password</div>
              <div className="card-sub">Masukkan kode OTP dan password baru anda.</div>
              
              <div className="field">
                <label>Kode OTP</label>
                <input 
                  type="text" className="finput" placeholder="000000"
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
                />
              </div>

              <div className="field">
                <label>Password Baru</label>
                <input 
                  type="password" className="finput" placeholder="Password Baru"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <button type="button" onClick={handleResetPassword} className="btn-full" disabled={loading}>
                {loading ? "Memproses..." : "Ubah Password Sekarang →"}
              </button>
            </>
          )}
          
          <div className="switch" onClick={() => speak("Kembali ke halaman login")}>
            Tiba-tiba ingat password? <Link to="/login"><span>Masuk</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
