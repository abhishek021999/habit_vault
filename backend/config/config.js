require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/habitvault',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development'
}; 