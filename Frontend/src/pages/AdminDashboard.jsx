import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { api } from '../lib/apiClient';
import './AdminDashboard.css';
import logo from '../assets/logo.png';
import NavControls from '../components/GlobalControls';

const AdminDashboard = () => {
  const { user, logout, modules, subjects: appSubjects, refreshModules, speak } = useApp();
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState('mapel');

  // Local State
  const [subjects, setSubjects] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);

  // Form States
  const [newMapel, setNewMapel] = useState({ name: '' });
  const [newModul, setNewModul] = useState({ title: '', topic: '', subjectId: '', description: '' });
  const [editingModul, setEditingModul] = useState(null);
  const [studentAttempts, setStudentAttempts] = useState([]);

  // Sub-Module & Quiz State
  const [editingSubModuleId, setEditingSubModuleId] = useState(null);
  const [subModuleTitle, setSubModuleTitle] = useState('');
  const [sections, setSections] = useState([{ id: Date.now(), title: 'Bagian 1', content: '' }]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correct: 0
  });

  useEffect(() => {
    if (appSubjects) setSubjects(appSubjects);
  }, [appSubjects]);

  useEffect(() => {
    if (activeTab === 'progres') {
      api.getUsers().then(setStudents);
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedStudent) {
      api.getQuizAttempts(selectedStudent.email).then(setStudentAttempts);
    } else {
      setStudentAttempts([]);
    }
  }, [selectedStudent]);

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Akses Ditolak</h2>
        <p>Halaman ini hanya untuk Administrator.</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">Kembali</button>
      </div>
    );
  }

  const getRandomColor = () => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleAddMapel = async (e) => {
    e.preventDefault();
    const mapel = {
      name: newMapel.name,
      id: newMapel.name.toLowerCase().replace(/\s/g, '_'),
      color: getRandomColor(),
      initials: newMapel.name.charAt(0).toUpperCase()
    };
    await api.createSubject(mapel);
    setNewMapel({ name: '' });
    // In a real app we'd refresh app context subjects too
    setSubjects([...subjects, mapel]);
  };

  const handleDeleteMapel = async (id) => {
    if (window.confirm('Hapus mata pelajaran ini?')) {
      // API doesn't have delete subject yet, but we'll filter locally for now
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const handleAddModul = async (e) => {
    e.preventDefault();
    try {
      if (editingModul) {
        // Update logic (simplified to re-create or we could add update API)
        await api.createModule(editingModul);
        setEditingModul(null);
      } else {
        const modul = {
          ...newModul,
          id: `mod-${Date.now()}`,
          subject_id: newModul.subjectId,
          sub_modules_count: 0,
          quiz_per_sub_module: 5
        };
        await api.createModule(modul);
        setNewModul({ title: '', topic: '', subjectId: '', description: '' });
      }
      refreshModules();
    } catch (err) {
      alert("Error saving module");
    }
  };

  const handleDeleteModul = async (id) => {
    if (window.confirm('Hapus modul ini?')) {
      await api.deleteModule(id);
      refreshModules();
    }
  };

  // DYNAMIC SECTIONS LOGIC
  const handleAddSection = () => {
    setSections([...sections, { id: Date.now(), title: `Bagian ${sections.length + 1}`, content: '' }]);
  };

  const handleUpdateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleRemoveSection = (id) => {
    if (sections.length > 1) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  // QUIZ LOGIC
  const handleAddQuestion = () => {
    if (!newQuestion.text || newQuestion.options.some(o => !o)) return alert('Isi semua field pertanyaan!');

    const labels = ['A', 'B', 'C', 'D'];
    const formattedQuestion = {
      id: editingQuestionId || Date.now(),
      question: newQuestion.text,
      options: [...newQuestion.options],
      correct: labels[newQuestion.correct],
      explanation: `Jawaban yang benar adalah ${labels[newQuestion.correct]}: ${newQuestion.options[newQuestion.correct]}`
    };

    if (editingQuestionId) {
      setCurrentQuestions(currentQuestions.map(q => q.id === editingQuestionId ? formattedQuestion : q));
    } else {
      setCurrentQuestions([...currentQuestions, formattedQuestion]);
    }

    setNewQuestion({ text: '', options: ['', '', '', ''], correct: 0 });
    setShowQuestionForm(false);
    setEditingQuestionId(null);
  };

  const handleEditQuestion = (q) => {
    const labels = ['A', 'B', 'C', 'D'];
    const correctIdx = labels.indexOf(q.correct);
    setNewQuestion({
      text: q.question,
      options: [...q.options],
      correct: correctIdx >= 0 ? correctIdx : 0
    });
    setEditingQuestionId(q.id);
    setShowQuestionForm(true);
  };

  const handleEditSubModule = (sub) => {
    setEditingSubModuleId(sub.id);
    setSubModuleTitle(sub.title);
    setSections(sub.sections.map((s, i) => ({ id: i, ...s })));
    setCurrentQuestions(sub.questions || []);
  };

  const resetSubModuleEditor = () => {
    setEditingSubModuleId(null);
    setSubModuleTitle('');
    setSections([{ id: Date.now(), title: 'Bagian 1', content: '' }]);
    setCurrentQuestions([]);
  };

  const handleSaveSubModule = async () => {
    if (!selectedModule) return alert('Pilih modul dulu!');
    if (!subModuleTitle) return alert('Judul sub-modul wajib diisi!');

    const subId = editingSubModuleId || `${selectedModule.id}-sub${Date.now()}`;
    const payload = {
      id: subId,
      module_id: selectedModule.id,
      title: subModuleTitle,
      sections: sections.map(sec => ({ title: sec.title, content: sec.content })),
      questions: currentQuestions
    };

    await api.saveSubModule(payload);
    alert('Sub-modul berhasil disimpan ke server!');

    resetSubModuleEditor();
    refreshModules();

    // Refresh local selectedModule
    setTimeout(async () => {
      const mods = await api.getModules();
      setSelectedModule(mods.find(m => m.id === selectedModule.id));
    }, 500);
  };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-sb-logo">
          <img src={logo} alt="Logo" />
          <span>Flexi<span>Admin</span></span>
        </div>

        <nav className="admin-sb-nav">
          <button className={`sb-item ${activeTab === 'mapel' ? 'active' : ''}`} onClick={() => { setActiveTab('mapel'); speak('Manajemen Mata Pelajaran'); }}>
            <span>🗺️</span> Manajemen Mapel
          </button>
          <button className={`sb-item ${activeTab === 'modul' ? 'active' : ''}`} onClick={() => { setActiveTab('modul'); speak('Manajemen Materi'); }}>
            <span>📚</span> Manajemen Materi
          </button>
          <button className={`sb-item ${activeTab === 'sub_modul' ? 'active' : ''}`} onClick={() => { setActiveTab('sub_modul'); speak('Editor Sub-Modul dan Kuis'); }}>
            <span>📝</span> Sub-Modul & Quiz
          </button>
          <button className={`sb-item ${activeTab === 'progres' ? 'active' : ''}`} onClick={() => { setActiveTab('progres'); speak('Pantau Progres Siswa'); }}>
            <span>📊</span> Progres Siswa
          </button>
        </nav>

        <div className="admin-sb-footer">
          <button onClick={() => { speak('Keluar dari Panel Admin'); logout(); navigate('/'); }} className="btn-logout">↩ Keluar</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-title">Panel Kontrol Admin</h1>
            <p className="admin-sub">Kelola kurikulum dan pantau aktivitas belajar siswa.</p>
          </div>
          <div className="admin-header-actions">
            <NavControls />
          </div>
        </header>

        {activeTab === 'mapel' && (
          <div className="tab-content fade-in">
            <div className="admin-card">
              <h2>Tambah Mata Pelajaran Baru</h2>
              <form onSubmit={handleAddMapel} className="admin-form">
                <div className="form-group">
                  <label>Nama Mapel</label>
                  <input type="text" value={newMapel.name} onChange={e => setNewMapel({ ...newMapel, name: e.target.value })} placeholder="Contoh: Fisika Dasar" required />
                </div>
                <button type="submit" className="btn-primary">Tambah Mapel</button>
              </form>
            </div>

            <div className="admin-card">
              <h2>Daftar Mapel Tersedia</h2>
              <div className="subjects-grid">
                {subjects.map(s => (
                  <div key={s.id} className="subject-mini-card">
                    <div className="s-initial-circle" style={{ backgroundColor: s.color || getRandomColor() }}>
                      {s.initials || s.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="s-name">{s.name}</span>
                    <button className="btn-icon-del" onClick={() => handleDeleteMapel(s.id)}>🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modul' && (
          <div className="tab-content fade-in">
            <div className="admin-card">
              <h2>{editingModul ? 'Edit Modul' : 'Buat Modul Baru'}</h2>
              <form onSubmit={handleAddModul} className="admin-form">
                <div className="form-group">
                  <label>Pilih Mata Pelajaran</label>
                  <select
                    value={editingModul ? editingModul.subject_id : newModul.subjectId}
                    onChange={e => editingModul ? setEditingModul({ ...editingModul, subject_id: e.target.value }) : setNewModul({ ...newModul, subjectId: e.target.value })}
                    required
                  >
                    <option value="">-- Pilih Mapel --</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Judul Modul</label>
                  <input
                    type="text"
                    value={editingModul ? editingModul.title : newModul.title}
                    onChange={e => editingModul ? setEditingModul({ ...editingModul, title: e.target.value }) : setNewModul({ ...newModul, title: e.target.value })}
                    placeholder="Contoh: Aljabar Linear" required
                  />
                </div>
                <div className="form-group">
                  <label>Topik</label>
                  <input
                    type="text"
                    value={editingModul ? editingModul.topic : newModul.topic}
                    onChange={e => editingModul ? setEditingModul({ ...editingModul, topic: e.target.value }) : setNewModul({ ...newModul, topic: e.target.value })}
                    placeholder="Contoh: Matematika Dasar" required
                  />
                </div>
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    value={editingModul ? editingModul.description : newModul.description}
                    onChange={e => editingModul ? setEditingModul({ ...editingModul, description: e.target.value }) : setNewModul({ ...newModul, description: e.target.value })}
                    placeholder="Deskripsi modul..."
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn-primary">{editingModul ? 'Simpan Perubahan' : 'Buat Modul'}</button>
                  {editingModul && <button type="button" className="btn-ghost" onClick={() => setEditingModul(null)}>Batal</button>}
                </div>
              </form>
            </div>

            <div className="admin-card">
              <h2>Daftar Modul</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Judul Materi</th>
                    <th>Pelajaran</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map(m => (
                    <tr key={m.id}>
                      <td><strong>{m.title}</strong><br /><small>{m.topic}</small></td>
                      <td>{String(m.subject_id || m.subject).toUpperCase()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-ghost-sm" onClick={() => setEditingModul(m)}>✏️ Edit</button>
                          <button className="btn-ghost-sm" style={{ color: '#ef4444' }} onClick={() => handleDeleteModul(m.id)}>🗑️ Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sub_modul' && (
          <div className="tab-content fade-in">
            <div className="admin-card">
              <h2>Editor Konten Dinamis</h2>

              <div className="form-group">
                <label>Pilih Modul Utama</label>
                <select value={selectedModule?.id || ''} onChange={e => {
                  const mod = modules.find(m => m.id === e.target.value);
                  setSelectedModule(mod);
                  resetSubModuleEditor();
                }}>
                  <option value="">-- Pilih Modul --</option>
                  {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                </select>
              </div>

              {selectedModule && (
                <div className="submodule-manager fade-in" style={{ marginTop: '24px' }}>
                  <h3>Daftar Sub-Modul ({selectedModule.dynamicSubModules?.length || 0})</h3>
                  <div className="submod-mini-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                    {(selectedModule.dynamicSubModules || []).map(sub => (
                      <div key={sub.id} className={`submod-mini-item ${editingSubModuleId === sub.id ? 'active' : ''}`}>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{sub.title}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => handleEditSubModule(sub)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                        </div>
                      </div>
                    ))}
                    <button className="btn-ghost-sm" onClick={resetSubModuleEditor}>➕ Buat Baru</button>
                  </div>

                  <div className="content-builder fade-in" style={{ borderTop: '2px solid var(--border)', paddingTop: '24px' }}>
                    <h4 style={{ marginBottom: '16px' }}>{editingSubModuleId ? `Sedang Mengedit: ${subModuleTitle}` : 'Buat Sub-Modul Baru'}</h4>
                    <div className="form-group">
                      <label>Judul Sub-Modul</label>
                      <input
                        type="text" className="form-input" placeholder="Contoh: Bab 1: Sejarah Komputer"
                        value={subModuleTitle} onChange={e => setSubModuleTitle(e.target.value)}
                      />
                    </div>

                    {sections.map((section, index) => (
                      <div key={section.id} className="builder-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <input
                            type="text" value={section.title}
                            onChange={e => handleUpdateSection(section.id, 'title', e.target.value)}
                            style={{ fontWeight: '700', border: 'none', background: 'transparent', fontSize: '15px', color: 'var(--t)' }}
                          />
                          {sections.length > 1 && <button onClick={() => handleRemoveSection(section.id)} style={{ color: '#ef4444', border: 'none', background: 'transparent', cursor: 'pointer' }}>Hapus Bagian</button>}
                        </div>
                        <textarea
                          className="form-textarea" placeholder="Isi materi bagian ini..."
                          value={section.content} onChange={e => handleUpdateSection(section.id, 'content', e.target.value)}
                        />
                      </div>
                    ))}

                    <button className="btn-ghost-sm" style={{ marginBottom: '32px' }} onClick={handleAddSection}>
                      ➕ Tambah Bagian Materi
                    </button>

                    <div className="quiz-creator-section">
                      <h3>Kuis Sub-Modul ({currentQuestions.length} Soal)</h3>

                      <div className="question-list" style={{ marginBottom: '20px' }}>
                        {currentQuestions.map((q, idx) => (
                          <div key={q.id} className="question-item-mini">
                            <span>{idx + 1}. {q.question}</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => handleEditQuestion(q)}>✏️</button>
                              <button onClick={() => setCurrentQuestions(currentQuestions.filter(item => item.id !== q.id))}>🗑️</button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {showQuestionForm ? (
                        <div className="question-form-box fade-in">
                          <div className="form-group">
                            <label>{editingQuestionId ? 'Edit Pertanyaan' : 'Pertanyaan Baru'}</label>
                            <input type="text" value={newQuestion.text} onChange={e => setNewQuestion({ ...newQuestion, text: e.target.value })} placeholder="Ketik soal..." />
                          </div>
                          <div className="options-grid">
                            {newQuestion.options.map((opt, i) => (
                              <div key={i} className="form-group">
                                <label>Opsi {String.fromCharCode(65 + i)} {newQuestion.correct === i && '✅'}</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <input type="text" value={opt} onChange={e => {
                                    const opts = [...newQuestion.options];
                                    opts[i] = e.target.value;
                                    setNewQuestion({ ...newQuestion, options: opts });
                                  }} placeholder={`Jawaban ${i + 1}`} />
                                  <input type="radio" name="correct" checked={newQuestion.correct === i} onChange={() => setNewQuestion({ ...newQuestion, correct: i })} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-primary" onClick={handleAddQuestion}>{editingQuestionId ? 'Simpan Perubahan' : '✅ Tambah'}</button>
                            <button className="btn-ghost" onClick={() => { setShowQuestionForm(false); setEditingQuestionId(null); setNewQuestion({ text: '', options: ['', '', '', ''], correct: 0 }); }}>Batal</button>
                          </div>
                        </div>
                      ) : (
                        <button className="btn-ghost-sm" onClick={() => setShowQuestionForm(true)}>➕ Tambah Pertanyaan Kuis</button>
                      )}
                    </div>

                    <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                      <button className="btn-primary" onClick={handleSaveSubModule}>💾 {editingSubModuleId ? 'Simpan Perubahan' : 'Tambah Sub-Modul'}</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'progres' && (
          <div className="tab-content fade-in">
            <div className="admin-card">
              <h2>Pemantauan Progres Siswa</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Siswa</th>
                    <th>Level / XP</th>
                    <th>Rata-rata Skor</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={i}>
                      <td><strong>{s.name}</strong><br /><small>{s.email}</small></td>
                      <td>🏅 {s.level} <span style={{ color: '#94a3b8', margin: '0 4px' }}>|</span> ⚡ {s.xp}</td>
                      <td>
                        <div className="prog-mini-bar" style={{ background: '#e2e8f0', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                          <div className="prog-fill" style={{ width: `${(s.progress_ipa + s.progress_b_indonesia + s.progress_b_inggris) / 3}%`, background: 'var(--admin-primary)', height: '100%' }}></div>
                        </div>
                      </td>
                      <td>
                        <button className="btn-ghost-sm" onClick={() => setSelectedStudent(s)}>👁️ Lihat Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedStudent && (
              <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>Detail Profil: {selectedStudent.name}</h2>
                    <button className="modal-close" onClick={() => setSelectedStudent(null)}>×</button>
                  </div>
                  <div className="modal-body">
                    <div className="detail-grid">
                      <div className="detail-box">
                        <h4>Informasi Dasar</h4>
                        <p><strong>Email:</strong> {selectedStudent.email}</p>
                        <p><strong>Kelas:</strong> {selectedStudent.kelas || 'SMK'}</p>
                        <p><strong>Streak:</strong> {selectedStudent.streak} Hari</p>
                      </div>
                      <div className="detail-box">
                        <h4>Pencapaian</h4>
                        <p><strong>Total XP:</strong> {selectedStudent.xp} XP</p>
                        <p><strong>Level Saat Ini:</strong> {selectedStudent.level}</p>
                      </div>
                    </div>

                    <div className="detail-box" style={{ marginTop: '20px' }}>
                      <h4>Riwayat Kuis Terbaru</h4>
                      {studentAttempts.length === 0 ? (
                        <p style={{ color: '#94a3b8' }}>Belum ada kuis yang diselesaikan.</p>
                      ) : (
                        <table className="admin-table mini">
                          <thead>
                            <tr>
                              <th>Modul</th>
                              <th>Skor</th>
                              <th>Persentase</th>
                              <th>Waktu</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentAttempts.map((att, idx) => (
                              <tr key={idx}>
                                <td>{att.sub_module_id}</td>
                                <td>{att.score}/{att.total}</td>
                                <td><span style={{ color: att.percentage >= 80 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>{att.percentage}%</span></td>
                                <td><small>{new Date(att.created_at).toLocaleString('id-ID')}</small></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
