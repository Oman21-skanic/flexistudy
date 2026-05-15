import { demoActivities, demoModules, demoUsers } from '../data/mockLearningData';

const STORAGE_KEY = 'flexistudy_demo_store_v1';

const clone = (value) => JSON.parse(JSON.stringify(value));
const todayStamp = () => new Date().toISOString().slice(0, 10);
const yesterdayStamp = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
};
const computeLevel = (xp) => Math.max(1, Math.floor(Number(xp || 0) / 200) + 1);
const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const toPublicUser = (user) => ({
  name: `${user.nama_depan} ${user.nama_belakang}`.trim(),
  email: user.email,
  kelas: user.tingkatan_kelas,
  role: user.role || 'student',
  xp: user.xp,
  level: user.level,
  streak: user.streak,
  progress_ipa: user.progress_ipa,
  progress_b_indonesia: user.progress_b_indonesia,
  progress_b_inggris: user.progress_b_inggris,
});

const createInitialStore = () => ({
  currentUserEmail: null,
  users: clone(demoUsers),
  activities: clone(demoActivities),
  modules: clone(demoModules),
  quizAttempts: [],
  materiRead: {}, // { 'ipa-dasar-sub1': true, ... }
});

export const loadDemoStore = () => {
  if (typeof window === 'undefined') return createInitialStore();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialStore();

  try {
    const parsed = JSON.parse(raw);
    return {
      ...createInitialStore(),
      ...parsed,
      users: Array.isArray(parsed.users) ? parsed.users : clone(demoUsers),
      activities: Array.isArray(parsed.activities) ? parsed.activities : clone(demoActivities),
      modules: Array.isArray(parsed.modules) ? parsed.modules : clone(demoModules),
      quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
      materiRead: typeof parsed.materiRead === 'object' ? parsed.materiRead : {},
      currentUserEmail: parsed.currentUserEmail || null,
    };
  } catch {
    return createInitialStore();
  }
};

export const saveDemoStore = (store) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  return store;
};

export const getActiveUser = (store) => {
  const email = normalizeEmail(store.currentUserEmail);
  if (!email) return null;

  const user = store.users.find((item) => normalizeEmail(item.email) === email);
  return user ? toPublicUser(user) : null;
};

export const getRecentActivities = (store, email, limit = 10) => {
  const target = normalizeEmail(email);
  return clone(store.activities)
    .filter((activity) => normalizeEmail(activity.email) === target)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit)
    .map((activity) => ({
      emoji: activity.emoji,
      text: activity.text,
      xp: activity.xp,
      time: new Date(activity.created_at).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));
};

export const buildLeaderboard = (users) =>
  clone(users)
    .map((user) => ({
      ...toPublicUser(user),
      progress: Math.round((Number(user.progress_ipa || 0) + Number(user.progress_b_indonesia || 0) + Number(user.progress_b_inggris || 0)) / 3),
    }))
    .sort((a, b) => {
      if (b.streak !== a.streak) return b.streak - a.streak;
      if (b.xp !== a.xp) return b.xp - a.xp;
      return b.progress - a.progress;
    })
    .map((user, index) => ({ ...user, rank: index + 1 }));

const subjectMeta = {
  ipa: { label: 'IPA', field: 'progress_ipa' },
  b_indonesia: { label: 'Bahasa Indonesia', field: 'progress_b_indonesia' },
  b_inggris: { label: 'Bahasa Inggris', field: 'progress_b_inggris' },
};

const commitStore = (store) => saveDemoStore(store);

export const authenticateDemoUser = (store, { email, password }) => {
  const nextStore = clone(store);
  const targetEmail = normalizeEmail(email);
  const user = nextStore.users.find((item) => normalizeEmail(item.email) === targetEmail);

  if (!user) {
    return { status: 'gagal', pesan: 'Email atau password salah!' };
  }

  if (user.password !== password) {
    return { status: 'gagal', pesan: 'Email atau password salah!' };
  }

  let xpBonus = 0;
  const today = todayStamp();

  if (user.last_login !== today) {
    if (user.last_login === yesterdayStamp()) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }

    xpBonus = 10;
    user.xp += xpBonus;
    user.last_login = today;
    user.level = computeLevel(user.xp);

    nextStore.activities.unshift({
      email: user.email,
      emoji: '🔥',
      text: `Login hari ke-${user.streak} berturut-turut`,
      xp: '+10 XP',
      created_at: new Date().toISOString(),
    });
  }

  nextStore.currentUserEmail = user.email;
  commitStore(nextStore);

  return {
    status: 'sukses',
    pesan: `Selamat datang kembali, ${user.nama_depan}!`,
    xp_bonus: xpBonus,
    data: toPublicUser(user),
    store: nextStore,
  };
};

export const registerDemoUser = (store, payload) => {
  const nextStore = clone(store);
  const targetEmail = normalizeEmail(payload.email);

  if (!targetEmail || !payload.password) {
    return { status: 'gagal', pesan: 'Email dan password wajib diisi.' };
  }

  const existing = nextStore.users.find((item) => normalizeEmail(item.email) === targetEmail);
  if (existing) {
    return { status: 'gagal', pesan: 'Email sudah terdaftar!' };
  }

  const newUser = {
    nama_depan: payload.nama_depan?.trim() || 'Siswa',
    nama_belakang: payload.nama_belakang?.trim() || 'Baru',
    email: targetEmail,
    password: payload.password,
    tingkatan_kelas: payload.tingkatan_kelas || 'SMK',
    role: 'student',
    xp: 0,
    level: 1,
    streak: 0,
    last_login: '',
    progress_ipa: 0,
    progress_b_indonesia: 0,
    progress_b_inggris: 0,
  };

  nextStore.users.unshift(newUser);
  nextStore.currentUserEmail = newUser.email;
  nextStore.activities.unshift({
    email: newUser.email,
    emoji: '✨',
    text: 'Mendaftar ke FlexiStudy',
    xp: '+0 XP',
    created_at: new Date().toISOString(),
  });

  commitStore(nextStore);

  return {
    status: 'sukses',
    pesan: `Halo ${newUser.nama_depan}, pendaftaran berhasil!`,
    data: toPublicUser(newUser),
    store: nextStore,
  };
};

export const updateDemoProgress = (store, { email, subject, nilai }) => {
  const nextStore = clone(store);
  const targetEmail = normalizeEmail(email);
  const user = nextStore.users.find((item) => normalizeEmail(item.email) === targetEmail);

  if (!user) {
    return { status: 'gagal', pesan: 'User tidak ditemukan' };
  }

  const meta = subjectMeta[subject];
  if (!meta) {
    return { status: 'gagal', pesan: 'Subject tidak valid' };
  }

  user[meta.field] = Number(nilai || 0);
  user.xp += 15;
  user.level = computeLevel(user.xp);

  nextStore.activities.unshift({
    email: user.email,
    emoji: '📖',
    text: `Membuka materi ${meta.label}`,
    xp: '+15 XP',
    created_at: new Date().toISOString(),
  });

  commitStore(nextStore);

  return {
    status: 'sukses',
    xp: user.xp,
    level: user.level,
    progress_ipa: user.progress_ipa,
    progress_b_indonesia: user.progress_b_indonesia,
    progress_b_inggris: user.progress_b_inggris,
    data: toPublicUser(user),
    store: nextStore,
  };
};

export const logoutDemoUser = (store) => {
  const nextStore = { ...store, currentUserEmail: null };
  commitStore(nextStore);
  return nextStore;
};

export const trackQuizCompletion = (store, { email, moduleId, quizId, score, total, answers }) => {
  const nextStore = clone(store);
  const targetEmail = normalizeEmail(email);
  const user = nextStore.users.find((item) => normalizeEmail(item.email) === targetEmail);

  if (!user) {
    return { status: 'gagal', pesan: 'User tidak ditemukan' };
  }

  const quizAttempt = {
    email: user.email,
    moduleId,
    quizId,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    answers: Array.isArray(answers) ? answers : [],
    timestamp: new Date().toISOString(),
  };

  nextStore.quizAttempts.push(quizAttempt);

  // Award XP based on performance
  let xpReward = 0;
  if (score === total) {
    xpReward = 30; // Perfect score
  } else if (quizAttempt.percentage >= 80) {
    xpReward = 25; // 80% or more
  } else if (quizAttempt.percentage >= 60) {
    xpReward = 15; // 60% or more
  } else {
    xpReward = 5; // Participation reward
  }

  user.xp += xpReward;
  user.level = computeLevel(user.xp);

  const emoji = quizAttempt.percentage === 100 ? '🏆' : quizAttempt.percentage >= 80 ? '⭐' : '✅';
  nextStore.activities.unshift({
    email: user.email,
    emoji,
    text: `Menyelesaikan kuis ${quizId} - Score: ${score}/${total}`,
    xp: `+${xpReward} XP`,
    created_at: new Date().toISOString(),
  });

  commitStore(nextStore);

  return {
    status: 'sukses',
    xp: user.xp,
    level: user.level,
    xpReward,
    data: toPublicUser(user),
    store: nextStore,
  };
};

export const getQuizHistory = (store, email, limit = 20) => {
  const target = normalizeEmail(email);
  return clone(store.quizAttempts)
    .filter((attempt) => normalizeEmail(attempt.email) === target)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
};

export const getModuleProgress = (store, email, moduleId) => {
  const target = normalizeEmail(email);
  const attempts = clone(store.quizAttempts)
    .filter((attempt) => normalizeEmail(attempt.email) === target && attempt.moduleId === moduleId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  if (attempts.length === 0) return null;

  const avgScore = Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length);
  const completed = attempts.length;

  return {
    moduleId,
    completed,
    avgScore,
    lastAttempt: attempts[attempts.length - 1].timestamp,
  };
};

export const markMaterialAsRead = (store, submoduleId) => {
  const nextStore = clone(store);
  nextStore.materiRead[submoduleId] = true;
  commitStore(nextStore);
  return nextStore;
};

export const isMaterialRead = (store, submoduleId) => {
  return store.materiRead[submoduleId] === true;
};

export const getSubmoduleStatus = (store, moduleId, submoduleIndex) => {
  // If it's the first submodule, always allow access
  if (submoduleIndex === 0) return 'unlocked';

  // Require that the previous submodule's quiz has been completed and passed
  // Determine previous submodule id
  const previousIndex = submoduleIndex; // submoduleIndex is zero-based; previous submodule is numbered same for `sub1`
  const previousQuizTag = `sub${previousIndex}`;

  // Only consider attempts from the currently logged-in user
  const userEmail = normalizeEmail(store.currentUserEmail || '');

  // Find quiz attempts for previous submodule by quizId containing the tag
  const previousQuizAttempts = (store.quizAttempts || []).filter(
    (a) => a.quizId && a.quizId.includes(previousQuizTag) && normalizeEmail(a.email) === userEmail
  );

  if (previousQuizAttempts.length === 0) {
    // No attempt yet -> locked
    return 'locked';
  }

  // Require a higher passing threshold (80% / 4/5)
  const PASS_PERCENT = 80;
  const lastAttempt = previousQuizAttempts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
  if ((lastAttempt.percentage || 0) >= PASS_PERCENT) {
    return 'unlocked';
  }

  // Not passed yet -> locked
  return 'locked';
};
