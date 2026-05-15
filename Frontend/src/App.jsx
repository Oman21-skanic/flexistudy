import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard";
import MateriIPA from "./pages/MateriIPA";
import MateriBahasaIndonesia from "./pages/MateriBahasaIndonesia";
import MateriBahasaInggris from "./pages/MateriBahasaInggris";
import ModuleDetail from "./pages/ModuleDetail";
import QuizPage from "./pages/QuizPage";
import AdminDashboard from "./pages/AdminDashboard";
import { api } from "./lib/apiClient";
import "./styles/quiz.css";
import "./styles/module-detail.css";

export const AppContext = createContext(null);
export function useApp() { return useContext(AppContext); }

function App() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ttsEnabled, setTtsEnabled] = useState(() => localStorage.getItem("fs_tts") === "1");
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("fs_hc") === "1");

  // INITIAL LOAD
  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem('flexistudy_token');
        const storedUser = localStorage.getItem('flexistudy_user');
        
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const [mods, subs] = await Promise.all([
          api.getModules(),
          api.getSubjects()
        ]);
        setModules(mods);
        setSubjects(subs);

        if (storedUser) {
          const email = JSON.parse(storedUser).email;
          const acts = await api.getActivities(email);
          setActivities(acts);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", "light");
    root.setAttribute("data-hc", highContrast ? "1" : "0");
    localStorage.setItem("fs_hc", highContrast ? "1" : "0");
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem("fs_tts", ttsEnabled ? "1" : "0");
  }, [ttsEnabled]);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    setUser(res.user);
    localStorage.setItem('flexistudy_user', JSON.stringify(res.user));
    
    // Fetch user specific data
    const acts = await api.getActivities(res.user.email);
    setActivities(acts);
    return res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flexistudy_token');
    localStorage.removeItem('flexistudy_user');
  };

  const refreshModules = async () => {
    const mods = await api.getModules();
    setModules(mods);
  };

  const refreshUserData = async () => {
    if (!user) return;
    try {
      const email = user.email;
      // Get updated user (XP, Level, Progress) and Activities
      const [updatedUser, acts] = await Promise.all([
        api.getUsers().then(users => users.find(u => u.email === email)),
        api.getActivities(email)
      ]);
      
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('flexistudy_user', JSON.stringify(updatedUser));
      }
      setActivities(acts);
    } catch (err) {
      console.error("Refresh user data error:", err);
    }
  };

  const speak = (text, options = {}) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = options.lang || 'id-ID';
      utt.rate = typeof options.rate === 'number' ? options.rate : 0.92;
      window.speechSynthesis.speak(utt);
    } catch (e) {}
  };

  const ctx = {
    user,
    login,
    logout,
    modules,
    subjects,
    activities,
    refreshModules,
    refreshUserData,
    ttsEnabled,
    setTtsEnabled,
    highContrast,
    setHighContrast,
    speak,
    loading
  };

  if (loading) return <div className="loading">Memuat FlexiStudy...</div>;

  return (
    <AppContext.Provider value={ctx}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/module/:moduleId" element={<ModuleDetail />} />
          <Route path="/module/:moduleId/sub/:subId/quiz" element={<QuizPage />} />
          <Route path="/materi/ipa" element={<MateriIPA />} />
          <Route path="/materi/bahasa-indonesia" element={<MateriBahasaIndonesia />} />
          <Route path="/materi/bahasa-inggris" element={<MateriBahasaInggris />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;