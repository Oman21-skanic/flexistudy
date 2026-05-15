import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import './leaderboard.css';

const Leaderboard = () => {
  const { leaderboard } = useApp();

  return (
    <div className="dash-page">
      <main className="dash-main" style={{ width: '100%' }}>
        <div className="dash-header">
          <div>
            <div className="dash-greeting">Leaderboard FlexiStudy</div>
            <div className="dash-sub">Peringkat siswa berdasarkan streak, XP, dan progress.</div>
          </div>
          <div className="dash-header-right">
            <Link to="/dashboard" className="dash-home-btn">Kembali ke Dashboard</Link>
          </div>
        </div>

        <div className="leaderboard-shell">
          {leaderboard.map((item) => (
            <div key={item.email} className="leaderboard-card">
              <div className="leaderboard-rank">#{item.rank}</div>
              <div className="leaderboard-main">
                <div className="leaderboard-name">{item.name}</div>
                <div className="leaderboard-meta">{item.kelas} · Streak {item.streak} hari</div>
              </div>
              <div className="leaderboard-stats">
                <span>{item.xp} XP</span>
                <span>Level {item.level}</span>
                <span>Progress {item.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
