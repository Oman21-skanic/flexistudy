const { Sequelize, DataTypes } = require('sequelize');
const pg = require('pg');
const path = require('path');

// Use DATABASE_URL for PostgreSQL in production, or SQLite for local dev
const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;

const sequelize = databaseUrl 
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, 'app.db'),
      logging: false
    });

// MODELS
const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, primaryKey: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'student'), defaultValue: 'student' },
  kelas: { type: DataTypes.STRING, defaultValue: 'SMK' },
  xp: { type: DataTypes.INTEGER, defaultValue: 0 },
  level: { type: DataTypes.INTEGER, defaultValue: 1 },
  streak: { type: DataTypes.INTEGER, defaultValue: 0 },
  progress_ipa: { type: DataTypes.INTEGER, defaultValue: 0 },
  progress_b_indonesia: { type: DataTypes.INTEGER, defaultValue: 0 },
  progress_b_inggris: { type: DataTypes.INTEGER, defaultValue: 0 },
  otp_code: { type: DataTypes.STRING, allowNull: true },
  otp_expiry: { type: DataTypes.DATE, allowNull: true },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { underscored: true });

const Subject = sequelize.define('Subject', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  emoji: { type: DataTypes.STRING },
  color: { type: DataTypes.STRING },
  initials: { type: DataTypes.STRING }
}, { underscored: true });

const Module = sequelize.define('Module', {
  id: { type: DataTypes.STRING, primaryKey: true },
  subject_id: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  topic: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT }
}, { underscored: true });

const SubModule = sequelize.define('SubModule', {
  id: { type: DataTypes.STRING, primaryKey: true },
  module_id: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  sections: { type: DataTypes.TEXT }, // JSON string
  questions: { type: DataTypes.TEXT } // JSON string
}, { underscored: true });

const Activity = sequelize.define('Activity', {
  user_email: { type: DataTypes.STRING, allowNull: false },
  emoji: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  xp: { type: DataTypes.STRING }
}, { underscored: true });

const QuizAttempt = sequelize.define('QuizAttempt', {
  user_email: { type: DataTypes.STRING, allowNull: false },
  module_id: { type: DataTypes.STRING },
  sub_module_id: { type: DataTypes.STRING },
  score: { type: DataTypes.INTEGER },
  total: { type: DataTypes.INTEGER },
  percentage: { type: DataTypes.INTEGER },
  answers: { type: DataTypes.TEXT } // JSON string
}, { underscored: true });

// RELATIONS
Module.belongsTo(Subject, { foreignKey: 'subject_id' });
Subject.hasMany(Module, { foreignKey: 'subject_id' });

SubModule.belongsTo(Module, { foreignKey: 'module_id' });
Module.hasMany(SubModule, { foreignKey: 'module_id' });

module.exports = {
  sequelize,
  User,
  Subject,
  Module,
  SubModule,
  Activity,
  QuizAttempt
};
