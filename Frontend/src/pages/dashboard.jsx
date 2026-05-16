import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import './dashboard.css';
import logo from '../assets/logo.png';
import NavControls from '../components/GlobalControls';

const ACTIVITIES = [
  { emoji: '✅', text: 'Menyelesaikan latihan Aljabar — Bab 3', time: '2 jam lalu', xp: '+20 XP' },
  { emoji: '🏆', text: 'Naik ke Level 3!', time: '1 hari lalu', xp: '+50 XP' },
  { emoji: '📖', text: 'Membaca materi Biologi Sel', time: '1 hari lalu', xp: '+10 XP' },
  { emoji: '⭐', text: 'Streak 7 hari berturut-turut', time: '2 hari lalu', xp: '+30 XP' },
];

const Dashboard = () => {
  const { user, logout, speak, activities, trackProgress, modules } = useApp();
  const navigate = useNavigate();

  const SUBJECTS = [
    { id: 1, emoji: '🔬', title: 'IPA', topic: 'Biologi Sel',
      progress: user?.progress_ipa || 0, xp: 210,
      color: '#E0F2FE', route: '/materi/ipa', subject: 'ipa' },
    { id: 2, emoji: '🌍', title: 'Bahasa Indonesia', topic: 'Teks Narasi',
      progress: user?.progress_b_indonesia || 0, xp: 410,
      color: '#ECFDF5', route: '/materi/bahasa-indonesia', subject: 'b_indonesia' },
    { id: 3, emoji: '🌐', title: 'Bahasa Inggris', topic: 'Reading Comprehension',
      progress: user?.progress_b_inggris || 0, xp: 290,
      color: '#FEF3C7', route: '/materi/bahasa-inggris', subject: 'b_inggris' },
  ];

  const [activeTab, setActiveTab] = useState('beranda');
  const [ttsText, setTtsText] = useState('');
  const [ttsReading, setTtsReading] = useState(false);

  const totalXP = user?.xp || 0;
  const level = user?.level || 1;
  const streak = user?.streak || 0; 
  const nextLevelXP = level * 200;
  const xpPercent = Math.min(100, Math.round((totalXP / nextLevelXP) * 100));
  const initials = (user?.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const weekProgress = Math.round(SUBJECTS.reduce((a, s) => a + s.progress, 0) / SUBJECTS.length);

  const handleTTSRead = () => {
    if (!ttsText.trim()) { speak('Ketik teks terlebih dahulu.'); return; }
    setTtsReading(true);
    const utt = new SpeechSynthesisUtterance(ttsText);
    utt.lang = 'id-ID';
    utt.rate = 0.92;
    utt.onend = () => setTtsReading(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  };

  const stopTTS = () => { window.speechSynthesis.cancel(); setTtsReading(false); };

  return (
    <div className="dash-page">
      <aside className="sidebar">
        <div className="sb-logo">
          <div className="li">
            <img src={logo} alt="FlexiStudy Logo" style={{ height: '86px', objectFit: 'contain' }} />
          </div>
          <span className="ln">Flexi<span>Study</span></span>
        </div>

          <nav className="sb-nav">
            {[
              ['beranda', '🏠', 'Beranda'],
              ['materi', '📚', 'Materi'],
            ].map(([id, icon, label]) => (
              <button
                key={id}
                className={`sb-item${activeTab === id ? ' active' : ''}`}
                onClick={() => { setActiveTab(id); speak(label); }}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
            {user?.role === 'admin' && (
              <button
                className="sb-item"
                onClick={() => { speak('Membuka Panel Admin'); navigate('/admin'); }}
                style={{ marginTop: '12px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}
              >
                <span>🛡️</span> Admin Panel
              </button>
            )}
          </nav>

        <div className="sb-user">
          <div className="sb-av">{initials}</div>
          <div>
            <div className="sb-name">{user?.name || "Siswa"}</div>
            <div className="sb-kelas">{user?.kelas || "Kelas Umum"}</div>
          </div>
          <button className="sb-logout" onClick={() => { speak('Keluar dari aplikasi'); logout(); navigate('/'); }} title="Keluar">↩</button>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-header">
          <div>
            <div className="dash-greeting">Halo, {(user?.name || "Teman Belajar").split(' ')[0]}! 👋</div>
            <div className="dash-sub">Ayo lanjutkan belajar hari ini</div>
          </div>
          <div className="dash-header-right">
            <NavControls />
            <Link to="/" className="dash-home-btn">← Beranda</Link>
          </div>
        </div>

        {/* TAB: BERANDA */}
        {activeTab === 'beranda' && (
          <div className="tab-content">
            <div className="stat-row">
              <StatCard icon="⚡" label="Total XP" value={totalXP} />
              <StatCard icon="🏅" label="Level" value={level} />
              <StatCard icon="🔥" label="Streak" value={`${streak} hari`} />
              <StatCard icon="📊" label="Progress Minggu" value={`${weekProgress}%`} />
            </div>

            <div className="xp-card">
              <div className="xp-row">
                <span className="xp-label">Level {level} → Level {level + 1}</span>
                <span className="xp-val">{totalXP} / {nextLevelXP} XP</span>
              </div>
              <div className="xp-bar"><div className="xp-fill" style={{ width: `${xpPercent}%` }}></div></div>
              <div className="xp-hint">Butuh {nextLevelXP - totalXP} XP lagi untuk naik level!</div>
            </div>

            <div className="section-title">📚 Progress Mata Pelajaran</div>
            <div className="subject-grid">
              {SUBJECTS.map(s => (
                <div key={s.id} className="subj-card" onClick={() => speak(`${s.title}. Materi ${s.topic}. Progres belajar anda ${s.progress} persen.`)}>
                  <div className="subj-head">
                    <div className="subj-icon" style={{ background: s.color }}>{s.emoji}</div>
                    <div>
                      <div className="subj-title">{s.title}</div>
                      <div className="subj-topic">{s.topic}</div>
                    </div>
                    <div className="subj-xp">+{s.xp} XP</div>
                  </div>
                  <div className="bar" style={{ marginBottom: 0 }}>
                    <div className="bf" style={{ width: `${s.progress}%` }}></div>
                  </div>
                  <div className="subj-pct">{s.progress}%</div>
                </div>
              ))}
            </div>

            <div className="section-title">🕐 Aktivitas Terbaru</div>
            <div className="activity-list">
              {activities.length === 0 ? (
                <div className="act-item">
                  <span className="act-icon">📭</span>
                  <span className="act-text">Belum ada aktivitas. Ayo mulai belajar!</span>
                </div>
              ) : (
                activities.map((a, i) => (
                  <div key={i} className="act-item">
                    <span className="act-icon">{a.emoji}</span>
                    <span className="act-text">{a.text}</span>
                    <span className="act-time">{a.time}</span>
                    <span className="act-xp">{a.xp}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB: MATERI */}
        {activeTab === 'materi' && (
          <div className="tab-content">
            <div className="section-title">📚 Daftar Modul Pembelajaran</div>
            <div className="subject-grid">
              {Array.isArray(modules) && modules.length > 0 ? (
                modules.map((mod) => (
                  <div
                    key={mod.id}
                    className="module-card"
                    onClick={() => {
                      speak(`${mod.title}. ${mod.topic}.`);
                      navigate(`/module/${mod.id}`);
                    }}
                  >
                    <div className="module-header">
                      <h3>{mod.title}</h3>
                      <p className="module-topic">{mod.topic}</p>
                    </div>
                    <p className="module-desc">{mod.description}</p>
                    <div className="module-meta">
                      <span>📚 {mod.subModules} Bagian</span>
                      <span>❓ {mod.quizPerSubModule} soal/bagian</span>
                    </div>
                    <button className="module-btn">
                      Mulai Belajar →
                    </button>
                  </div>
                ))
              ) : null
              }
            </div>
          </div>
        )}

        {/* TAB: TTS */}
        {activeTab === 'tts' && (
          <div className="tab-content">
            <div className="section-title">🔊 Text-to-Speech</div>
            <div className="tts-card">
              <label className="tts-label">Ketik teks untuk dibacakan:</label>
              <textarea
                className="tts-input"
                placeholder="Ketik sesuatu di sini..."
                value={ttsText}
                onChange={e => setTtsText(e.target.value)}
                rows={5}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="btn-full" onClick={handleTTSRead} disabled={ttsReading}>
                  {ttsReading ? '⏳ Membaca...' : '▶️ Baca'}
                </button>
                <button className="btn-full" style={{ background: '#666' }} onClick={stopTTS}>
                  ⏹ Stop
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '28px' }}>
          
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export default Dashboard;