require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('./database');

async function forceSeed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB...');
    
    const adminHash = await bcrypt.hash('admin123', 10);
    const studentHash = await bcrypt.hash('siswa123', 10);

    await User.upsert({
      email: 'admin@flexistudy.com',
      password: adminHash,
      name: 'Super Admin',
      role: 'admin'
    });

    await User.upsert({
      email: 'siswa@flexistudy.com',
      password: studentHash,
      name: 'Budi Siswa',
      role: 'student',
      kelas: '12 SMK',
      xp: 150,
      level: 1,
      streak: 5
    });

    console.log('Admin & Student accounts created/updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding:', err);
    process.exit(1);
  }
}

forceSeed();
