export const demoSubjects = [
  { id: 'ipa', name: 'IPA', emoji: '🔬', color: '#E0F2FE' },
  { id: 'b_indonesia', name: 'Bahasa Indonesia', emoji: '🌍', color: '#ECFDF5' },
  { id: 'b_inggris', name: 'Bahasa Inggris', emoji: '🌐', color: '#FEF3C7' },
];

export const demoModules = [
  {
    id: 'ipa-dasar',
    subject: 'ipa',
    title: 'Modul IPA Dasar',
    topic: 'Sel, Makhluk Hidup, dan Lingkungan',
    description: 'Materi pengenalan IPA untuk membangun fondasi belajar siswa.',
    subModules: 3,
    quizPerSubModule: 5,
    summaryQuiz: 18,
  },
  {
    id: 'bindo-narasi',
    subject: 'b_indonesia',
    title: 'Modul Bahasa Indonesia',
    topic: 'Teks Narasi dan Komunikasi',
    description: 'Latihan membaca, memahami isi, dan menyusun kalimat.',
    subModules: 4,
    quizPerSubModule: 5,
    summaryQuiz: 20,
  },
  {
    id: 'binggris-basic',
    subject: 'b_inggris',
    title: 'Modul Bahasa Inggris',
    topic: 'Vocabulary, Grammar, and Text',
    description: 'Belajar kosakata, grammar, dan pemahaman teks sederhana.',
    subModules: 4,
    quizPerSubModule: 5,
    summaryQuiz: 22,
  },
];

export const demoUsers = [
  {
    nama_depan: 'Raka',
    nama_belakang: 'Pratama',
    email: 'siswa@demo.local',
    password: 'siswa123',
    tingkatan_kelas: 'Kelas 10 SMK',
    role: 'student',
    xp: 340,
    level: 2,
    streak: 5,
    last_login: '2026-05-15',
    progress_ipa: 55,
    progress_b_indonesia: 48,
    progress_b_inggris: 62,
  },
  {
    nama_depan: 'Staff',
    nama_belakang: 'Admin',
    email: 'admin@demo.local',
    password: 'admin123',
    tingkatan_kelas: 'Admin',
    role: 'admin',
    xp: 0,
    level: 1,
    streak: 0,
    last_login: '',
    progress_ipa: 0,
    progress_b_indonesia: 0,
    progress_b_inggris: 0,
  },
];

export const demoActivities = [
  {
    email: 'siswa@demo.local',
    emoji: '🔥',
    text: 'Login hari ke-5 berturut-turut',
    xp: '+10 XP',
    created_at: '2026-05-15T08:10:00.000Z',
  },
  {
    email: 'siswa@demo.local',
    emoji: '📖',
    text: 'Membuka modul Bahasa Indonesia',
    xp: '+15 XP',
    created_at: '2026-05-15T09:00:00.000Z',
  },
  {
    email: 'siswa@demo.local',
    emoji: '✅',
    text: 'Menyelesaikan quiz sub modul IPA',
    xp: '+20 XP',
    created_at: '2026-05-14T14:20:00.000Z',
  },
  {
    email: 'guru@demo.local',
    emoji: '🧑‍🏫',
    text: 'Guru menambahkan soal baru',
    xp: '+0 XP',
    created_at: '2026-05-14T11:00:00.000Z',
  },
];
