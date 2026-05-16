import React from 'react';
import { useApp } from '../App';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      title={theme === 'light' ? 'Ganti ke Tema Gelap' : 'Ganti ke Tema Terang'}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
