import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useApp } from '../App';
import '../App.css';
import logo from '../assets/logo.png';

const LandingPage = () => {
  const { user, darkMode, setDarkMode, ttsEnabled, setTtsEnabled, highContrast, setHighContrast, speak, logout } = useApp();
  const navigate = useNavigate();

  const handleTTS = () => {
    const newVal = !ttsEnabled;
    setTtsEnabled(newVal);
    if (newVal) {
      setTimeout(() => speak("Text to Speech diaktifkan. Selamat datang di FlexiStudy!"), 100);
    } else {
      window.speechSynthesis && window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="frame">
      {/* Navigation */}
      <nav className="nav">
        <div className="logo">
          <div className="li">
              <img src={logo} alt="FlexiStudy Logo" style={{ height: '86px', objectFit: 'contain' }} />
          </div>
          <span className="ln">Flexi<span>Study</span></span>
        </div>

        <div className="nb">
          {/* Dark Mode Toggle */}
          <button
            className={`nb-icon${darkMode ? ' active' : ''}`}
            onClick={() => setDarkMode(v => !v)}
            title={darkMode ? "Mode Terang" : "Mode Gelap"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* High Contrast Toggle */}
          <button
            className={`nb-icon${highContrast ? ' active' : ''}`}
            onClick={() => setHighContrast(v => !v)}
            title="Kontras Tinggi"
          >
            🔆
          </button>

          {/* TTS Toggle */}
          <button
            className={`nb-icon${ttsEnabled ? ' active' : ''}`}
            onClick={handleTTS}
            title={ttsEnabled ? "Matikan Text-to-Speech" : "Aktifkan Text-to-Speech"}
          >
            {ttsEnabled ? '🔊' : '🔇'}
          </button>

          {user ? (
            <>
              <button className="bg" onClick={() => navigate('/dashboard')}>Dashboard</button>
              <button className="bp" onClick={logout}>Keluar</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg">Masuk</Link>
              <Link to="/register" className="bp">Mulai Gratis</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-wrap">
        <div>
          <div className="hbadge">
            <span className="hdot"></span> Platform Belajar Lokal untuk Siswa dan Guru
          </div>
          <h1>Belajar <em>Fleksibel</em>,<br />Tumbuh Bersama</h1>
          <p className="hp">
            FlexiStudy menyesuaikan materi dengan kemampuanmu agar setiap pelajar dari berbagai latar belakang punya kesempatan belajar yang sama.
          </p>
          <div className="hbtns">
            <Link to="/register" className="bpl" onClick={() => speak("Mulai belajar gratis sekarang!")}>
              Mulai Belajar Gratis
            </Link>
          </div>
          <div className="stats">
            <div>
              <div className="sn">120K+</div>
              <div className="sl">Pelajar aktif</div>
            </div>
            <div>
              <div className="sn">800+</div>
              <div className="sl">Materi tersedia</div>
            </div>
            <div>
              <div className="sn">96%</div>
              <div className="sl">Tingkat kepuasan</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="fbadge">🏆 <span>Level naik! +125 XP</span></div>
          <div className="hcard">
            <div className="hh">
              <div className="av">SA</div>
              <div>
                <div className="aname">Sari Amelia</div>
                <div className="asub">Kelas 10 · Level Menengah</div>
              </div>
              <div className="abadge">Aktif</div>
            </div>
            <div className="prow">
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Progress Minggu Ini</span>
              <span>68%</span>
            </div>
            <div className="bar"><div className="bf" style={{ width: '68%' }}></div></div>
            <div className="subs">
              <SubjectItem emoji="📗" title="Bahasa Inggris" desc="Aljabar · 72%" bg="#DBEAFE" />
              <SubjectItem emoji="🔬" title="Ipa" desc="Biologi · 55%" bg="#CCFBF1" />
              <SubjectItem emoji="🌍" title="Bahasa Indonesia" desc="Narasi · 83%" bg="#FEF3C7" />
            </div>
          </div>
          <div className="fbadge">
            🎙️ <span>Text-to-Speech {ttsEnabled ? 'aktif ✓' : 'nonaktif'}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="fstrip">
        <FeatureCard emoji="🧠" title="Pembelajaran Adaptif" desc="Materi otomatis menyesuaikan performa belajarmu" bg="#DBEAFE" speak={speak} />
        <FeatureCard emoji="🔊" title="Text-to-Speech" desc="Dengarkan materi kapan saja untuk aksesibilitas" bg="#CCFBF1" speak={speak} />
        <FeatureCard emoji="🎯" title="Pelacakan Progress" desc="Pantau pertumbuhan belajar dengan grafik jelas" bg="#FEF3C7" speak={speak} />
        <FeatureCard emoji="🌙" title="Dark & High Contrast" desc="Tampilan fleksibel untuk kenyamanan mata" bg="#E2E8F0" speak={speak} />
      </div>

      {/* Steps */}
      <div className="section">
        <div className="sh">
          <div className="slabel">Cara Kerja</div>
          <h2>Tiga Langkah Mudah Menuju Prestasi</h2>
          <p>Dirancang agar siapa pun bisa langsung mulai tanpa kebingungan</p>
        </div>
        <div className="steps">
          <StepCard num="01" emoji="👤" title="Buat Akun & Tes Awal"
            desc="Daftar gratis dan ikuti tes singkat untuk menentukan level awalmu secara akurat." />
          <StepCard num="02" emoji="📚" title="Belajar Sesuai Levelmu"
            desc="Sistem otomatis merekomendasikan materi yang pas. Tingkat kesulitan naik seiring kemajuanmu." />
          <StepCard num="03" emoji="🏆" title="Raih Badge & Level Up"
            desc="Setiap pencapaian dihargai dengan badge dan XP. Pantau perjalananmu secara real-time." />
        </div>
      </div>

      {/* CTA */}
      <div className="cta">
        <h2>Mulai Perjalanan Belajarmu Hari Ini — Gratis!</h2>
        <p>Lebih dari 120.000 pelajar sudah merasakan manfaatnya. Sekarang giliran kamu.</p>
        <Link to="/register" className="bw">Daftar Gratis Sekarang →</Link>
      </div>

      <div className="footer">© 2025 FlexiStudy · Platform Belajar Adaptif Indonesia</div>
    </div>
  );
};

const SubjectItem = ({ emoji, title, desc, bg }) => (
  <div className="sub">
    <div className="si" style={{ background: bg }}>{emoji}</div>
    <div>
      <div className="sn2">{title}</div>
      <div className="sp">{desc}</div>
    </div>
  </div>
);

const FeatureCard = ({ emoji, title, desc, bg, speak }) => (
  <div className="fc" onClick={() => speak && speak(`${title}. ${desc}`)}>
    <div className="fi" style={{ background: bg }}>{emoji}</div>
    <div className="ft">{title}</div>
    <div className="fd">{desc}</div>
  </div>
);

const StepCard = ({ num, emoji, title, desc }) => (
  <div className="sc">
    <span className="snum">{num}</span>
    <div className="sic">{emoji}</div>
    <div className="stitle">{title}</div>
    <div className="sdesc">{desc}</div>
  </div>
);

export default LandingPage;
