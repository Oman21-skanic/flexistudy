import React from 'react';
import { useApp } from '../App';

const NavControls = () => {
  const { theme, toggleTheme, ttsEnabled, setTtsEnabled, speak } = useApp();

  const handleTTSToggle = () => {
    const newVal = !ttsEnabled;
    setTtsEnabled(newVal);
    if (newVal) {
      setTimeout(() => speak("Text to Speech diaktifkan."), 100);
    } else {
      window.speechSynthesis && window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="nav-controls">
      {/* TTS Toggle */}
      <button 
        className="nav-control-btn" 
        onClick={handleTTSToggle}
        title={ttsEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
      >
        {ttsEnabled ? '🔊' : '🔇'}
      </button>

      {/* Theme Toggle */}
      <button 
        className="nav-control-btn" 
        onClick={() => {
          const nextTheme = theme === 'light' ? 'Gelap' : 'Terang';
          speak(`Mengganti ke tema ${nextTheme}`);
          toggleTheme();
        }}
        title={theme === 'light' ? 'Ganti ke Tema Gelap' : 'Ganti ke Tema Terang'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default NavControls;
