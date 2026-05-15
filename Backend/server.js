require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize, User, Subject, Module, SubModule, Activity, QuizAttempt } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'flexistudy_secret_key_123';

app.use(cors({
  origin: true, // Allow all origins for now to avoid CORS blocking during setup
  credentials: true
}));
app.use(express.json());

// MIDDLEWARE
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userEmail = decoded.email;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// AUTH ROUTES
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name, role, kelas } = req.body;
    const existing = await User.findByPk(email);
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name, role, kelas });
    await Activity.create({ user_email: email, emoji: '✨', text: 'Mendaftar ke FlexiStudy', xp: '+0 XP' });
    res.json({ message: 'Registration successful', email: user.email });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByPk(email);
    if (!user) return res.status(400).json({ message: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });
    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ token, user: { email: user.email, name: user.name, role: user.role, kelas: user.kelas, xp: user.xp, level: user.level } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/progress/mark-read', async (req, res) => {
  const { email, subjectId, progress } = req.body;
  const user = await User.findByPk(email);
  if (user) {
    const field = `progress_${subjectId}`;
    if (user[field] !== undefined && progress > user[field]) {
      user[field] = progress;
      await user.save();
    }
  }
  res.json({ message: 'Progress updated' });
});

// SUBJECTS & MODULES
app.get('/api/subjects', async (req, res) => {
  const subjects = await Subject.findAll();
  res.json(subjects);
});

app.post('/api/subjects', async (req, res) => {
  const subject = await Subject.create(req.body);
  res.json(subject);
});

app.delete('/api/subjects/:id', async (req, res) => {
  await Subject.destroy({ where: { id: req.params.id } });
  await Module.destroy({ where: { subject_id: req.params.id } });
  res.json({ message: 'Subject deleted' });
});

app.get('/api/modules', async (req, res) => {
  const modules = await Module.findAll({ include: [{ model: SubModule }] });
  const formatted = modules.map(m => {
    const plain = m.get({ plain: true });
    plain.dynamicSubModules = plain.SubModules.map(sm => ({
      ...sm,
      sections: JSON.parse(sm.sections || '[]'),
      questions: JSON.parse(sm.questions || '[]')
    }));
    plain.subModules = plain.SubModules.length;
    return plain;
  });
  res.json(formatted);
});

app.post('/api/modules', async (req, res) => {
  const mod = await Module.create(req.body);
  res.json(mod);
});

app.put('/api/modules/:id', async (req, res) => {
  await Module.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Module updated' });
});

app.post('/api/submodules', async (req, res) => {
  const { id, module_id, title, sections, questions } = req.body;
  const sub = await SubModule.upsert({
    id, module_id, title,
    sections: JSON.stringify(sections),
    questions: JSON.stringify(questions)
  });
  res.json(sub);
});

app.delete('/api/modules/:id', async (req, res) => {
  await Module.destroy({ where: { id: req.params.id } });
  await SubModule.destroy({ where: { module_id: req.params.id } });
  res.json({ message: 'Module deleted' });
});

// PROGRESS & ACTIVITIES
app.get('/api/activities/:email', async (req, res) => {
  const acts = await Activity.findAll({
    where: { user_email: req.params.email },
    order: [['created_at', 'DESC']],
    limit: 10
  });
  res.json(acts);
});

app.get('/api/quiz-attempts/:email', async (req, res) => {
  const attempts = await QuizAttempt.findAll({
    where: { user_email: req.params.email },
    order: [['created_at', 'DESC']]
  });
  res.json(attempts);
});

app.post('/api/quiz-attempts', async (req, res) => {
  try {
    const { email, moduleId, quizId, score, total, percentage, answers } = req.body;
    const attempt = await QuizAttempt.create({
      user_email: email, module_id: moduleId, sub_module_id: quizId,
      score, total, percentage, answers: JSON.stringify(answers)
    });
    const user = await User.findByPk(email);
    if (user) {
      let xpGain = percentage >= 80 ? 30 : 10;
      user.xp += xpGain;
      user.level = Math.max(1, Math.floor(user.xp / 200) + 1);
      const mod = await Module.findByPk(moduleId);
      if (mod) {
        const field = `progress_${mod.subject_id}`;
        if (user[field] !== undefined && percentage > user[field]) {
          user[field] = percentage;
        }
      }
      await user.save();
      await Activity.create({
        user_email: email, emoji: percentage >= 80 ? '🏆' : '✅',
        text: `Menyelesaikan kuis ${quizId}`, xp: `+${xpGain} XP`
      });
    }
    res.json(attempt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.findAll({ where: { role: 'student' } });
  res.json(users);
});

// START SERVER
sequelize.sync().then(async () => {
  console.log('Database connected & synced');
  const subCount = await Subject.count();
  if (subCount === 0) {
    await Subject.bulkCreate([
      { id: 'ipa', name: 'IPA', emoji: '🔬', color: '#E0F2FE', initials: 'I' },
      { id: 'b_indonesia', name: 'Bahasa Indonesia', emoji: '🌍', color: '#ECFDF5', initials: 'B' },
      { id: 'b_inggris', name: 'Bahasa Inggris', emoji: '🌐', color: '#FEF3C7', initials: 'E' }
    ]);
    const adminHash = await bcrypt.hash('admin123', 10);
    await User.create({ email: 'admin@flexistudy.com', password: adminHash, name: 'Super Admin', role: 'admin' });
    const studentHash = await bcrypt.hash('siswa123', 10);
    await User.create({
      email: 'siswa@flexistudy.com', password: studentHash, name: 'Budi Siswa',
      role: 'student', kelas: '12 SMK', xp: 150, level: 1, streak: 5
    });
    console.log('Dummy data seeded (Admin & Siswa)');
  }
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`); });
  }
});

module.exports = app;
