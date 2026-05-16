import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { demoModules } from '../data/mockLearningData';
import { getMaterialContent } from '../data/materiContent';
import { api } from '../lib/apiClient';
import NavControls from '../components/GlobalControls';
import '../styles/module-detail.css';

export function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, modules, refreshUserData, speak } = useApp();

  const [module, setModule] = useState(null);
  const [activeSubmodule, setActiveSubmodule] = useState(null);
  const [viewMode, setViewMode] = useState('content');
  const [submoduleList, setSubmoduleList] = useState([]);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // TTS state
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [ttsRate, setTtsRate] = useState(1);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const utterRef = useRef(null);
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false);
  const voiceDropdownRef = useRef(null);
  const [userAttempts, setUserAttempts] = useState([]);
  const PASS_PERCENT = 80;

  useEffect(() => {
    if (user) {
      api.getQuizAttempts(user.email).then(setUserAttempts);
    }
  }, [user]);

  const getBestScore = (subId) => {
    const subAttempts = userAttempts.filter(a => a.sub_module_id === subId);
    if (subAttempts.length === 0) return null;
    return Math.max(...subAttempts.map(a => a.percentage));
  };

  const isSubmoduleLocked = (index) => {
    if (index === 0) return false;
    const prevSub = submoduleList[index - 1];
    const prevScore = getBestScore(prevSub.id);
    return prevScore === null || prevScore < PASS_PERCENT;
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    let mod = (modules || []).find((m) => m.id === moduleId);
    if (!mod) {
      mod = demoModules.find((m) => m.id === moduleId);
    }
    
    if (!mod) {
      navigate('/dashboard');
      return;
    }

    setModule(mod);

    // Generate submodules list
    let submodules = [];
    if (mod.dynamicSubModules) {
      submodules = mod.dynamicSubModules.map(ds => ({
        id: ds.id,
        title: ds.title,
        dynamic: true,
        data: ds
      }));
    } else {
      submodules = Array.from({ length: mod.subModules || 0 }, (_, i) => ({
        id: `${mod.id}-sub${i + 1}`,
        number: i + 1,
        title: `${mod.topic} - Bagian ${i + 1}`,
      }));
    }
    
    setSubmoduleList(submodules);
    if (submodules.length > 0) setActiveSubmodule(submodules[0]);
  }, [moduleId, user, navigate, modules]);

  useEffect(() => {
    if (!window || !window.speechSynthesis) return;
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices() || [];
      const indo = all.filter((v) => (v.lang || '').toLowerCase().startsWith('id'));
      const eng = all.filter((v) => (v.lang || '').toLowerCase().startsWith('en'));
      let selected = [...indo.slice(0, 2), ...eng.slice(0, 2)];
      if (selected.length < 4) selected = [...selected, ...all.slice(0, 4 - selected.length)];
      setVoices(selected);
      if (selected.length > 0) setSelectedVoiceIndex(0);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const materiContent = useMemo(() => {
    if (!activeSubmodule) return { title: '', content: '' };
    if (activeSubmodule.dynamic) {
      return {
        id: activeSubmodule.id,
        title: activeSubmodule.title,
        duration: "5 Menit",
        content: (activeSubmodule.data?.sections || []).map(s => `## ${s.title}\n${s.content}`).join('\n\n')
      };
    }
    return getMaterialContent(activeSubmodule.id);
  }, [activeSubmodule]);

  if (!module || !activeSubmodule) {
    return <div className="loading">Memuat materi...</div>;
  }

  const currentIndex = submoduleList.findIndex((s) => s.id === activeSubmodule.id);

  const handleSelectSubmodule = (submodule, index) => {
    if (isSubmoduleLocked(index)) {
      speak('Bagian ini masih terkunci. Selesaikan bagian sebelumnya dengan nilai minimal 80%');
      alert('Selesaikan bagian sebelumnya dengan nilai minimal 80% untuk membuka bagian ini.');
      return;
    }
    setActiveSubmodule(submodule);
    setViewMode('content');
    speak(`Membuka ${submodule.title}`);
  };

  const handlePlayTTS = () => {
    if (!window || !window.speechSynthesis) return;
    let text = activeSubmodule.dynamic 
      ? activeSubmodule.data.sections.map(s => `${s.title}. ${s.content}`).join(' ')
      : materiContent.content;
    
    if (!text) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = Number(ttsRate) || 1;
    if (voices[selectedVoiceIndex]) utt.voice = voices[selectedVoiceIndex];
    utt.onend = () => setTtsPlaying(false);
    window.speechSynthesis.speak(utt);
    setTtsPlaying(true);
  };

  const handleMarkAsRead = async () => {
    if (!user) return;
    try {
      const subjectId = moduleId.startsWith('ipa') ? 'ipa' : 
                        moduleId.startsWith('indo') ? 'b_indonesia' : 
                        moduleId.startsWith('inggris') ? 'b_inggris' : 'ipa';
      
      await api.markMaterialRead({
        email: user.email,
        subjectId,
        progress: Math.min(100, (currentIndex + 1) * 20) // Simple progress calc
      });
      await refreshUserData();
      speak('Materi selesai dibaca!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartQuiz = () => {
    navigate(`/module/${moduleId}/sub/${activeSubmodule.id}/quiz`);
  };

  return (
    <div className="module-detail-page">
      <div className="module-detail-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button className="btn-back-top" onClick={() => navigate('/dashboard')} style={{ marginBottom: 0 }}>
            ← Kembali ke Dashboard
          </button>
          <NavControls />
        </div>

        <div className={`module-layout ${leftOpen ? '' : 'left-collapsed'} ${rightOpen ? '' : 'right-collapsed'}`}>
          <aside className={`module-left-sidebar ${leftOpen ? '' : 'collapsed'}`}>
            <div className="sidebar-header">
              <h3>Ringkasan</h3>
              <button className="btn icon-btn" onClick={() => setLeftOpen(!leftOpen)}>{leftOpen ? '◀' : '▶'}</button>
            </div>
            {leftOpen && (
              <div style={{ paddingTop: 8 }}>
                <p style={{ margin: 0, fontWeight: 700 }}>{module.title}</p>
                <p style={{ margin: '6px 0', color: '#666' }}>{module.topic}</p>
                <p style={{ margin: '8px 0', fontSize: 13 }}>Bagian: {module.subModules}</p>
              </div>
            )}
          </aside>

          <div className="module-content">
            <div className="content-header">
              <h1>{module.title}</h1>
              <p className="breadcrumb">{module.topic} • Bagian {currentIndex + 1} dari {module.subModules}</p>
            </div>

            <div className="tts-player">
               <div className="tts-left">
                <h2 className="tts-title">{materiContent.title}</h2>
                <div className="tts-controls-mini">
                  <button className="btn icon-btn" onClick={handlePlayTTS}>▶</button>
                  <button className="btn icon-btn" onClick={() => window.speechSynthesis.pause()}>⏸</button>
                  <button className="btn icon-btn" onClick={() => { window.speechSynthesis.cancel(); setTtsPlaying(false); }}>⏹</button>
                </div>
              </div>
            </div>

            <div className="materi-card">
              <div className="materi-body">
                {activeSubmodule.dynamic ? (
                  activeSubmodule.data.sections.map((section, sidx) => (
                    <div key={sidx} className="dynamic-section" style={{ marginBottom: '32px' }}>
                      <h3 className="materi-h3">{section.title}</h3>
                      <div className="materi-p" style={{ whiteSpace: 'pre-wrap' }}>{section.content}</div>
                    </div>
                  ))
                ) : (
                  <div className="materi-p" style={{ whiteSpace: 'pre-wrap' }}>{materiContent.content}</div>
                )}
              </div>

              <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
                <button className="btn btn-ghost" onClick={handleMarkAsRead}>
                  ✓ Selesai Membaca
                </button>
                <button className="btn btn-primary" onClick={handleStartQuiz}>
                  📝 Mulai Kuis Bagian Ini
                </button>
              </div>
            </div>
          </div>

          <aside className={`module-sidebar ${rightOpen ? '' : 'collapsed'}`}>
            <div className="sidebar-header">
              <h3>Daftar Bagian</h3>
              <button className="btn icon-btn" onClick={() => setRightOpen(!rightOpen)}>{rightOpen ? '▶' : '◀'}</button>
            </div>
            {rightOpen && (
              <div className="submodules-nav">
                {submoduleList.map((sub, idx) => {
                  const score = getBestScore(sub.id);
                  const locked = isSubmoduleLocked(idx);
                  return (
                    <button 
                      key={sub.id} 
                      className={`submod-btn ${sub.id === activeSubmodule.id ? 'active' : ''} ${locked ? 'locked' : ''}`}
                      onClick={() => handleSelectSubmodule(sub, idx)}
                    >
                      <div className="submod-badge">
                        {locked ? '🔒' : (score >= PASS_PERCENT ? '✅' : idx + 1)}
                      </div>
                      <div className="submod-info">
                        <div className="submod-label">{sub.title}</div>
                        {score !== null && (
                          <div className="submod-score">Skor: {score}%</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ModuleDetail;
